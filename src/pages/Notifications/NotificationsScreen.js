import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Navbar from '../../components/Navbar/Navbar';
import Spinner from '../../components/Spinner';
import NavigationScreens from '../../components/NavigationScreens';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');

function NotificationsScreen({navigation}) {
  let [loading, setLoading] = useState(false);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView>
      <Navbar navigation={navigation} title="Notificaciones" />
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
    backgroundColor: 'white',
    position: 'relative',
  },
  containerBody: {
    height: height - 115.1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
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
