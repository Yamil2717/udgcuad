import React, {useState, useContext, useEffect} from 'react';
import {
  Modal as ModalRN,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconsIonicons from 'react-native-vector-icons/Ionicons';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFoundation from 'react-native-vector-icons/Foundation';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';

const {width, height} = Dimensions.get('window');

function ModalEditInfo({
  type,
  typesUser,
  setTypesUser,
  setProfileInfo,
  refreshPublications,
  textButton1,
  handleButton1,
  textButton2,
  handleButton2,
  modalVisible,
  setModalVisible,
}) {
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [selectTypeUser, onChangeSelectTypeUser] = useState(null);
  let [open, setOpen] = useState(false);
  let [countryIndicator, setCountryIndicator] = useState(null);
  let [phone, setPhone] = useState(null);
  let [postalCode, setPostalCode] = useState(null);
  let [oldPassword, setOldPassword] = useState(null);
  let [password, setPassword] = useState(null);
  let [rePassword, setRePassword] = useState(null);
  let [lock, setLock] = useState(false);

  useEffect(() => {
    setName(authContext.dataUser.name);
    setEmail(authContext.dataUser.email);
    onChangeSelectTypeUser(authContext.dataUser.roleId);
    setCountryIndicator(authContext.dataUser.countryIndicator);
    setPhone(authContext.dataUser.phone);
    setPostalCode(authContext.dataUser.postalCode);
  }, []);

  async function validateProfile() {
    let failed = false;
    if (
      name === authContext.dataUser.name &&
      email === authContext.dataUser.email &&
      selectTypeUser === authContext.dataUser.roleId &&
      countryIndicator === authContext.dataUser.countryIndicator &&
      phone === authContext.dataUser.phone &&
      postalCode === authContext.dataUser.postalCode &&
      !oldPassword &&
      !password &&
      !rePassword
    ) {
      failed = true;
      setModalVisible(!modalVisible);
    }
    if (!name) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un nombre completo.');
    }
    if (!email) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un email.');
    }
    if (!countryIndicator) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un código de país.');
    }
    if (countryIndicator.length <= 0 || countryIndicator.length > 3) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un código de país válido.');
    }
    if (!phone) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un numero telefónico.');
    }
    if (phone.length !== 10) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un numero telefónico válido.');
    }
    if (!postalCode) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar un código postal.');
    }
    if (oldPassword && (!password || !rePassword)) {
      failed = true;
      Alert.alert(
        'Voces',
        'Debes ingresar la nueva contraseña y repetir está.',
      );
    } else if (!oldPassword && password && rePassword) {
      failed = true;
      Alert.alert('Voces', 'Debes ingresar la contraseña antigua.');
    }
    if (password?.length < 8) {
      failed = true;
      Alert.alert(
        'Voces',
        'La nueva contraseña no puede contener menos de 8 caracteres.',
      );
    }
    if (password !== rePassword) {
      failed = true;
      Alert.alert(
        'Voces',
        'La nueva contraseña y la repetición de la nueva contraseña no coinciden.',
      );
    }
    if (!selectTypeUser && authContext.dataUser.role.name !== 'Administrador') {
      failed = true;
      Alert.alert('Voces', 'Debes escoger un tipo de usuario.');
    }
    if (lock) {
      return true;
    }
    setLock(true);
    if (!failed) {
      let dataUpdate = {};
      if (name) {
        dataUpdate.name = name;
      }
      if (email) {
        dataUpdate.email = email;
      }
      if (countryIndicator) {
        dataUpdate.countryIndicator = countryIndicator;
      }
      if (phone) {
        dataUpdate.phone = phone;
      }
      if (postalCode) {
        dataUpdate.postalCode = postalCode;
      }
      if (password) {
        dataUpdate.password = password;
      }
      if (oldPassword) {
        dataUpdate.oldPassword = oldPassword;
      }
      if (selectTypeUser) {
        dataUpdate.roleId = selectTypeUser;
      }
      await authAxios
        .put('/user/data', dataUpdate)
        .then(userData => {
          authContext.setDataUser({...userData});
          refreshPublications();
          setProfileInfo(userData);
          setLock(false);
        })
        .catch(err => {
          setLock(false);
          console.error(err?.response?.data?.message || err.message);
          Alert.alert('Voces', err?.response?.data?.message || err.message);
        });
    }
    return failed;
  }

  return (
    <ModalRN
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.container,
            type === 'profile' ? styles.heightProfile : styles.heightGroup,
          ]}>
          {type === 'profile' ? (
            <ScrollView style={styles.containerInputs}>
              <Text style={styles.modalTitle}>Tu perfil</Text>
              <View>
                <Text style={styles.textSubTitle}>Nombre completo</Text>
                <View style={styles.formsStyle}>
                  <IconsAwesome5
                    name="user-alt"
                    color="#2A9DD8"
                    size={15}
                    style={styles.iconForm}
                  />
                  <TextInput
                    placeholder="Nombre completo"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <Text style={styles.textSubTitle}>Email</Text>
                <View style={styles.formsStyle}>
                  <IconsMaterial
                    name="email"
                    color="#2A9DD8"
                    size={15}
                    style={styles.iconForm}
                  />
                  <TextInput
                    placeholder="example@voces.com"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                {authContext.dataUser.role.name !== 'Administrador' && (
                  <>
                    <Text style={styles.textSubTitle}>Tipo de usuario</Text>
                    <DropDownPicker
                      open={open}
                      setOpen={setOpen}
                      items={typesUser}
                      setItems={setTypesUser}
                      value={selectTypeUser}
                      setValue={onChangeSelectTypeUser}
                      listMode="SCROLLVIEW"
                      placeholder="Seleccionar"
                      style={styles.dropDownStyle}
                      containerStyle={styles.containerDropDownPicker}
                      dropDownStyle={styles.dropDownPickerBackground}
                      labelStyle={styles.dropDownPickerLabel}
                      itemStyle={styles.dropDownPickerItem}
                    />
                  </>
                )}
                <Text style={styles.textSubTitle}>Código de país</Text>
                <View style={styles.formsStyle}>
                  <IconsIonicons
                    name="ios-add-sharp"
                    color="#2A9DD8"
                    size={15}
                    style={styles.iconForm}
                  />
                  <TextInput
                    placeholder="52"
                    keyboardType="numeric"
                    style={styles.input}
                    value={countryIndicator}
                    onChangeText={setCountryIndicator}
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
                    placeholder="3154789878"
                    keyboardType="numeric"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                <Text style={styles.textSubTitle}>Código postal</Text>
                <View style={styles.formsStyle}>
                  <IconsAwesome5
                    name="map-marker-alt"
                    color="#2A9DD8"
                    size={15}
                    style={styles.iconForm}
                  />
                  <TextInput
                    placeholder="15487"
                    keyboardType="numeric"
                    style={styles.input}
                    value={postalCode}
                    onChangeText={setPostalCode}
                  />
                </View>
                <Text style={styles.modalTitle}>Seguridad</Text>
                <Text style={styles.descriptionTitle}>
                  Dejar en blanco si no se desea actualizar su contraseña
                </Text>
                <Text style={styles.textSubTitle}>Antigua contraseña</Text>
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
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                </View>
                <Text style={styles.textSubTitle}>Nueva contraseña</Text>
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                </View>
                <Text style={styles.textSubTitle}>
                  Repetir nueva contraseña
                </Text>
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
                    value={rePassword}
                    onChangeText={setRePassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <Text>Group</Text>
          )}
          <View style={styles.containerButtons}>
            {textButton2 && (
              <Pressable
                style={styles.button2}
                onPress={() => {
                  handleButton2 && handleButton2();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textButton2}>{textButton2}</Text>
              </Pressable>
            )}
            <Pressable
              style={styles.button1}
              onPress={async () => {
                if (type === 'profile') {
                  if (await validateProfile()) {
                    return;
                  }
                }
                handleButton1 && handleButton1();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textButton1}>{textButton1}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  container: {
    width: width - 40,
    margin: 20,
    backgroundColor: 'white',
    paddingTop: 35,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  heightProfile: {
    height: height - 40,
  },
  heightGroup: {
    height: height / 2 - 40,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
  },
  descriptionTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 20,
  },
  containerInputs: {
    paddingHorizontal: 55,
    width: '100%',
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
  dropDownStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: 35,
    borderRadius: 24,
    borderColor: 'transparent',
  },
  containerDropDownPicker: {
    width: '100%',
  },
  dropDownPickerBackground: {
    backgroundColor: '#fafafa',
  },
  dropDownPickerLabel: {
    fontSize: 14,
  },
  dropDownPickerItem: {
    justifyContent: 'flex-start',
    height: 15,
  },
  containerButtons: {
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button1: {
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 25,
    elevation: 2,
    color: 'white',
    backgroundColor: '#2196F3',
    borderWidth: 1,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 25,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textButton1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  textButton2: {
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ModalEditInfo;
