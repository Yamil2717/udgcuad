import React from 'react';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import {StyleSheet, Text, View, Image} from 'react-native';

function Publication({dataPublication}) {
  console.log(dataPublication, 'dadtadtadtat');
  return (
    <>
      {dataPublication.map((result, index) => {
        return (
          <View style={styles.container}>
            <View style={styles.informationProfile}>
              <Image
                source={require('../assets/ImgProfile.png')}
                style={styles.ImageProfile}
              />
              <View>
                <Text style={styles.descriptionText}>
                  {result?.description}
                </Text>
                <Text style={styles.userLinked}>@{result.ownerName}</Text>
                <View style={styles.hashtagsContainter}>
                  <Text style={styles.hashtags}>#gobiernogdl</Text>
                  <Text style={styles.hashtags}>#bicicletas</Text>
                  <Text style={styles.hashtags}>#circulación</Text>
                </View>
              </View>

              <View style={styles.picturePublication}>
                <Image
                  source={require('../assets/PublicationImg.png')}
                  // source={{uri: result?.pictureGroup}}
                  style={styles.ImagePublication}
                />
              </View>
              
              <View style={styles.hashtagsContainter}>
                <View style={styles.semaphoreContainer}>
                  <IconFa name="circle" size={35} color="#30D34B" />
                  <Text style={styles.semaphoreNumber}>18</Text>
                </View>
                <View style={styles.semaphoreContainer}>
                  <IconFa name="circle" size={35} color="#FFBD12" />
                  <Text style={styles.semaphoreNumber}>8</Text>
                </View>
                <View style={styles.semaphoreContainer}>
                  <IconFa name="circle" size={35} color="#EB4237" />
                  <Text style={styles.semaphoreNumber}>2</Text>
                </View>
                <View style={styles.semaphoreContainer}>
                  <IconFe name="message-circle" size={35} color="#828282" />
                  <Text style={styles.semaphoreNumber}>18</Text>
                </View>
                <View style={styles.semaphoreContainer}>
                  <IconEn name="share" size={30} color="#828282" />
                </View>
                <View style={styles.semaphoreContainer}>
                  <IconFea name="bookmark" size={30} color="#2A9DD8" />
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
  },
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
    color: '#2A9DD8',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtags: {
    color: '#2A9DD8',
    textAlign: 'left',
    marginVertical: 1,
    marginHorizontal: 5,
  },
  userLinked: {
    color: '#156746',
    marginVertical: 1,
  },
  descriptionText: {
    color: '#2A9DD8',
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
    width: 28,
    height: 26,
  },
  VectorShare: {
    width: 20,
    height: 22,
  },
});

export default Publication;
