import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Register.scss";

function Register() {
  const navigate = useNavigate();

  const [logeado, setLogeado] = useState();
  const [email, setEmail] = useState();
  const [pin, setPin] = useState();
  const [lastName, setLastName] = useState();
  const [name, setName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [day, setDay] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [user, setUser] = useState([]);
  const [errorRegister, setErrorRegister] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorPin, setErrorPin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (!!user.id) {
      setLogeado(true);
      setErrorRegister("");
    }

    if (logeado) {
      // localStorage.setItem("User", JSON.stringify(user));
      // localStorage.setItem("Login", true);
      navigate("/Login");
    }
    if (!!countries) {
      generateCountrisOptions();
    }
    validateDate();
  }, [user.id, logeado, navigate, user]);

  function calculateAge(birthdate) {
    const today = new Date();
    const diff = today - birthdate;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  const Validar = async () => {
    if (pin.length !== 6) {
      setErrorPin("El PIN debe tener 6 números");
      return;
    }

    if (password !== confirmPassword) {
      setErrorPassword("Las contraseñas no coinsiden");
      return;
    }

    if (!!errorDate) {
      return;
    }

    const brigt = `${year}/${month}/${day}`;
    setBirthdate(new Date(brigt));
    if (isNaN(birthdate) || calculateAge(birthdate) < 18) {
      setErrorDate("Deves de ser mayor de edad");
      return;
    }

    const data = {
      name: name,
      last_name: lastName,
      birthdate: brigt,
      pin: parseInt(pin),
      country: country,
      email: email,
      password: password,
    };
    console.log(data);

    const urllogin = "http://localhost:3001/api/users";

    await fetch(urllogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(errorData.error);
            });
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const user = {
          id: data._id,
          email: data.email,
          pin: data.pin,
          name: data.name,
          last_name: data.last_name,
        };

        setUser(user);
        return;
      })
      .catch((err) => {
        setErrorRegister(err.message);
      });
  };

  const generateDaysOptions = () => {
    const days = [];
    const numDays = 31;
    for (let i = 1; i <= numDays; i++) {
      days.push(
        <option
          key={i}
          value={i}
        >
          {i}
        </option>
      );
    }
    return days;
  };

  const generateMonthsOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(
        <option
          key={i}
          value={i}
        >
          {i}
        </option>
      );
    }
    return months;
  };

  const generateYearsOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(
        <option
          key={i}
          value={i}
        >
          {i}
        </option>
      );
    }
    return years;
  };

  const generateCountrisOptions = async () => {
    const countries = [];
    const urlcountry = "https://restcountries.com/v3.1/all";
    await fetch(urlcountry, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorRegister("Error con la conexion");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .forEach((country) => {
            countries.push(
              <option
                key={country.cca3}
                value={country.cca3}
              >
                {country.name.common}
              </option>
            );
          });
        setCountries(countries);
      })
      .catch((err) => {
        console.log("error: " + err);
        setErrorRegister("no se que pasa");
      });
  };

  useEffect(() => {
    validateDate();
  }, [day, month, year]);

  const validateDate = () => {
    const nan = !(isNaN(day) || isNaN(month) || isNaN(year));
    const txt = !(!day || !month || !year);
    if (nan && txt) {
      if (year < 1900 || year > new Date().getFullYear()) {
        setErrorDate("Año inválido");
      } else if (month < 1 || month > 12) {
        setErrorDate("Mes inválido");
      } else {
        const maxDays = new Date(year, month, 0).getDate();
        if (day < 1 || day > maxDays) {
          setErrorDate("Día inválido");
        } else {
          setBirthdate(new Date(year, month, day));
          setErrorDate("");
          return true;
        }
      }
    } else {
      setErrorDate("");
    }
    return false;
  };

  const handlePinChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setPin(value);
    if (value === event.target.value) {
      setErrorPin("");
    }
  };

  return (
    <>
      <div className='boddyregister'>
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Validar();
            }}
          >
            <h1>Registro</h1>
            <div className='errormesage'>
              <p>{errorRegister}</p>
            </div>

            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <input
                type='text'
                onChange={(ev) => setName(ev.target.value)}
                required
                autoComplete='name'
              />
              <label htmlFor=''>Name</label>
            </div>

            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <input
                type='text'
                onChange={(ev) => setLastName(ev.target.value)}
                required
                autoComplete='lastname'
              />
              <label htmlFor=''>LastName</label>
            </div>

            <div className='errormesage'>
              <p>{errorDate}</p>
            </div>
            <div className='inputbox birthdate'>
              <ion-icon name='mail-outline'></ion-icon>
              <select
                type='select'
                onChange={(ev) => {
                  setDay(parseInt(ev.target.value));
                  setErrorDate("");
                }}
                required
                name='day'
                id='day'
                autoComplete='birthdate'
              >
                <option value=''>Day</option>
                {generateDaysOptions()}
              </select>
              <select
                type='select'
                onChange={(ev) => {
                  setMonth(parseInt(ev.target.value));
                  setErrorDate("");
                }}
                required
                name='month'
                id='month'
                autoComplete='birthdate'
              >
                <option value=''>Month</option>
                {generateMonthsOptions()}
              </select>
              <select
                type='select'
                onChange={(ev) => {
                  setYear(parseInt(ev.target.value));
                  setErrorDate("");
                }}
                required
                name='year'
                id='year'
                autoComplete='birthdate'
              >
                <option value=''>Year</option>
                {generateYearsOptions()}
              </select>
              <label htmlFor=''>Birthdate</label>
            </div>

            <div className='errormesage'>
              <p>{errorPin}</p>
            </div>
            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <input
                type='text'
                value={pin}
                onChange={handlePinChange}
                required
                inputMode='numeric'
                autoComplete='pin'
                pattern='\d*'
                maxLength='6'
              />
              <label htmlFor=''>Pin</label>
            </div>

            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <select
                type='select'
                onChange={(ev) => {
                  setCountry(ev.target.value);
                }}
                required
                name='countries'
                id='countries'
                autoComplete='country'
              >
                <option value=''>Country</option>
                {countries}
              </select>
            </div>

            <div className='inputbox'>
              <ion-icon name='mail-outline'></ion-icon>
              <input
                type='text'
                onChange={(ev) => setEmail(ev.target.value)}
                required
                autoComplete='username'
              />
              <label htmlFor=''>Email</label>
            </div>

            <div className='errormesage'>
              <p>{errorPassword}</p>
            </div>
            <div className='inputbox'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                onChange={(ev) => {
                  setPassword(ev.target.value);
                  setErrorPassword("");
                }}
                required
                autoComplete='current-password'
              />
              <label htmlFor=''>Password</label>
            </div>

            <div className='inputbox'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                onChange={(ev) => {
                  setConfirmPassword(ev.target.value);
                  setErrorPassword("");
                }}
                required
                autoComplete='current-password'
              />
              <label htmlFor=''>Confirm Password</label>
            </div>
            <button>Registrar</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
