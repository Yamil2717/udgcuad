import React from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import NavigationRegister from './NavigationRegister';

import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFoundation from 'react-native-vector-icons/Foundation';

function RegisterStepOne({
  step,
  onChangeStep,
  name,
  onChangeName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  rePassword,
  onChangeRePassword,
  phone,
  onChangePhone,
  postalCode,
  onChangePostalCode,
  registerWithFacebook,
  registerWithGoogle,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationRegister
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <ScrollView>
        <Text style={styles.textTitle}>Crear cuenta</Text>
        <View style={styles.subContainer}>
          <Text style={styles.textSubTitle}>Nombre completo</Text>
          <View style={styles.formsStyle}>
            <IconsAwesome5
              name="user-alt"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              value={name}
              onChangeText={onChangeName}
            />
          </View>
          <Text style={styles.textSubTitle}>Correo electrónico</Text>
          <View style={styles.formsStyle}>
            <IconsMaterial
              name="email"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="voces@gmail.com"
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          <Text style={styles.textSubTitle}>Contraseña</Text>
          <View style={styles.formsStyle}>
            <IconsFoundation
              name="lock"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="********"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={onChangePassword}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.textSubTitle}>Repetir contraseña</Text>
          <View style={styles.formsStyle}>
            <IconsFoundation
              name="lock"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="********"
              style={styles.input}
              secureTextEntry={true}
              value={rePassword}
              onChangeText={onChangeRePassword}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.textSubTitle}>Teléfono</Text>
          <View style={styles.formsStyle}>
            <IconsMaterial
              name="phone"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="345 548 9415"
              style={styles.input}
              value={phone}
              onChangeText={onChangePhone}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.textSubTitle}>Código Postal</Text>
          <View style={styles.formsStyle}>
            <IconsAwesome5
              name="map-marker-alt"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="00000"
              keyboardType="numeric"
              style={styles.input}
              value={postalCode}
              onChangeText={onChangePostalCode}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerWithGoogle()}>
            <Image
              source={require('../../../assets/icons/LogoGoogleIcon.png')}
              style={styles.icons2}
            />
            <Text style={styles.buttonText}>Ingresa con Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerWithFacebook()}>
            <Image
              source={require('../../../assets/icons/LogoFacebook.png')}
              style={styles.icons2}
            />
            <Text style={styles.buttonText}>Ingresa con Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textTitle: {
    color: '#2A9DD8',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subContainer: {
    marginHorizontal: 50,
    marginBottom: 10,
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 5,
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginBottom: 10,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
    padding: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 7,
    borderColor: '#2A9DD8',
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginBottom: 20,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons2: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  buttonText: {
    color: '#164578',
    fontSize: 16,
    fontWeight: '300',
  },
});

export default RegisterStepOne;
