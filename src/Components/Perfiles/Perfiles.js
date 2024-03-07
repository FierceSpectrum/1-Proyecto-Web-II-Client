import React,{ useState, useEffect} from "react";
import "./Perfiles.scss";
import Perfil from "../Perfil/Perfil";
const Perfiles = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [accounts, setAccounts] = useState([]);

  const urlaccounts = `http://localhost:3001/api/accounts?iduser=${user.id}`;
  useEffect(() => {
    getAccounts();
  }, []);

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
        console.log(data);
        return;
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <div className='body'>
      <h2>¿Quién está viendo ahora?</h2>
      <div className='perfiles'>
        {accounts.map((account, index) => (
          <Perfil
            key={index}
            account={account}
            avatar={account.avatar}
            full_name={account.full_name}
          ></Perfil>
        ))}
      </div>
      <button
        // onClick={""}
        className='btnadmin'
      >
        Administrar perfiles
      </button>
    </div>
  );
};

export default Perfiles;