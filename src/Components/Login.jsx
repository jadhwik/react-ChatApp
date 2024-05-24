import { app } from "../firebase.config.js";
import { database } from "../firebase.config.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    // createUserWithEmailAndPassword(
    //   (database, email, password).then((data) => {
    //     console.log(data, "authData");
    //   })
    // );

    try {
      const userCredential = await createUserWithEmailAndPassword(
        database,
        email,
        password,
        username
      );
      const user = userCredential.user;
      console.log(user, "authData");
      // You can add additional logic here, such as updating user profile with the username
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };
  return (
    <div className=" form w-full min-h-screen  flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl mt-5">Welcome to </h1>
      <h1 className="text-center text-6xl italic animate-pulse text-purple-600">
        We Chat
      </h1>
      <div className="  flex flex-col justify-center items-center mt-10  p-2 w-96 rounded-lg text-xl bg-orange-200 bg-opacity-50 shadow-lg ">
        <h2 className="text-3xl">Login</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col p-5 gap-1"
        >
          <label className="p-2 text-md">Username</label>
          <input
            type="text"
            name="username"
            className="bg-transparent rounded-lg w-64 outline-none bg-white border-none text-sm p-2"
          ></input>
          <label className="p-2 text-md">Email</label>
          <input
            type="email"
            name="email"
            className="bg-transparent rounded-lg  outline-none  border-none bg-white p-2 text-sm "
          ></input>
          <label className="p-2 text-md">Password</label>
          <input
            type="password"
            name="password"
            className="bg-transparent rounded-lg border-none bg-white outline-none text-sm p-2  "
          ></input>

          <button className="p-1 bg-white m-10 bg-opacity-50 rounded-xl hover:bg-opacity-100 cursor-pointer w-42">
            Create Account
          </button>
          <a
            href="#"
            className="text-sm opacity-75 hover:opacity-100 hover:text-fuchsia-600"
          >
            Already have account,Sign In
          </a>
        </form>
      </div>
    </div>
  );
};
export default Login;
