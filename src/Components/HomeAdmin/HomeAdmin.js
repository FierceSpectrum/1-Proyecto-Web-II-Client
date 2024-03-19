import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeAdmin.scss";
import User from "../User/User";
import PerfilEdit from "../PerfilEdit/PerfilEdit";
import CreatAccount from "../../Accets/addAccount.png";

function HomeAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("Admin")));

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!admin) {
      navigate("/Perfiles");
    } else {
      getAccounts();
    }
  }, [admin, navigate]);

  const urlaccounts = admin
    ? `http://localhost:3001/api/accounts?iduser=${admin.id}`
    : "";
  const getAccounts = async () => {
    await fetch(urlaccounts, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAccounts(data);
        return;
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <div>
      <User></User>
      <div className="perfiles">
        {accounts.map((account, index) => (
          <PerfilEdit
            key={index}
            avatar={account.avatar}
            full_name={account.full_name}
          ></PerfilEdit>
        ))}
        {Object.keys(accounts).length < 6 ? (
          <PerfilEdit
            key={0}
            avatar={CreatAccount}
            full_name={"Creat User"}
          ></PerfilEdit>
        ) : (
          <></>
        )}
      </div>
      <button onClick={() => setAdmin(localStorage.removeItem("Admin"))}>
        atras
      </button>
    </div>
  );
}

export default HomeAdmin;
