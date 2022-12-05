import React, {useState, useEffect, useContext} from 'react';
import {Platform, Alert} from 'react-native';
import {LoginManager, Profile} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  //statusCodes,
} from '@react-native-google-signin/google-signin';
import RegisterStepOne from './RegisterSteps/RegisterStepOne';
import RegisterStepTwo from './RegisterSteps/RegisterStepTwo';
import RegisterStepThree from './RegisterSteps/RegisterStepThree';
import env from '../../env';
import Spinner from '../../components/Spinner';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import {setGenericPassword} from 'react-native-keychain';

function createFormData(photo) {
  const data = new FormData();

  data.append('avatar', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  return data;
}

function RegisterScreen({navigation}) {
  let [loading, setLoading] = useState(true);
  let [step, onChangeStep] = useState(0);
  let [name, onChangeName] = useState(null);
  let [email, onChangeEmail] = useState(null);
  let [password, onChangePassword] = useState(null);
  let [rePassword, onChangeRePassword] = useState(null);
  let [phone, onChangePhone] = useState(null);
  let [postalCode, onChangePostalCode] = useState(null);
  let [photo, setPhoto] = useState(null);
  let [typesUser, setTypesUser] = useState([]);
  let [selectTypeUser, onChangeSelectTypeUser] = useState(null);
  let [categoriesInterest, setCategoriesInterest] = useState([]);
  let [tagsCategoriesInterest, setTagsCategoriesInterest] = useState([]);
  let [selectTags, onChangeSelectTags] = useState({});
  let [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    long: 0,
    locationName: 'No street name',
  });
  let authContext = useContext(AuthContext);
  const {publicAxios, authAxios} = useContext(AxiosContext);

  useEffect(() => {
    publicAxios
      .get(`${env.api}/user/types`)
      .then(types => {
        setTypesUser(types);
        onChangeSelectTypeUser(types[0].value);
        publicAxios
          .get(`${env.api}/interest`)
          .then(interests => {
            setCategoriesInterest(interests);
            publicAxios
              .get(`${env.api}/tags`)
              .then(tags => {
                setTagsCategoriesInterest(tags);
                setLoading(false);
              })
              .catch(err => {
                console.error(err?.response?.data?.message || err.message);
                Alert.alert(
                  'Voces',
                  err?.response?.data?.message || err.message,
                );
              });
          })
          .catch(err => {
            console.error(err?.response?.data?.message || err.message);
            Alert.alert('Voces', err?.response?.data?.message || err.message);
          });
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }, []);

  function registerWithFacebook() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (!result.isCancelled) {
          Profile.getCurrentProfile().then(currentProfile => {
            if (currentProfile) {
              if (currentProfile.name) {
                onChangeName(currentProfile.name);
              }
              if (currentProfile.email) {
                onChangeEmail(currentProfile.email);
              }
            }
          });
        }
      },
    );
  }

  function registerWithGoogle() {
    GoogleSignin.configure({
      androidClientId:
        '1070407633105-hbtss9bnqm1kq6go2iic1m4chceiihkp.apps.googleusercontent.com',
      //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              if (userInfo) {
                if (userInfo.user) {
                  if (userInfo.user.name) {
                    onChangeName(userInfo.user.name);
                  }
                  if (userInfo.user.email) {
                    onChangeEmail(userInfo.user.email);
                  }
                  //userInfo.user.photo
                }
              }
            })
            .catch(e => {
              console.error('Ha ocurrido un error: ' + JSON.stringify(e));
            });
        }
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }

  async function createUser() {
    let interestIds = [];
    categoriesInterest.map(category => {
      if (category?.active && category?.active === true) {
        interestIds.push(category.id);
      }
    });
    let tagsIds = [];
    for (const keyID in selectTags) {
      tagsIds.push(Number(keyID));
    }
    let dataCreate = {
      name,
      email,
      password,
      rePassword,
      phone,
      postalCode,
      roleId: selectTypeUser,
      tagsIds,
      interestIds,
      location: currentLocation,
      dateBirth: new Date().toISOString(),
    };
    if (!name) {
      return Alert.alert(
        'Datos faltantes',
        'Debe ingresar su nombre completo.',
      );
    }
    if (!email) {
      return Alert.alert(
        'Datos faltantes',
        'Debe ingresar su correo electrónico.',
      );
    }
    if (!phone) {
      return Alert.alert(
        'Datos faltantes',
        'Debe ingresar su número telefónico.',
      );
    }
    if (!postalCode) {
      return Alert.alert('Datos faltantes', 'Debe ingresar su código postal.');
    }
    if (tagsIds.length === 0 || interestIds.length === 0) {
      return Alert.alert(
        'Datos faltantes',
        'Debe ingresar seleccionar intereses y luego tags.',
      );
    }
    if (password !== rePassword) {
      return Alert.alert('Datos faltantes', 'Las contraseñas no coinciden.');
    }
    if (password.length < 8) {
      return Alert.alert(
        'Datos faltantes',
        'Debe ingresar una contraseña segura (mínimo 8 caracteres).',
      );
    }
    if (photo) {
      await publicAxios
        .post(`${env.api}/images/user/upload`, createFormData(photo), {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(async url => {
          dataCreate.avatar = url;
          await publicAxios
            .post('/user', {...dataCreate})
            .then(async data => {
              let {message} = data;
              Alert.alert('Voces', message);
              await authAxios
                .post('/user/auth', {
                  email: dataCreate.email,
                  password: dataCreate.password,
                })
                .then(async login => {
                  let {accessToken, refreshToken} = login;
                  authContext.setAuthState({
                    accessToken,
                    refreshToken,
                    authenticated: true,
                  });
                  await setGenericPassword(
                    'token',
                    JSON.stringify({
                      accessToken,
                      refreshToken,
                    }),
                  );
                });
            })
            .catch(err => {
              console.error(err?.response?.data?.message || err.message);
              Alert.alert('Voces', err?.response?.data?.message || err.message);
            });
        })
        .catch(err => {
          console.error(err?.response?.data?.message || err.message);
          Alert.alert('Voces', err?.response?.data?.message || err.message);
        });
    } else {
      dataCreate.avatar = `${env.api}/images/user/default.jpeg`;
      await publicAxios
        .post('/user', {...dataCreate})
        .then(async data => {
          let {message} = data;
          Alert.alert('Voces', message);
          await authAxios
            .post('/user/auth', {
              email: dataCreate.email,
              password: dataCreate.password,
            })
            .then(async login => {
              let {accessToken, refreshToken} = login;
              authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
              });
              await setGenericPassword(
                'token',
                JSON.stringify({
                  accessToken,
                  refreshToken,
                }),
              );
            });
        })
        .catch(err => {
          console.error(err?.response?.data?.message || err.message);
          Alert.alert('Voces', err?.response?.data?.message || err.message);
        });
    }
  }

  useEffect(() => {
    if (step === -1) {
      navigation.popToTop();
    }
  }, [step, navigation]);

  if (loading === true) {
    return <Spinner />;
  }

  switch (step) {
    case 0:
      return (
        <RegisterStepOne
          step={step}
          onChangeStep={onChangeStep}
          name={name}
          onChangeName={onChangeName}
          email={email}
          onChangeEmail={onChangeEmail}
          password={password}
          onChangePassword={onChangePassword}
          rePassword={rePassword}
          onChangeRePassword={onChangeRePassword}
          phone={phone}
          onChangePhone={onChangePhone}
          postalCode={postalCode}
          onChangePostalCode={onChangePostalCode}
          registerWithFacebook={registerWithFacebook}
          registerWithGoogle={registerWithGoogle}
        />
      );
    case 1:
      return (
        <RegisterStepTwo
          step={step}
          onChangeStep={onChangeStep}
          photo={photo}
          setPhoto={setPhoto}
          typesUser={typesUser}
          setTypesUser={setTypesUser}
          selectTypeUser={selectTypeUser}
          onChangeSelectTypeUser={onChangeSelectTypeUser}
          categoriesInterest={categoriesInterest}
          setCategoriesInterest={setCategoriesInterest}
          tagsCategoriesInterest={tagsCategoriesInterest}
          selectTags={selectTags}
          onChangeSelectTags={onChangeSelectTags}
        />
      );
    case 2:
      return (
        <RegisterStepThree
          step={step}
          onChangeStep={onChangeStep}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          createUser={createUser}
        />
      );
  }
}

export default RegisterScreen;
