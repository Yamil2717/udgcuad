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
  header: null,
  location: null,
  phone: null,
  postalCode: null,
  interestIds: null,
  tagsIds: null,
  groups: null,
};

const AuthContext = createContext();
const {Provider} = AuthContext;

function AuthProvider({children}) {
  let [dataUser, setDataUser] = useState({...DataUserDefault});
  let [dataGroups, setDataGroups] = useState([]);
  let [friends, setFriends] = useState({});
  let [follows, setFollows] = useState({});
  let [authState, setAuthState] = useState({...AuthStateDefault});

  function getAccessToken() {
    return authState.accessToken;
  }

  async function logout() {
    await resetGenericPassword();
    setAuthState({...AuthStateDefault});
  }
  return (
    <Provider
      value={{
        dataUser,
        setDataUser,
        dataGroups,
        setDataGroups,
        friends,
        setFriends,
        follows,
        setFollows,
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
