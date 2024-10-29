import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Player from "./pages/Player/Player.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
      console.log(user.email);
        setUser(user);
        console.log("Logged In");
        navigate("/");
      } else {
        console.log("Logged Out");
        // refreshPage();
        navigate("/login");

      }
    });
  }, []);

  return (
    <div>
        <ToastContainer theme="dark"></ToastContainer>
      <Routes>
        <Route path="/" element={<Home user={user}/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/player/:id" element={<Player />}></Route>
      </Routes>
    </div>
  );
};

export default App;
