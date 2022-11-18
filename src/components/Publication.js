import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Image, Input, Button, ButtonGroup, withTheme, Card} from 'react-native';

function Publication() {
  return (
    <View>
      <View style={styles.informationProfile}>
        <Image
          source={require('../assets/ImgProfile.png')}
          containerStyle={styles.ImageProfile}
        />
        <View>
          <Text style={styles.titleInformationProfile}>Ciclovías</Text>
          <Text style={styles.subTitleInformationProfile}>Pedro Gutiérrez</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.descriptionPublication}>
          <Text style={styles.descriptionText}>
            Se permite el paso de tríciclos por ciclovías
          </Text>
          <Text style={styles.userLinked}>@Juan Gutiérrez</Text>
          <View style={styles.hashtagsContainter}>
            <Text style={styles.hashtags}>#gobiernogdl</Text>
            <Text style={styles.hashtags}>#bicicletas</Text>
            <Text style={styles.hashtags}>#circulación</Text>
          </View>
        </View>
        <View style={styles.picturePublication}>
          <Image
            source={require('../assets/PublicationImg.png')}
            containerStyle={styles.ImagePublication}
          />
        </View>
        <View style={styles.hashtagsContainter}>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/EllipseGreen.png')}
              containerStyle={styles.semaphoreColor}
            />
            <Text style={styles.semaphoreNumber}>18</Text>
          </View>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/EllipseYellow.png')}
              containerStyle={styles.semaphoreColor}
            />
            <Text style={styles.semaphoreNumber}>18</Text>
          </View>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/EllipseRed.png')}
              containerStyle={styles.semaphoreColor}
            />
            <Text style={styles.semaphoreNumber}>18</Text>
          </View>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/icons/VectorComment.png')}
              containerStyle={styles.semaphoreColor}
            />
            <Text style={styles.semaphoreNumber}>18</Text>
          </View>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/icons/VectorShare.png')}
              containerStyle={styles.VectorShare}
            />
          </View>
          <View style={styles.semaphoreContainer}>
            <Image
              source={require('../assets/icons/Marker.png')}
              containerStyle={styles.Marker}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#F5F5F5',
  },
  informationProfile: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "center",
    alignItems: 'center',
    marginVertical: 20,
  },
  ImageProfile: {
    width: 50,
    height: 50,
    margin: 10,
  },
  titleInformationProfile: {
    color: '#45A17C',
    fontSize: 22,
  },
  subTitleInformationProfile: {
    color: '#828282',
    fontSize: 16,
  },
  descriptionPublication: {
    // flex: 1,
    // alignItems: "center",
    margin: 20,
  },
  picturePublication: {
    // flex: 1,
    alignItems: 'center',
  },
  ImagePublication: {
    width: '100%',
    height: 300,
  },
  hashtagsContainter: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  hashtags: {
    color: '#45A17C',
    textAlign: 'left',
    marginVertical: 1,
    marginHorizontal: 5,
  },
  userLinked: {
    color: '#156746',
    marginVertical: 1,
  },
  descriptionText: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 1,
  },
  semaphoreColor: {
    width: 30,
    height: 30,
  },
  semaphoreNumber: {
    color: '#828282',
    marginStart: 5,
    fontSize: 16,
  },
  semaphoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  Marker: {
    width: 20,
    height: 23,
  },
  VectorShare: {
    width: 20,
    height: 22,
  },
});

export default Publication;
