import woman from "../assets/woman.png";

const Mainchat = () => {
  return (
    <div className="flex flex-col  justify-start  w-full ml-2 ">
      <div className="flex flex-row  items-center bg-zinc-500 bg-opacity-50 p-2">
        <img src={woman} className="w-16 "></img>
        <div>
          <p className="text-white text-lg p-2 font-bold">Emma</p>
          <p className="text-white">Be to a Front end developer</p>
        </div>
      </div>
    </div>
  );
};
export default Mainchat;
