import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./PerfilEdit.scss";


function Perfil(props) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [logeado, setLogeado] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {}, []);

  const openPopup = () => {
    setErrorMessage("");
    setPinValue("");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePinChange = (event) => {};

  const handleSubmit = () => {};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    } else if (event.key === "Escape") {
      closePopup();
    }
  };

  const items = [
    {
      id: 1,
      name: "Elemento 1",
      designation: "Designación 1",
      image: "../Accets/addAccount.png",
    },
    {
      id: 2,
      name: "Elemento 2",
      designation: "Designación 2",
      image: "../Accets/addAccount.png",
    },
    // Agrega más elementos si es necesario...
  ];
  return (
    <>
      <div className="perfil" onClick={openPopup}>
        <img className="avatar" src={props.avatar} alt="" />
        <h3>{props.full_name}</h3>
      </div>


      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <button className="close-button" onClick={closePopup}>
                X
              </button>
            </div>
            <div className="popup-inner">
              <h2>Introduce tu PIN</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value={pinValue}
                  onChange={handlePinChange}
                  onKeyDown={handleKeyDown}
                  inputMode="numeric"
                  autoComplete="off"
                  pattern="\d*"
                  maxLength="6"
                />
                <button type="button" onClick={handleSubmit}>
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
}

export default Perfil;
