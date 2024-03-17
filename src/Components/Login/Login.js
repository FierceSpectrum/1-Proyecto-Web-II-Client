import React,{ useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();

  const [logeado, setLogeado] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState([]);
  const [errorlogin, setErrorLogin] = useState("");



  useEffect(() => {
    if (!!user.id) {
      setLogeado(true);
      setErrorLogin("");
    }

    if (logeado) {
      localStorage.setItem('User', JSON.stringify(user));
      localStorage.setItem('Login', true);
      navigate("/Perfiles");
    }
  }, [user.id, logeado, navigate, user]);

  const urllogin = "http://localhost:3001/api/usersLogin";

  const Validar = async () => {
    const data = {
      email: email,
      password: password,
    };

    await fetch(urllogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorLogin("Error con la conexion");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((user) => {
          const data = {
            id: user._id,
            email: user.email,
            pin: user.pin,
            name: user.name,
            last_name: user.last_name,
          };
          setUser(data);
          return;
        });
        setErrorLogin("El usuario o contraseña son invalidos");
        return;
      })
      .catch((err) => {
        console.log("error: " + err);
        setErrorLogin("El usuario o contraseña son invalidos");
      });
  };

  return (
    <>
      <div className='boddylogin'>
        <section>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Inicio</h1>
            <div className='errormesage'>
              <p>{errorlogin}</p>
            </div>
            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <input
                type='text'
                onChange={(ev) => setEmail(ev.target.value)}
                required
                autoComplete='username'
              />
              <label htmlFor=''>Usuario</label>
            </div>
            <div className='inputbox'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                onChange={(ev) => setPassword(ev.target.value)}
                required
                autoComplete='current-password'
              />
              <label htmlFor=''>Contraseña</label>
            </div>
            <div className='forget'>
              <label htmlFor=''>
                <input type='checkbox' />
                Recordar
              </label>
              <a href='/#'>Olvidé la Contraseña</a>
            </div>
            <button onClick={() => (!!email && !!password ? Validar() : "")}>
              Iniciar
            </button>
            <div className='register'>
              <p>
                No tengo una cuenta <a href='/Register'>Registrate</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
