import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./Perfil.scss";

function Perfil(props) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [logeado, setLogeado] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (logeado) {
      localStorage.setItem("Account", JSON.stringify(props.account));
      navigate("/");
    }
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      } else if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [logeado, navigate, props.account]);

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
    if (pinValue.toString() === props.account.pin.toString()) {
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
      <div
        className='perfil'
        onClick={openPopup}
      >
        <img
          className='avatar'
          src={props.avatar}
          alt=''
        />
        <h3>{props.full_name}</h3>
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
}

export default Perfil;
