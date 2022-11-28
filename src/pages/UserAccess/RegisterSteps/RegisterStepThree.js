import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  LogBox,
} from 'react-native';
import NavigationRegister from './NavigationRegister';
import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import env from '../../../env';

const {height, width} = Dimensions.get('window');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

function RegisterStepThree({
  step,
  onChangeStep,
  currentLocation,
  setCurrentLocation,
  createUser,
}) {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  ]);

  useEffect(() => {
    activeLocation();
  }, []);

  async function requestLocationPermission() {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ubicación requerida',
          message:
            'La aplicación necesita acceder a su ubicación para continuar',
        },
      );
      if (!granted) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Ubicación requerida',
            message:
              'La aplicación necesita acceder a su ubicación para continuar',
          },
        );
      }

      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async function activeLocation() {
    try {
      requestLocationPermission().then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            async position => {
              let {latitude, longitude} = position.coords;
              await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${env.keyGoogleMaps}`,
              )
                .then(data => data.json())
                .then(data =>
                  setCurrentLocation({
                    ...currentLocation,
                    lat: latitude,
                    long: longitude,
                    locationName: data?.results[0]?.formatted_address,
                  }),
                )
                .catch(err => console.log(err));
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps="always">
      <NavigationRegister
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        createUser={createUser}
      />
      <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
        <Text style={styles.textTitle}>Ubicación</Text>
        <View style={styles.subContainer} keyboardShouldPersistTaps="always">
          <Text style={[styles.textSubTitle, styles.textJustify]}>
            La experiencia de la aplicación se ajusta dependiendo de tu
            ubicación, te recomendamos conceder el acceso a ésta.
          </Text>
          <GooglePlacesAutocomplete
            placeholder="Escribe tu dirección"
            minLength={5}
            fetchDetails={true}
            debounce={500}
            disableScroll={true}
            returnKeyType="search"
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={false}
            keyboardShouldPersistTaps="always"
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              let {lat, lng} = details?.geometry?.location;
              setCurrentLocation({
                lat,
                long: lng,
                locationName: details?.formatted_address,
              });
            }}
            query={{
              key: env.keyGoogleMaps,
              language: 'es',
            }}
            styles={{
              textInputContainer: {...styles.formsStyle},
              textInput: {...styles.input},
              row: {
                backgroundColor: '#F8F8F8',
                padding: 2.5,
                paddingHorizontal: 10,
                margin: 0,
                minHeight: 'auto',
              },
              description: {
                fontWeight: 'bold',
                backgroundColor: '#F8F8F8',
                fontSize: 14,
                padding: 5,
              },
            }}
            renderLeftButton={() => (
              <IconsAwesome5
                name="map-marker-alt"
                color="#2A9DD8"
                size={15}
                style={styles.iconForm}
              />
            )}
          />
          <View style={styles.subContainer2}>
            <Text style={[styles.textSubTitle2, styles.textCenter]}>
              Usa tu ubicación actual
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                if (currentLocation.lat !== 0) {
                  createUser();
                }
              }}
              disabled={currentLocation.lat === 0 ? true : false}>
              <View style={styles.buttonStyle}>
                <IconsAwesome5
                  name="map-marker-alt"
                  color="white"
                  size={15}
                  style={styles.iconForm}
                />
                <Text style={styles.buttonText}>
                  {currentLocation.lat !== 0
                    ? currentLocation.locationName
                    : 'Debes otorgar los permisos necesarios a la aplicación.'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles}>
              <View style={styles.containerMap}>
                <MapView
                  style={styles.map}
                  region={{
                    latitude: parseFloat(currentLocation.lat),
                    longitude: parseFloat(currentLocation.long),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  scrollEnabled={false}>
                  <Marker
                    key={`key_${currentLocation.lat}_${currentLocation.long}`}
                    id={`key_${currentLocation.lat}_${currentLocation.long}`}
                    coordinate={{
                      latitude: parseFloat(currentLocation.lat),
                      longitude: parseFloat(currentLocation.long),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    title="Tu localización"
                    description={currentLocation.locationName}
                  />
                </MapView>
              </View>
            </View>
            <Text style={styles.textSkip} onPress={() => createUser()}>
              Omitir
            </Text>
          </View>
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
  subContainer2: {
    paddingHorizontal: 20,
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 14,
    marginVertical: 10,
  },
  textSubTitle2: {
    color: '#828282',
    fontSize: 16,
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
    paddingVertical: 8.5,
    width: '100%',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 0,
  },
  containerMap: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 250,
  },
  textSkip: {
    textAlign: 'center',
    color: '#2A9DD8',
    fontSize: 16,
    marginTop: 25,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  colorInput: {
    color: '#000000',
  },
  // map: {
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height,
  // },
});

export default RegisterStepThree;
