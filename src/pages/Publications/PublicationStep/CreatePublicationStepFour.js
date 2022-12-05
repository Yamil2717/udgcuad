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
  Linking,
} from 'react-native';
import {AuthContext} from '../../../contexts/AuthContext';
import NavigationPublication from './NavigationPublication';
import DropDownPicker from 'react-native-dropdown-picker';

let {height} = Dimensions.get('window');

function CreatePublicationStepFour({
  step,
  onChangeStep,
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

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
  }

  function shareTwitter() {
    if (isEnabled && description !== '') {
      let twitterParameters = [];
      twitterParameters[0] = 'text=' + encodeURI(description);
      twitterParameters[1] = 'via=' + encodeURI('@Voces');
      const url =
        'https://twitter.com/intent/tweet?' + twitterParameters.join('&');
      Linking.openURL(url);
      /*.then(data => {
        alert('Twitter Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });*/
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
            <Text style={photos && {maxWidth: '80%'}}>{description}</Text>
            <Text>@{authContext.dataUser.name}</Text>
            {/*<Text>#gobiernogdl #bicicletas #circulación</Text>*/}
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
          <Text style={styles.textCreatePublication}>Publicar en Twitter</Text>
          <Switch
            trackColor={{false: '#767577', true: '#2A9DD8'}}
            thumbColor={isEnabled ? '#2A9DD8' : '#767577'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={styles.switch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[lock ? styles.buttonLock : styles.button]}
          onPress={() => {
            createPost();
            shareTwitter();
          }}>
          <Text style={styles.textButton}>
            {lock ? 'Enviando...' : 'Publicar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    minHeight: height,
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
    marginVertical: 5,
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
  },
  dropDownStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: 35,
    borderRadius: 24,
  },
});

export default CreatePublicationStepFour;
