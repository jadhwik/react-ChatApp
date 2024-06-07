import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, storage } from "../firebase.config.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigate, useNavigate } from "react-router-dom";
import add from "../assets/addpro.png";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const RegisterOn = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error("Invalid email address");
        return;
      }
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!imageFile) {
        console.error("Please select a profile picture");
        return;
      }
      const storageRef = ref(
        storage,
        `uploads/${res.user.uid}/${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              phoneNumber: phone,
              photoURL: downloadURL,
            });
            console.log("upload successful", downloadURL);
            await setDoc(doc(db, "Users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              phone,
              password,
              photoURL: downloadURL,
              bio,
            });
          });
        }
      );

      navigate("/login");

      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className=" bg-slate-400 p-5 flex flex-col justify-center items-center rounded-lg ">
        <h1 className="text-3xl text-white">Register</h1>
        <div className="flex flex-col gap-2 p-5">
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="text"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label htmlFor="image-upload">
            <img src={add} className="w-16"></img>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>

          <textarea
            className="p-1 bg-slate-300 border-none outline-none resize-none"
            rows="2"
            placeholder="add any bio here"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button className="p-2  bg-slate-500 " onClick={RegisterOn}>
            Register
          </button>
          <p className=" text-black text-opacity-50 hover:text-opacity-100">
            Already have account?Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
