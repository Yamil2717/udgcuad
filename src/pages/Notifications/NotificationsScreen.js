import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Publication from '../../components/Publication';
import NavBar from '../../components/NavBar';
import Spinner from '../../components/Spinner';
import Notifications from '../../components/Notifications';
import NavigationScreens from '../../components/NavigationScreens';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');

function NotificationsScreen({navigation}) {
  let [showNavBar, setShowNavBar] = useState(false);
  let [loading, setLoading] = useState(false);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView>
      {showNavBar && (
        <NavBar setShowNavBar={setShowNavBar} navigation={navigation} />
      )}
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setShowNavBar(true)}>
          <IconEntypo
            name="menu"
            color="#2A9DD8"
            size={28}
            style={styles.IconNav}
          />
        </TouchableOpacity>
        <View style={styles.formsStyle}>
          <Text style={styles.titleNotification}>Notificaciones</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('a')}>
          <FastImage
            source={{
              uri: authContext.dataUser.avatar,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imageProfile}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.containerBody}>
        <View style={styles.containerHoy}>
          <Text style={styles.textContainerBody}>Hoy</Text>

          <View style={styles.cardContainer}>
            <FastImage
              source={{
                uri: authContext.dataUser.avatar,
                priority: FastImage.priority.normal,
              }}
              style={styles.imageCard}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>8 Votos !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#32DC9F"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>8 Votos !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#32DC9F"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>8 Votos !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#32DC9F"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>8 Votos !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#32DC9F"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>8 Votos !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#32DC9F"
              size={40}
              style={styles.IconNav}
            />
          </View>
        </View>

        <View style={styles.containerAyer}>
          <Text style={styles.textContainerBody}>Anteriores</Text>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={{uri: authContext.dataUser.avatar}}
              style={styles.imageCard}
            />
            <View style={styles.textCard}>
              <Text style={styles.titleCard}>2 Voto !</Text>
              <Text style={styles.descriptionCard}>Descripcion corta</Text>
              <Text style={styles.timeCard}>12 min</Text>
            </View>

            <IconFontAwesome
              name="circle"
              color="#EB4237"
              size={40}
              style={styles.IconNav}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.NavigationScreensStyle}>
        <NavigationScreens navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
  },
  navigate: {
    width: width,
    // maxWidth: width,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
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
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
  titleNotification: {
    fontSize: 22,
    color: '#828282',
  },
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
  containerBody: {
    height: height - 115.1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  containerHoy: {
    // height: height / 2,
  },
  containerAyer: {
    // height: height / 2,
  },
  textContainerBody: {
    fontSize: 18,
    color: '#164578',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CDE7F4',
    padding: 5,
    marginBottom: 5,
  },
  imageCard: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textCard: {
    width: '70%',
  },
  titleCard: {
    color: '#636363',
    fontSize: 14,
  },
  descriptionCard: {
    color: '#828282',
    fontSize: 12,
  },
  timeCard: {
    color: '#828282',
    fontSize: 12,
  },
  NavigationScreensStyle: {
    position: 'absolute',
    top: height - 50,
    left: 0,
    right: 0,
  },
});

export default NotificationsScreen;
