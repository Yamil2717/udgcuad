import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
// import {AuthContext} from '../../../contexts/AuthContext';
import NavigationGroups from './NavigationGroups';
import IconsFeather from 'react-native-vector-icons/Feather';

const {height} = Dimensions.get('window');

function CreateGroupStepOne({
  step,
  onChangeStep,
  photo,
  setPhoto,
  setName,
  name,
}) {
  // let authContext = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationGroups
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <ScrollView>
        <View style={styles.navigate}>
          <Text style={styles.title}>Crear una comunidad nueva</Text>

          <Text style={[styles.textSubTitle, styles.textCenter]}>
            Selecciona una imagen
          </Text>
          <View style={styles.containerPhoto}>
            {photo ? (
              <TouchableOpacity
              // onPress={}
              >
                <Image source={{uri: photo.uri}} style={styles.photoUser} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              // onPress={choosePhoto}
              >
                <Image
                  source={require('../../../assets/icons/ChooseImage.png')}
                  style={styles.noPhoto}
                />
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.textTitle]}>Nombre o comunidad del grupo</Text>
          <View style={styles.formsStyle}>
            <IconsFeather
              name="users"
              color="#2A9DD8"
              size={15}
              style={styles.iconForm}
            />

            <TextInput
              placeholder="Nombre"
              style={styles.input}
              value={name}
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
          <Text style={[styles.textTitle]}>Descripcion</Text>
          <View style={styles.formsStyle}>
            <TextInput
              placeholder="Descripcion"
              style={styles.inputDescription}
              value={name}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: height,
  },
  navigate: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginVertical: 20,
    color: '#16457B',
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 10,
  },
  textTitle: {
    marginVertical: 10,
    marginHorizontal: 30,
    color: '#828282',
    fontSize: 15,
  },
  textCenter: {
    textAlign: 'center',
  },
  containerPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUser: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginBottom: 10,
  },
  iconForm: {
    marginTop: 10,
    marginHorizontal: 30,
    padding: 0,
  },
  inputDescription: {
    marginTop: 10,
    marginHorizontal: 30,

    padding: 0,
  },

  noPhoto: {
    width: 100,
    height: 100,
  },
});

export default CreateGroupStepOne;
