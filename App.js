import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from './src/contexts/AuthContext';
import {getGenericPassword} from 'react-native-keychain';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Spinner from './src/components/Spinner';
import HomeScreen from './src/pages/HomeScreen';
import LoginScreen from './src/pages/UserAccess/LoginScreen';
import RegisterScreen from './src/pages/UserAccess/RegisterScreen';

import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const authContext = useContext(AuthContext);
  let [loading, setLoading] = useState(true);

  const loadJWT = useCallback(async () => {
    try {
      let value = await getGenericPassword();
      console.log(`value of get auth "${value}"`);
      let JWT = JSON.parse(value.password);
      authContext.setAuthState({
        accessToken: JWT.accessToken || null,
        refreshToken: JWT.refreshToken || null,
        authenticated: JWT.refreshToken !== null,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        `Ha sucedido un error, contacté al administrador y provéase la siguiente información: ${error.message}`,
      );

      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  console.log(authContext?.authState?.authenticated);

  return loading ? (
    <Spinner />
  ) : authContext?.authState?.authenticated ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: null, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{title: null, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
