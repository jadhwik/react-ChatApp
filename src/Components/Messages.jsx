import { useEffect, useState } from "react";
import man from "../assets/programmer.png";
import woman from "../assets/woman.png";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { ChatContext } from "./chatsContext";
import pdf from "../assets/pdf.png";
import ImageOpen from "./imageOpen";

const Messages = ({ userData, currentTime, chats }) => {
  const currT = currentTime();
  console.log(currT);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const [Messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // const openModal = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedImage(null);
  //   setIsModalOpen(false);
  // };
  const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);
  const openModal = (imageUrl) => {
    setEnlargedImageUrl(imageUrl);
  };

  const closeModal = () => {
    setEnlargedImageUrl(null);
  };

  useEffect(() => {
    const getLastActiveChat = async () => {
      const userDoc = await getDoc(doc(db, "userChats", currentUser.uid));
      if (userDoc.exists()) {
        const lastActiveChatId = userDoc.data().lastActiveChat;
        if (lastActiveChatId) {
          dispatch({
            type: "CHANGE_USER",
            payload: { chatId: lastActiveChatId },
          });
        }
      }
    };

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getLastActiveChat();
    currentUser.uid && getChats();
  }, [currentUser.uid, data.chatId, dispatch]);

  console.log("messages are", Messages);

  return (
    <div className="w-full">
      <div
        // key={data.id}
        className="bg-slate-300 mt-3 bg-opacity-50 h-96 p-2 overflow-y-scroll   sm:text-sm md:text-md lg:text-md"
      >
        <div className="flex flex-col gap-3">
          {Messages.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${
                chat.senderId === currentUser.uid
                  ? "justify-end"
                  : "justify-start"
              } items-center gap-5`}
            >
              {chat.senderId === currentUser.uid ? (
                <>
                  <div className="flex flex-col items-end">
                    {chat.inputText !== "" && (
                      <p
                        className={`p-1 w-fit h-auto ${
                          chat.senderId === currentUser.uid &&
                          chat.inputText !== ""
                            ? "bg-blue-500 text-white rounded-l-xl rounded-br-xl pl-4 pr-2"
                            : "bg-white text-black rounded-r-xl rounded-bl-xl pl-4 pr-2"
                        }`}
                      >
                        {chat.inputText || ""}
                      </p>
                    )}

                    {chat.img && (
                      <img
                        src={chat.img}
                        alt="Uploaded"
                        className="w-20 rounded-md mt-2"
                        onClick={() => openModal(chat.img)}
                      />
                    )}
                    {chat.file && (
                      <div className="bg-slate-300 bg-opacity-50 p-3 rounded-lg">
                        {chat.fileName.endsWith(".pdf") ? (
                          <img src={pdf} alt="PDF Icon" className="w-8 mr-2" />
                        ) : null}
                        <a
                          href={chat.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white mt-2 underline"
                        >
                          {chat.fileName || "File"}
                        </a>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">{chat.time}</p>
                  </div>
                  <img
                    src={currentUser.photoURL}
                    className="w-10 rounded-full"
                    alt="User avatar"
                  />
                </>
              ) : (
                <>
                  <img
                    src={data.user.photoURL}
                    className="w-10 rounded-full"
                    alt="User avatar"
                  />
                  <div className="flex flex-col items-start">
                    {chat.inputText && (
                      <div className={``}>
                        <p
                          className={`p-1 w-auto h-auto ${
                            chat.senderId === currentUser.uid
                              ? "bg-blue-500 text-white rounded-l-xl rounded-br-xl pl-4 pr-2"
                              : "bg-white text-black rounded-r-xl rounded-bl-xl pl-4 pr-2"
                          }`}
                        >
                          {chat.inputText}
                        </p>
                      </div>
                    )}

                    {chat.img && (
                      <img
                        src={chat.img}
                        alt="Uploaded"
                        className="w-32 rounded-md mt-2"
                        onClick={() => openModal(chat.img)}
                      />
                    )}
                    {chat.file && (
                      <div className="bg-slate-300 bg-opacity-50 p-3 rounded-lg">
                        {chat.fileName.endsWith(".pdf") ? (
                          <img src={pdf} alt="PDF Icon" className="w-8 mr-2" />
                        ) : null}
                        <a
                          href={chat.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white mt-2 underline"
                        >
                          {chat.fileName || "File"}
                        </a>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">{chat.time}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* {isModalOpen && (
        <ImageOpen imageUrl={selectedImage} closeModal={closeModal} />
      )} */}
      {enlargedImageUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <img
            src={enlargedImageUrl}
            alt="Enlarged"
            className="max-w-full max-h-full"
          />
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
export default Messages;
