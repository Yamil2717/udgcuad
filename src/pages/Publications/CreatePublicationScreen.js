import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Loading from '../../components/Spinner';
import CreatePublicationStepOne from './PublicationStep/CreatePublicationStepOne';
import CreatePublicationStepTwo from './PublicationStep/CreatePublicationStepTwo';
import CreatePublicationStepThree from './PublicationStep/CreatePublicationStepThree';
import CreatePublicationStepFour from './PublicationStep/CreatePublicationStepFour';
import {Alert, Platform} from 'react-native';

function createFormData(photos) {
  const data = new FormData();

  photos.map(photo => {
    data.append('pictures', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  });

  return data;
}

function CreatePublicationScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  let [step, onChangeStep] = useState(0);
  let [description, onChangeDescription] = useState('');
  let [photos, setPhotos] = useState(null);
  let [groups, setGroups] = useState([]);
  let [groupsFormatted, setGroupsFormatted] = useState([]);
  let [group, setGroup] = useState(null);
  let [lock, setLock] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    setGroups(authContext.dataGroups);
    let tempGroups = [];
    authContext.dataGroups.map((groupFormat, index) => {
      tempGroups.push({
        label: groupFormat.name,
        value: index.toString(),
      });
    });
    setGroupsFormatted([...tempGroups]);
    setLoading(false);
  }

  async function createPost() {
    if (!group) {
      return Alert.alert(
        'Error',
        'Debe seleccionar el grupo en donde desea publicar el post.',
      );
    }
    if (description.length <= 0 && !photos) {
      return Alert.alert(
        'Error',
        'Debe ingresar al menos la descripción o una fotografía para poder crear un post.',
      );
    }
    let dataCreate = {
      description: description || '',
      pictureGroup: groups[group].picture.toString(),
      groupID: groups[group].id,
      groupName: groups[group].name,
      categoryID: groups[group].idCategory,
      ownerID: authContext.dataUser.id,
      ownerName: authContext.dataUser.name,
      pictures: [],
    };
    setLock(true);
    if (photos) {
      await authAxios
        .post('/images/publication/upload', createFormData(photos), {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(async imagesURL => {
          dataCreate.pictures = imagesURL;
          await authAxios
            .post('/publication', {...dataCreate})
            .then(data => {
              Alert.alert('Voces', data.message);
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            })
            .catch(err => {
              setLock(false);
              console.error(err?.response?.data?.message || err.message);
            });
        })
        .catch(err => {
          setLock(false);
          console.error(err?.response?.data?.message || err.message);
        });
    } else {
      await authAxios
        .post('/publication', {...dataCreate})
        .then(data => {
          Alert.alert('Voces', data.message);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        })
        .catch(err => {
          setLock(false);
          console.error(err?.response?.data?.message || err.message);
        });
    }
  }

  useEffect(() => {
    if (step === -1) {
      navigation.navigate('Home');
    }
  }, [step, navigation]);

  if (loading) {
    return <Loading />;
  }

  switch (step) {
    case 0:
      return (
        <CreatePublicationStepOne
          step={step}
          onChangeStep={onChangeStep}
          description={description}
          onChangeDescription={onChangeDescription}
          photos={photos}
          setPhotos={setPhotos}
        />
      );
    case 1:
      return (
        <CreatePublicationStepTwo
          step={step}
          onChangeStep={onChangeStep}
          groups={groups}
          setGroup={setGroup}
        />
      );
    case 2:
      return (
        <CreatePublicationStepThree
          step={step}
          onChangeStep={onChangeStep}
          description={description}
          onChangeDescription={onChangeDescription}
          photos={photos}
          setPhotos={setPhotos}
          groupsFormatted={groupsFormatted}
          setGroupsFormatted={setGroupsFormatted}
          group={group}
          setGroup={setGroup}
        />
      );
    case 3:
      return (
        <CreatePublicationStepFour
          step={step}
          onChangeStep={onChangeStep}
          description={description}
          photos={photos}
          groupsFormatted={groupsFormatted}
          setGroupsFormatted={setGroupsFormatted}
          group={group}
          setGroup={setGroup}
          lock={lock}
          createPost={createPost}
        />
      );
  }
}

export default CreatePublicationScreen;
