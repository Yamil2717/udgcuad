import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RegisterStepOne from './RegisterSteps/RegisterStepOne';
import RegisterStepTwo from './RegisterSteps/RegisterStepTwo';
import RegisterStepThree from './RegisterSteps/RegisterStepThree';

function RegisterScreen() {
  let [step, setStep] = useState(0);

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState('');
  let [postalCode, setPostalCode] = useState('');
  let [password, setPassword] = useState('');
  let [rePassword, setRePassword] = useState('');
  let [photo, setPhoto] = useState(null);

  let [typesUser, setTypesUser] = useState([
    {label: 'Empresario', value: '1'},
    {label: 'Desarrollador', value: '2'},
    {label: 'Funcionario público ', value: '3'},
    {label: 'Vendedor', value: '4'},
    {label: 'Usuario vivienda', value: '5'},
    {label: 'Académicos', value: '6'},
    {label: 'Organizaciones Civiles', value: '7'},
    {label: 'Financieros de Vivienda', value: '8'},
  ]);

  let [categoriesInterest, setCategoriesInterest] = useState([
    {
      id: 0,
      img: require('../../assets/Gestion-Urbana.png'),
      name: 'Gestión Urbana',
    },
    {
      id: 1,
      img: require('../../assets/Transporte-Publico.png'),
      name: 'Transporte público',
    },
    {
      id: 2,
      img: require('../../assets/Transporte-Publico.png'),
      //img: require('../../assets/')
      name: 'xd',
    },
  ]);

  let [tagsCategoriesInterest, setTagsCategoriesInterest] = useState([]);

  function handleChoosePhoto() {
    // launchImageLibrary({ noData: true }, (response) => {
    //   // console.log(response);
    //   if (response) {
    //     setPhoto(response);
    //   }
    // });
  }

  return (
    <>
      {step === 0 ? (
        <RegisterStepOne
          setStep={setStep}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          styles={styles}
        />
      ) : step === 1 ? (
        <RegisterStepTwo
          setStep={setStep}
          password={password}
          setPassword={setPassword}
          rePassword={rePassword}
          setRePassword={setRePassword}
          styles={styles}
        />
      ) : (
        step === 2 && (
          <RegisterStepThree
            setStep={setStep}
            photo={photo}
            setPhoto={setPhoto}
            handleChoosePhoto={handleChoosePhoto}
            typesUser={typesUser}
            categoriesInterest={categoriesInterest}
            styles={styles}
          />
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
  buttonsNextPrev: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: '#156746',
    fontSize: 45,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  subContainerStep1: {
    marginHorizontal: 50,
  },
  subContainerStep2: {
    marginHorizontal: 50,
  },
  subContainer: {
    textAlign: 'center',
  },
  buttons: {
    alignItems: 'center',
  },
  inputLogin: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingStart: 15,
    color: '#E2E2E2',
  },
  textSubTitle: {
    // flex: 1,
    color: 'black',
    fontSize: 20,
    marginVertical: 5,
  },
  textNext: {
    color: '#45A17C',
  },
  textTitle2: {
    color: '#828282',
    fontSize: 25,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  containerTheme: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 6,
  },
  containerTags: {
    justifyContent: 'center',
    // flex: 6,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  cardThemes: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    // flex: 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 15,
  },
  itemText: {
    // flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: '#45A17C',
  },
  flatListCustom: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DropDownPickerCtyle: {
    borderRadius: 25,
  },
  containerMap: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: '80%',
    height: 300,
  },
  textTitleUbication: {
    color: '#156746',
    fontSize: 25,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  textTitleOmitir: {
    color: '#156746',
    fontSize: 25,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  textTitleUbication2: {
    color: '#828282',
    fontSize: 25,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 10,
  },
  textDescripcionUbication: {
    color: '#828282',
    fontSize: 16,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '10%',
  },
  inputUbication: {
    marginHorizontal: 15,
  },
});

export default RegisterScreen;
