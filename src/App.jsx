import { useState, useEffect, useContext } from "react";
import Login from "./Components/Login";
import Chatapp from "./Components/Chatapp";
import Mainchat from "./Components/Mainchat";
import { AuthContext } from "./Components/authContext";
import Register from "./Components/Regiter";

import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login/"></Navigate>;
    }
    return children;
    console.log(currentUser);
  };
  return (
    <div className=" app flex flex-row gap-0 p-5  w-full h-screen  justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Mainchat></Mainchat>
                </ProtectedRoute>
              }
            ></Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// import React, { useContext } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Components/Login";
// import Mainchat from "./Components/Mainchat";
// import { AuthContext } from "./Components/authContext";
// import Register from "./Components/Regiter";

// const App = () => {
//   const { currentUser } = useContext(AuthContext);

//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login/" />;
//     }
//     return children;
//   };

//   // Function to determine the base name
//   const getBaseName = () => {
//     if (
//       window.location.hostname === "localhost" ||
//       window.location.hostname === "127.0.0.1"
//     ) {
//       return "/";
//     } else {
//       return "/react-ChatApp/"; // Replace with your repository name
//     }
//   };

//   return (
//     <div className="app flex flex-row gap-0 p-5 w-full h-screen justify-center items-center">
//       <BrowserRouter basename={getBaseName()}>
//         <Routes>
//           {/* Default route to /login */}
//           <Route path="/" element={<Navigate to="/login/" />} />

//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/mainchat"
//             element={
//               <ProtectedRoute>
//                 <Mainchat />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
