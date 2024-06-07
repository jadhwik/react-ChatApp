import woman from "../assets/woman.png";
import { useState, useEffect } from "react";
import Messages from "./Messages";
import Inputtaking from "./inputTake";

import Chatapp from "./Chatapp";
import { db } from "../firebase.config";
import { v4 as uuid } from "uuid";
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
} from "firebase/firestore";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import profile from "../assets/profile.jpg";
import { ChatContext } from "./chatsContext";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Mainchat = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [userData, setData] = useState([]);

  const usersCollectionRef = collection(db, "Users");
  const [fallbackImage, setFallbackImage] = useState(null);

  const [time, setTime] = useState("");
  const [user, setUser] = useState("");

  console.log("data from auth is", data);

  const filteredDatauser =
    user && userData
      ? userData
          .filter((data) => data.uid !== currentUser.uid)
          .filter((data) =>
            data.username.toLowerCase().includes(user.toLowerCase())
          )
      : [];
  const userId = filteredDatauser.length > 0 ? filteredDatauser[0].uid : null;

  console.log("filtered data", filteredDatauser);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getDocs(usersCollectionRef);

        const FilterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(FilterData);
        console.log(FilterData);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  const currentTime = () => {
    const Time = new Date();
    const hours = Time.getHours();
    const minutes = Time.getMinutes();

    let period = "AM";
    if (hours > 12) {
      period = "PM";
    }

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }
    const combTime = `${formattedHours}.${minutes}${period}`;
    console.log(combTime);

    return combTime;
  };
  const times = currentTime();
  console.log("times is printing", times);

  const handleImageError = () => {
    setFallbackImage(profile);
  };

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

  console.log(currentUser.uid);

  const handleChats = async () => {
    if (!userId) {
      console.error("User ID is missing or invalid.");
      return;
    }

    const Combined =
      currentUser.uid > userId
        ? currentUser.uid + userId
        : userId + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", Combined);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      const currentUserInfo = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };

      const otherUserInfo = {
        uid: userId,
        displayName: filteredDatauser[0]?.username || "Unknown User",
        photoURL: filteredDatauser[0]?.photoURL || null,
      };

      console.log("current userinfo", currentUserInfo);
      console.log("other userinfo", otherUserInfo);

      // Ensure the current user's chat document exists
      const currentUserChatDocRef = doc(db, "userChats", currentUser.uid);
      const currentUserChatDocSnap = await getDoc(currentUserChatDocRef);
      if (!currentUserChatDocSnap.exists()) {
        await setDoc(currentUserChatDocRef, {});
      }

      // Ensure the other user's chat document exists
      const otherUserChatDocRef = doc(db, "userChats", userId);
      const otherUserChatDocSnap = await getDoc(otherUserChatDocRef);
      if (!otherUserChatDocSnap.exists()) {
        await setDoc(otherUserChatDocRef, {});
      }

      // Update the chat documents with the new chat information
      await updateDoc(currentUserChatDocRef, {
        [`${Combined}.userInfo`]: otherUserInfo,
        [`${Combined}.date`]: serverTimestamp(),
      });

      await updateDoc(otherUserChatDocRef, {
        [`${Combined}.userInfo`]: currentUserInfo,
        [`${Combined}.date`]: serverTimestamp(),
      });
    } catch (err) {
      console.log("Error updating chats:", err);
    }
  };

  return (
    <div className="flex flex-col w-full  gap-0">
      <div className=" flex flex-row">
        <Chatapp
          userData={userData}
          currentTime={currentTime}
          user={user}
          setUser={setUser}
          handleChats={handleChats}
          chats={chats}
        ></Chatapp>

        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center   bg-zinc-500 bg-opacity-50 p-2 ">
            <img
              src={fallbackImage || data.user?.photoURL}
              onError={handleImageError}
              className="w-16 rounded-full "
              alt=""
            ></img>
            <div>
              <p className="text-white text-lg p-2 font-bold"></p>
              <p className="text-white">{data.user?.displayName}</p>
            </div>
          </div>
          <div>
            <Messages
              userData={userData}
              currentTime={currentTime}
              chats={chats}
            ></Messages>
            <Inputtaking currentTime={currentTime}></Inputtaking>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mainchat;
