import send from "../assets/send.png";
import image from "../assets/image-.png";
import filesIcon from "../assets/attachment.png";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { v4 as uuid } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import pdf from "../assets/pdf.png";

import {
  getDocs,
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { ChatContext } from "./chatsContext";

const Inputtaking = ({ currentTime }) => {
  const times = currentTime();
  console.log(times);
  const { data } = useContext(ChatContext);
  const [inputText, setText] = useState("");
  const [fileData, setFiles] = useState(null);
  const [imageData, setImages] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const [inputContent, setInputContent] = useState("Text");

  const handleInputcontent = () => {
    if (inputContent === "Text") {
      setInputContent("Text");
    } else if (inputContent === "Files") {
      setInputContent("Files");
    } else {
      setInputContent("Images");
    }
  };

  const handleMessageSent = async () => {
    const uploadFile = (file) => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => resolve(downloadURL))
              .catch((error) => reject(error));
          }
        );
      });
    };

    try {
      let imgURL = null;
      let fileURL = null;

      if (imageData) {
        imgURL = await uploadFile(imageData);
      }

      if (fileData) {
        fileURL = await uploadFile(fileData);
      }

      const newMessage = {
        id: uuid(),
        inputText,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        time: times,
        img: imgURL,
        file: fileURL,
        fileName: fileData ? fileData.name : null,
      };

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(newMessage),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          inputText,
          times,
        },
        [data.chatId + ".data"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          inputText,
          times,
        },
        [data.chatId + ".data"]: serverTimestamp(),
      });

      setText("");
      setImages(null);
      setFiles(null);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <div className="bg-slate-200 mb-18 bg-opacity-50  p-2  flex flex-row justify-center items-center gap-2">
      <>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setText(e.target.value);
            handleInputcontent("Text");
          }}
          placeholder="Type something here"
          className="bg-slate-200 bg-opacity-50 w-1/2 border-none outline-none placeholder-black p-1 rounded-md"
        ></input>
        <button>
          <img src={send} className="w-8" onClick={handleMessageSent}></img>
        </button>

        <input
          type="file"
          accept="images/*"
          id="file"
          className="  hidden"
          onChange={handleImageChange}
        ></input>

        <label htmlFor="file">
          {imagePreview ? (
            <img src={imagePreview} className="w-8" alt="Image Preview" />
          ) : (
            <img src={image} className="w-8" alt="Image Icon" />
          )}
        </label>

        <input
          type="file"
          id="files"
          accept=".docx,.pdf"
          className="hidden"
          onChange={handleFileChange}
        ></input>
        <label htmlFor="files">
          <img
            src={
              fileData && fileData.type === "application/pdf" ? pdf : filesIcon
            }
            className="w-8"
            alt="Upload File"
          ></img>
        </label>
      </>
    </div>
  );
};

export default Inputtaking;
