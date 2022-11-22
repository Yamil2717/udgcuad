import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavigationRegister from './NavigationRegister';
import Geolocation from '@react-native-community/geolocation';
import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';

function RegisterStepThree({
  step,
  onChangeStep,
  currentLocation,
  setCurrentLocation,
  createUser,
}) {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Localización requerida.',
        message:
          'Está aplicación necesita acceder a tu locación para continuar.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          setCurrentLocation({long: currentLongitude, lat: currentLatitude});
        },
        error => console.error(error),
      );
    } else {
      alert(
        'Debes autorizar a la aplicación a acceder a tu locación para poder continuar.',
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationRegister
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        createUser={createUser}
      />
      <ScrollView>
        <Text style={styles.textTitle}>Ubicación</Text>
        <View style={styles.subContainer}>
          <Text style={[styles.textSubTitle, styles.textJustify]}>
            La experiencia de la aplicación se ajusta dependiendo de tu
            ubicación, te recomendamos conceder el acceso a ésta:
          </Text>
          <View style={styles.formsStyle}>
            <IconsAwesome5
              name="map-marker-alt"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />
            <TextInput
              placeholder="Escribe tu dirección"
              style={styles.input}
              value={currentLocation.addressManual}
              onChangeText={value =>
                setCurrentLocation({...currentLocation, addressManual: value})
              }
              textColor={styles.colorInput}
              theme={{
                colors: {
                  placeholder: '#000000',
                  text: '#000000',
                  primary: '#000000',
                },
              }}
              selectionColor="#000000"
              accessibilityIgnoresInvertColors={true}
            />
          </View>
          <Text style={[styles.textSubTitle, styles.textCenter]}>
            Usa tu ubicación actual
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => requestLocationPermission()}>
            <IconsAwesome5
              name="map-marker-alt"
              color="white"
              size={15}
              style={styles.iconForm}
            />
            <Text style={styles.buttonText}>
              {currentLocation?.long
                ? `Longitud: ${currentLocation.long} - Latitud: ${currentLocation.lat}`
                : currentLocation?.addressManual
                ? currentLocation?.addressManual
                : 'No se pudo obtener su ubicación.'}
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../../../assets/map.jpg')}
            style={styles.map}
          />
          <Text
            style={styles.textSkip}
            onPress={() => {
              setCurrentLocation({});
              createUser();
            }}>
            Omitir
          </Text>
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
    marginVertical: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
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
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2A9DD8',
    height: 35,
    borderRadius: 24,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#2A9DD8',
    color: 'white',
    fontSize: 16,
    height: 35,
    paddingVertical: 7,
    width: '100%',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 0,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  textSkip: {
    textAlign: 'center',
    color: '#2A9DD8',
    fontSize: 16,
    marginTop: 10,
  },
  colorInput: {
    color: '#000000',
  },
});

export default RegisterStepThree;
