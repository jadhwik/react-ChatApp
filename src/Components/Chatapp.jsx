import man from "../assets/man (1).png";
import woman from "../assets/woman.png";
import man1 from "../assets/programmer.png";
import man2 from "../assets/man (2).png";

const Chatapp = () => {
  return (
    <div className=" chat   w-auto min-h-screen">
      <div className=" bg-stone-400 bg-opacity-50 flex flex-col max-w-lg min-h-screen ">
        <h1 className="text-2xl font-bold text-white  ml-6">Chats</h1>
        <input
          type="text"
          placeholder="Search"
          className="m-5 w-auto rounded-md text-center bg-white bg-opacity-50 border-none outline-none ml-15"
        ></input>
        <div className="flex flex-col justify-start bg-stone-300 bg-opacity-50 m-5 rounded-md p-2 h-full">
          <div className=" flex flex-row justify-between  items-center p-2  hover:bg-zinc-500 hover:bg-opacity-50 rounded-md ">
            <div className="flex flex-row justify-center items-center">
              <img src={man} className="w-20"></img>
              <div className="flex flex-col justify-center item-center p-2">
                <p className="text-white font-bold">Ronney</p>
                <p className="text-white m-3">This is will be okay</p>
              </div>
            </div>

            <p className="text-red-700 text-sm">10.30 PM</p>
          </div>
          <div className=" flex flex-row justify-between  items-center p-2  hover:bg-zinc-500 hover:bg-opacity-50 rounded-md ">
            <div className="flex flex-row justify-center items-center">
              <img src={woman} className="w-20"></img>
              <div className="flex flex-col justify-center item-center p-2">
                <p className="text-white font-bold">Emma</p>
                <p className="text-white m-3 line-clamp-1">
                  Be to a Front end developer
                </p>
              </div>
            </div>

            <p className="text-red-700 text-sm">10.30 PM</p>
          </div>
          {/*===============================================*/}
          <div className=" flex flex-row justify-between  items-center p-2  hover:bg-zinc-500 hover:bg-opacity-50 rounded-md ">
            <div className="flex flex-row justify-center items-center">
              <img src={man1} className="w-20"></img>
              <div className="flex flex-col justify-center item-center p-2">
                <p className="text-white font-bold">Robert</p>
                <p className="text-white m-3 line-clamp-1">
                  Being a programmer is not that easy
                </p>
              </div>
            </div>

            <p className="text-red-700 text-sm">10.30 PM</p>
          </div>

          {/*===============================================*/}
          {/*===============================================*/}
          <div className=" flex flex-row justify-between  items-center p-2  hover:bg-zinc-500 hover:bg-opacity-50 rounded-md ">
            <div className="flex flex-row justify-center items-center">
              <img src={man2} className="w-20"></img>
              <div className="flex flex-col justify-center item-center p-2">
                <p className="text-white font-bold">Sam</p>
                <p className="text-white m-3 line-clamp-1">
                  Being a programmer is not that easy
                </p>
              </div>
            </div>

            <p className="text-red-700 text-sm">10.30 PM</p>
          </div>

          {/*===============================================*/}
        </div>
      </div>
    </div>
  );
};
export default Chatapp;
