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
import Axios from 'axios';
import env from '../../env';
import Spinner from '../../components/Spinner';
import {AxiosContext} from '../../contexts/AxiosContext';

function createFormData(photo) {
  const data = new FormData();

  data.append('avatar', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  /*Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });*/

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

  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    Axios.get(`${env.api}/user/types`)
      .then(({data}) => {
        setTypesUser(data.data);
        onChangeSelectTypeUser(data.data[0].value);
        Axios.get(`${env.api}/interest`)
          .then(({data}) => {
            setCategoriesInterest(data.data);
            Axios.get(`${env.api}/tags`)
              .then(({data}) => {
                setTagsCategoriesInterest(data.data);
                setLoading(false);
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
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
      .catch(err => console.error(err));
  }

  async function createUser() {
    try {
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
        userType: selectTypeUser,
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
        return Alert.alert(
          'Datos faltantes',
          'Debe ingresar su código postal.',
        );
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
        await authAxios
          .post(`${env.api}/images/user/upload`, createFormData(photo), {
            headers: {'Content-Type': 'multipart/form-data'},
          })
          .then(({data}) => {
            dataCreate.avatar = data.data;
            authAxios
              .post('/user', {...dataCreate})
              .then(data2 => {
                let {message} = data2.data;
                Alert.alert('Voces', message);
                navigation.navigate('Login');
              })
              .catch(err => console.error(JSON.stringify(err)));
          })
          .catch(err => console.error(JSON.stringify(err)));
      } else {
        dataCreate.avatar = `${env.api}/images/user/default.jpeg`;
        await authAxios
          .post('/user', {...dataCreate})
          .then(({data}) => {
            let {message} = data;
            Alert.alert('Voces', message);
            navigation.navigate('Login');
          })
          .catch(err => console.error(JSON.stringify(err)));
      }
    } catch (err) {
      console.error(JSON.stringify(err));
      Alert.alert(err?.response?.data?.message || err.message);
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
