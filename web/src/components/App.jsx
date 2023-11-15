import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.scss';
// components
import Header from './Header';
import AllInstruments from './AllInstruments';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
// services
import apiInstruments from '../services/api-instruments';
import apiUser from '../services/api-user';
import router from '../services/router';

const App = () => {
  // state: user
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // state: login
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  // state: sign up
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
  // state: instruments
  const [appInstruments, setAppInstruments] = useState([]);
  const [allInstrumentsOptionFamily, setAllInstrumentsOptionFamily] =
    useState('');
  const [allInstrumentsOptionSort, setAllInstrumentsOptionSort] =
    useState('asc');

  /*
  useEffect: obtener los instrumentos del API.
  Se ejecuta cuando allInstrumentsOptionFamily o allInstrumentsOptionSort cambian de valor.
  Como queremos que el back devuelva los instrumentos filtradas por familia y ordenadas por nombre estamos pasando a getInstrumentsFromApi estos dos valores.
  */

  useEffect(() => {
    apiInstruments
      .getInstrumentsByFamilyFromApi(
        allInstrumentsOptionFamily,
        allInstrumentsOptionSort
      )
      .then((data) => {
        setAppInstruments(data);
      });
  }, [allInstrumentsOptionFamily, allInstrumentsOptionSort]);

  /*
  useEffect: obtener el perfil de la usuaria.
  Se ejecuta cuando userId cambian de valor, es decir, cuando pasa de un string vacío a un strin relleno con el id de la usuaria.
  Como queremos que el back devuelva los datos de una usuaria getProfileFromApi recibe el userId.
  */
  useEffect(() => {
    if (userId !== '') {
      apiUser.getProfileFromApi(userId).then((response) => {
        setUserName(response.name);
        setUserEmail(response.email);
        setUserPassword(response.password);
      });
    }
  }, [userId]);

  /*
  Event: enviar datos del login al API.
  Con este evento enviamos los datos del login al servidor cuando la usuaria lanza el evento.
  Como queremos que el back devuelva el id de la usuaria sendLoginToApi recibe el email y la contraseña que ella haya escrito.
  */
  const sendLoginToApi = (loginData) => {
    // Limpiamos el error antes de enviar los datos al API
    setLoginErrorMessage('');
    // Enviamos los datos al API
    apiUser.sendLoginToApi(loginData).then((response) => {
      if (response.success === true) {
        setUserId(response.userId);
        // Si la usuaria introduce bien sus datos redireccionamos desde la página de login al inicio de la página
        router.redirect('/');
      } else {
        // Si la usuaria introduce mal sus datos guardamos el error que nos devuelve el API para que se pinte en la página
        setLoginErrorMessage(response.errorMessage);
      }
    });
  };

  /*
  Event: enviar datos del sign up (o registro) al API.
  Con este evento enviamos los datos del sign up al servidor cuando la usuaria lanza el evento.
  Como queremos que el back devuelva el id de la usuaria sendSingUpToApi recibe el email y la contraseña que ella haya escrito.
  */
  const sendSingUpToApi = (data) => {
    // Limpiamos el error antes de enviar los datos al API
    setSignUpErrorMessage('');
    // Enviamos los datos al API
    apiUser.sendSingUpToApi(data).then((response) => {
      if (response.success === true) {
        setUserId(response.userId);
        // Si la usuaria introduce bien sus datos redireccionamos desde la página de signup al inicio de la página
        router.redirect('/');
      } else {
        // Si la usuaria introduce mal sus datos guardamos el error que nos devuelve el API para que se pinte en la página
        setSignUpErrorMessage(response.errorMessage);
      }
    });
  };

  /*
  Event: enviar datos del profile al API.
  Con este evento enviamos los datos del profile al servidor cuando la usuaria lanza el evento.
  Le tenemos que indicar qué datos (nombre, email y contraseña) queremos enviar al API.
  También le tenemos que indicar cuál es la usuaria actual, por ello enviamos el userId
  */
  const sendProfileToApi = (userId, data) => {
    apiUser.sendProfileToApi(userId, data).then(() => {
      // Después de enviar los datos al servidor los volvemos a pedir al servidor para tenerlos actualizados
      apiUser.getProfileFromApi(userId).then((response) => {
        setUserName(response.name);
        setUserEmail(response.email);
        setUserPassword(response.password);
      });
    });
  };

  //Event: cerrar sesión.
  const logout = () => {
    router.redirect('/');
    router.reload();
    localStorage.clear();
  };

  //Event: actualizar el familia y el orden
  const handleAllInstrumentsOptions = (data) => {
    if (data.key === 'family') {
      setAllInstrumentsOptionFamily(data.value);
    } else if (data.key === 'sort') {
      setAllInstrumentsOptionSort(data.value);
    }
  };

  // render
  return (
    <>
      {/* Le paso Header un booleano indicando si la usuaria está o no logada. */}
      <Header isUserLogged={!!userId} logout={logout} />

      <Routes>
        <Route
          exact
          path='/'
          element={
            <AllInstruments
              instruments={appInstruments}
              allInstrumentsOptionFamily={allInstrumentsOptionFamily}
              allInstrumentsOptionSort={allInstrumentsOptionSort}
              handleAllInstrumentsOptions={handleAllInstrumentsOptions}
            />
          }
        />

        <Route
          path='/login'
          element={
            <Login
              loginErrorMessage={loginErrorMessage}
              sendLoginToApi={sendLoginToApi}
            />
          }
        />

        <Route
          path='/signup'
          element={
            <SignUp
              signUpErrorMessage={signUpErrorMessage}
              sendSingUpToApi={sendSingUpToApi}
            />
          }
        />

        <Route
          path='/profile'
          element={
            <Profile
              userName={userName}
              userEmail={userEmail}
              userPassword={userPassword}
              sendProfileToApi={sendProfileToApi}
              userId={userId}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
