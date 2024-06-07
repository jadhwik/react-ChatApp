import man from "../assets/man (1).png";
import woman from "../assets/woman.png";
import man1 from "../assets/programmer.png";
import man2 from "../assets/man (2).png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "./authContext";
import { useContext, useState } from "react";
import profile from "../assets/profile.jpg";
import { ChatContext } from "./chatsContext";

const Chatapp = ({
  userData,
  currentTime,
  setUser,
  user,
  handleChats,
  chats,
}) => {
  const [imageError, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChatsFun = handleChats;
  const { dispatch } = useContext(ChatContext);

  console.log(currentUser);
  const handleImageError = () => {
    setImage(profile);
  };
  console.log(userData);

  const handleSearch = (event) => {
    const serachValue = event.target.value;
    setSearchTerm(serachValue);
    setUser(serachValue);
    handleChatsFun();
  };

  console.log("chats data are", Object.entries(chats));

  const filteredData = userData
    .filter((data) => data.uid !== currentUser.uid)
    .filter((data) =>
      data.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  console.log(filteredData);

  const dataToDisplay = searchTerm
    ? filteredData
    : userData.filter((data) => data.uid !== currentUser.uid);

  const setLastActiveChat = async (userId, chatId) => {
    await setDoc(
      doc(db, "userChats", userId),
      {
        lastActiveChat: chatId,
      },
      { merge: true }
    );
  };

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setLastActiveChat(currentUser.uid, data.chatId);
  };

  return (
    <div className="flex flex-col">
      <div className=" bg-stone-400 bg-opacity-50 flex flex-col max-w-lg  ">
        <div className="flex flex-row items-center  justify-between ">
          <h1 className="text-2xl font-bold text-white  ml-6">Chats</h1>
          <button
            onClick={() => signOut(auth)}
            className="text-white p-2 bg-slate-400 m-3 rounded-lg h-10 bg-opacity-50 hover:bg-opacity-100"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={searchTerm}
          className="m-5 w-auto rounded-md text-center bg-white bg-opacity-50 border-none outline-none ml-15"
        ></input>
      </div>
      {/* {userData &&
          userData.map((data) => ( */}
      <div
        // id={data.id}
        className=" chat  sm:w-auto sm:text-sm md:w-auto md:text-md h-auto "
      >
        <div className="flex flex-col justify-start bg-stone-300 bg-opacity-50 w-72 p-2 rounded-md m-2 h-96 overflow-y-scroll">
          {Object.entries(chats).map(([chatId, chatData]) => {
            const userInfo = chatData.userInfo;
            if (dataToDisplay.some((data) => data.uid === userInfo.uid)) {
              return (
                <button
                  onClick={() => handleSelect(userInfo)}
                  key={userInfo.uid}
                >
                  <div className="flex flex-row justify-between items-center p-2 hover:bg-zinc-500 hover:bg-opacity-50 rounded-md">
                    <div className="flex flex-row justify-center items-center">
                      <img
                        src={imageError || userInfo.photoURL}
                        onError={handleImageError}
                        className="w-10 rounded-full"
                        alt=""
                      ></img>
                      <div className="flex flex-col justify-center item-center p-2">
                        <p className="text-white font-bold">
                          {userInfo.displayName}
                        </p>
                        <p className="text-white m-1">
                          {chatData.lastMessage?.inputText}
                        </p>
                      </div>
                    </div>
                    <p className="text-red-700 text-sm">
                      {chatData.lastMessage?.times}
                    </p>
                  </div>
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
export default Chatapp;
