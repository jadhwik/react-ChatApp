import { useState } from "react";

import { auth, googleProvider } from "../firebase.config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

      console.log(currentUser);
      // You can add additional logic here, such as updating user profile with the username
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };
  const SignInwithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // const user = userCredential.user;
      console.log(auth?.currentUser?.email);
      // You can add additional logic here, such as updating user profile with the username
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };

  return (
    <div className="  min-h-screen flex flex-col gap-3  justify-center  ">
      {/* <div className="   flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl mt-5">Welcome to </h1>
        <h1 className="text-center text-6xl italic animate-pulse text-purple-600">
          We Chat
        </h1>
      </div> */}
      <div className=" bg-slate-400 p-5 flex flex-col justify-center items-center rounded-lg  ">
        <h1 className="text-3xl text-white">Login</h1>
        <div className="flex flex-col gap-3 p-5 items-center ">
          {/* <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input> */}
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="p-1 bg-slate-300 border-none outline-none"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="p-2  bg-slate-500 " onClick={SignIn}>
            Login
          </button>
          <p className=" text-black text-opacity-50 hover:text-opacity-100">
            Already have account?<Link to="/register">Register</Link>
          </p>
          <button onClick={SignInwithGoogle}>
            <img src={google} className="w-8"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
