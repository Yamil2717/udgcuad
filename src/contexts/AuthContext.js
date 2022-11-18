import React, {createContext, useState} from 'react';
import {resetGenericPassword} from 'react-native-keychain';

const AuthStateDefault = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
};

const DataUserDefault = {
  id: null,
  name: null,
  email: null,
  typeUser: null,
  avatar: null,
};

const AuthContext = createContext();
const {Provider} = AuthContext;

function AuthProvider({children}) {
  let [dataUser, setDataUser] = useState({...DataUserDefault});
  let [authState, setAuthState] = useState({...AuthStateDefault});

  async function logout() {
    await resetGenericPassword();
    setAuthState({...AuthStateDefault});
  }

  function getAccessToken() {
    return authState.accessToken;
  }

  return (
    <Provider
      value={{
        dataUser,
        setDataUser,
        authState,
        setAuthState,
        getAccessToken,
        logout,
      }}>
      {children}
    </Provider>
  );
}

export {AuthContext, AuthProvider, AuthStateDefault, DataUserDefault};
