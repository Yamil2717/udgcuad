import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AuthProvider} from './src/contexts/AuthContext';
import {AxiosProvider} from './src/contexts/AxiosContext';
import App from './App';

function Root() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
