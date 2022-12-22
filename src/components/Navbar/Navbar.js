import React, {useState, useContext} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import NavbarFloat from './NavbarFloat';

const {width, height} = Dimensions.get('window');
function Navbar({navigation, title = ''}) {
  let authContext = useContext(AuthContext);
  let {avatar, id} = authContext.dataUser;
  let [showNavbarFloat, setShowNavbarFloat] = useState(false);

  return (
    <>
      {showNavbarFloat && (
        <NavbarFloat setShowNavbarFloat={setShowNavbarFloat} />
      )}
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setShowNavbarFloat(true)}>
          <IconEntypo
            name="menu"
            color="#2A9DD8"
            size={28}
            style={styles.IconNav}
          />
        </TouchableOpacity>
        {title.length === 0 ? (
          <View style={styles.formsStyle}>
            <TextInput
              placeholder="Busca temas de tu interés"
              style={styles.input}
              textColor={styles.colorInput}
            />
            <IconFontisto
              name="search"
              color="#2A9DD8"
              size={16}
              style={styles.iconForm}
            />
          </View>
        ) : (
          <View style={styles.formsStyleText}>
            <Text style={styles.titleNotification}>{title}</Text>
          </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {id})}>
          <FastImage
            source={{
              uri: avatar,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.imageProfile}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navigate: {
    width: width,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  menu: {
    height: 35,
    marginRight: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35,
    marginVertical: 10,
    width: 280,
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
  },
  formsStyleText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  titleNotification: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#828282',
  },
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
});

export default Navbar;
