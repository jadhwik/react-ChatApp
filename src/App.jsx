import Login from "./Components/Login";
import Chatapp from "./Components/Chatapp";
import Mainchat from "./Components/Mainchat";

const App = () => {
  return (
    <div>
      <div className=" app flex flex-row gap-0 ">
        <Chatapp></Chatapp>
        <Mainchat></Mainchat>
      </div>
    </div>
  );
};

export default App;
