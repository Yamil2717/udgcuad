import React, {createContext, useContext} from 'react';
import Axios from 'axios';
import {AuthContext, AuthStateDefault} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {setGenericPassword} from 'react-native-keychain';
import env from '../env.js';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = Axios.create({baseURL: env.api});

  const publicAxios = Axios.create({baseURL: env.api});

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  async function refreshAuthLogic(failedRequest) {
    let data = {refreshToken: authContext.authState.refreshToken};

    let options = {
      method: 'POST',
      data,
      url: `${env.api}/refreshToken`,
    };

    return Axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext.authState.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch(e => {
        authContext.setAuthState({...AuthStateDefault});
      });
  }

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
