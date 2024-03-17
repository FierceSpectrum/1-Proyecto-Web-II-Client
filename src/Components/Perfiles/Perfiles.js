import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./Perfiles.scss";
import Perfil from "../Perfil/Perfil";
const Perfiles = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [logeado, setLogeado] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [accounts, setAccounts] = useState([]);

  const urlaccounts = `http://localhost:3001/api/accounts?iduser=${user.id}`;

  useEffect(() => {
    if (logeado) {
      localStorage.setItem("Admin", JSON.stringify(user));
      localStorage.setItem("Account", JSON.stringify(user));
      navigate("/HomeAdmin");
    } else {
      localStorage.removeItem("Admin");
    }
  }, [logeado, navigate, user]);

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
        return;
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  const openPopup = () => {
    setErrorMessage("");
    setPinValue("");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const handlePinChange = (event) => {
    // Permite solo números en el campo de entrada
    const value = event.target.value.replace(/\D/g, "");
    setPinValue(value);
  };

  const handleSubmit = () => {
    // Validar la longitud del PIN
    if (pinValue.length !== 6) {
      setErrorMessage("El PIN debe tener 6 números");
      return;
    }

    // Validar el PIN ingresado
    if (pinValue.toString() === user.pin.toString()) {
      setLogeado(true);
      // Cerrar la ventana emergente
      closePopup();
    } else {
      setErrorMessage("PIN incorrecto");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    } else if (event.key === "Escape") {
      closePopup();
    }
  };

  return (
    <>
      <div className='bodyPerfiles'>
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
          className='btnadmin'
          onClick={openPopup}
        >
          Administrar perfiles
        </button>
      </div>
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup'>
            <div className='popup-header'>
              <button
                className='close-button'
                onClick={closePopup}
              >
                X
              </button>
            </div>
            <div className='popup-inner'>
              <h2>Introduce tu PIN</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type='text'
                  value={pinValue}
                  onChange={handlePinChange}
                  onKeyDown={handleKeyDown}
                  inputMode='numeric'
                  autoComplete='off'
                  pattern='\d*'
                  maxLength='6'
                />
                <button
                  type='button'
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              </form>
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfiles;
