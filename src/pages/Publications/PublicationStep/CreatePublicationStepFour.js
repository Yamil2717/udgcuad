import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../../contexts/AuthContext';
import NavigationPublication from './NavigationPublication';
import DropDownPicker from 'react-native-dropdown-picker';
import Share from 'react-native-share';
import {
  MentionInput,
  replaceMentionValues,
} from 'react-native-controlled-mentions';

const {height} = Dimensions.get('window');

function CreatePublicationStepFour({
  step,
  onChangeStep,
  title,
  description,
  photos,
  groupsFormatted,
  setGroupsFormatted,
  group,
  setGroup,
  lock,
  createPost,
}) {
  let authContext = useContext(AuthContext);
  let [open, setOpen] = useState(false);
  let [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  async function shareTwitter() {
    if (isEnabled) {
      if (photos || description) {
        let base64ImagesInclude = [];
        if (photos) {
          photos.map(photo => {
            base64ImagesInclude.push(
              `data:image/${photo.type.split('/')[1]};base64,${photo.base64}`,
            );
          });
        }
        const shareOptions = {
          title: 'Compartir vía Voces',
          message: `${title}\n${
            description
              ? replaceMentionValues(description, ({name}) => `@${name}`)
              : ''
          }`,
          social: Share.Social.TWITTER,
          urls: photos ? base64ImagesInclude : null,
        };
        try {
          Share.isPackageInstalled('com.twitter.android').then(
            async response => {
              if (response.isInstalled) {
                await Share.shareSingle(shareOptions);
              } else {
                Alert.alert(
                  'Voces',
                  'No pudimos detectar que tengas Twitter instalado en este dispositivo.',
                );
              }
            },
          );
        } catch (error) {
          console.error(error);
          Alert.alert(
            'Voces',
            'algo fallo y no pudimos compartir tu publicación con twitter.',
          );
        }
      }
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      pointerEvents={lock ? 'none' : 'auto'}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <ScrollView style={styles.containerScrollView}>
        <View style={styles.navigate}>
          <View style={styles.containerDropDownPickerMain}>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={groupsFormatted}
              setItems={setGroupsFormatted}
              value={group}
              setValue={setGroup}
              defaultValue={group}
              listMode="SCROLLVIEW"
              placeholder="Seleccionar"
              style={styles.dropDownStyle}
              containerStyle={styles.containerDropDownPicker}
              dropDownStyle={styles.dropDownPickerBackground}
              labelStyle={styles.dropDownPickerLabel}
              itemStyle={styles.dropDownPickerItem}
            />
          </View>

          <View style={styles.containerPublicationSub}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <MentionInput
                value={replaceMentionValues(
                  description,
                  ({name}) => `@${name}`,
                )}
                style={[
                  styles.description,
                  photos && styles.postHaveImageAndDescription,
                ]}
                numberOfLines={description.length > 150 ? 3 : null}
                editable={false}
                partTypes={[
                  {
                    //trigger: '@',
                    pattern: /[@][a-z]+[\s][a-z]+/gi,
                    allowedSpacesCount: 1,
                    textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
                  },
                  {
                    pattern: /[#][a-z0-9_]+/gi,
                    allowedSpacesCount: 0,
                    textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
                  },
                ]}
              />
              <Text style={styles.nameAuthor}>
                @{authContext.dataUser.name}
              </Text>
            </View>
            {photos && photos.length > 0 && (
              <Image
                source={{uri: photos[0].uri}}
                style={styles.ImagePublication}
              />
            )}
          </View>
        </View>

        <View style={styles.listStyle}>
          <Image
            source={require('../../../assets/twitter.png')}
            style={styles.ImageProfile}
          />
          <View>
            <Text style={styles.textCreatePublication}>
              Publicar en Twitter
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#2A9DD8'}}
              thumbColor={isEnabled ? '#2A9DD8' : '#767577'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[lock ? styles.buttonLock : styles.button]}
            onPress={() => {
              if (description.length > 5000) {
                return Alert.alert(
                  'Voces',
                  'Lo sentimos, no permitimos publicaciones con más de 5000 caracteres.',
                );
              }
              createPost();
              isEnabled && shareTwitter();
            }}>
            <Text style={styles.textButton}>
              {lock ? 'Enviando...' : 'Publicar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerScrollView: {
    height: height - 47.5,
  },
  navigate: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconNav: {
    width: 20,
    height: 20,
    margin: 10,
  },
  containerInputTitle: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#164578',
    height: 400,
    fontSize: 20,
  },
  ImageProfile: {
    width: 50,
    height: 50,
    margin: 10,
  },
  containerPublications: {
    marginBottom: 100,
  },
  colorInput: {
    color: '#000000',
  },
  listAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
  },
  description: {
    height: 'auto',
    border: 'none',
    margin: 0,
    padding: 0,
  },
  postHaveImageAndDescription: {
    maxWidth: '80%',
  },
  nameAuthor: {
    fontWeight: '700',
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  iconCreatePublication: {
    marginHorizontal: 15,
  },
  textCreatePublication: {
    fontSize: 24,
    width: '100%',
  },
  subTextCreatePublication: {
    fontSize: 12,
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
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
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  containerButton: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 50,
  },
  buttonLock: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#767577',
    backgroundColor: '#767577',
    borderWidth: 2,
    borderRadius: 24,
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#2A9DD8',
    backgroundColor: '#2A9DD8',
    borderWidth: 2,
    borderRadius: 24,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
  },
  containerDropDownPickerMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  containerDropDownPicker: {
    width: '80%',
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
  switch: {
    width: 40,
  },
  containerPublicationSub: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  ImagePublication: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: 35,
    borderRadius: 24,
  },
});

export default CreatePublicationStepFour;
