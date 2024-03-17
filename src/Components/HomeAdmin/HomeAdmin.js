import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./HomeAdmin.scss";
import User from "../User/User";

function HomeAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(localStorage.getItem("Admin"));

  useEffect(() => {
    if (!admin) {
      navigate("/Perfiles");
    }
  }, [admin, navigate]);

  return (
    <div
      
    >
      <User></User>
      {}
      <button onClick={() => 
        setAdmin(localStorage.removeItem("Admin"))
      }>atras</button>
    </div>
  );
}

export default HomeAdmin;
