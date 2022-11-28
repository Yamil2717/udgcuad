import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Loading from '../../components/Spinner';
import CreatePublicationStepOne from './PublicationStep/CreatePublicationStepOne';
import CreatePublicationStepTwo from './PublicationStep/CreatePublicationStepTwo';
import CreatePublicationStepThree from './PublicationStep/CreatePublicationStepThree';
import CreatePublicationStepFour from './PublicationStep/CreatePublicationStepFour';
import {Alert, Platform} from 'react-native';

function createFormData(photo) {
  const data = new FormData();

  data.append('picture', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  /*Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });*/

  return data;
}

function CreatePublicationScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  let [step, onChangeStep] = useState(0);
  let [description, onChangeDescription] = useState(null);
  let [photos, setPhotos] = useState(null);
  let [groups, setGroups] = useState([]);
  let [groupsFormatted, setGroupsFormatted] = useState([]);
  let [group, setGroup] = useState(null);
  let [urlsImages, setUrlsImages] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    await authAxios
      .get('/groups')
      .then(({data}) => {
        setGroups(data.data);
        let tempGroups = [];
        data.data.map((groupFormat, index) => {
          tempGroups.push({
            label: groupFormat.name,
            value: index.toString(),
          });
        });
        setGroupsFormatted([...tempGroups]);
        setLoading(false);
      })
      .catch(err => console.error(JSON.stringify(err)));
  }

  async function createPost() {
    let dataCreate = {
      description,
      pictureGroup: groups[group].picture.toString(),
      groupID: groups[group].id,
      groupName: groups[group].name,
      categoryID: groups[group].idCategory,
      ownerID: authContext.dataUser.id,
      ownerName: authContext.dataUser.name,
    };
    if (!description || !photos) {
      return Alert.alert(
        'Error',
        'Debe ingresar al menos la descripción o una fotografía para poder crear un post.',
      );
    }
    if (photos) {
      let pictures = [];
      await authAxios
        .post('/images/publication/upload', createFormData(photos[0]), {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(({data}) => pictures.push(data.data))
        .catch(err => console.error(JSON.stringify(err)));
      if (photos[1]) {
        await authAxios
          .post('/images/publication/upload', createFormData(photos[1]), {
            headers: {'Content-Type': 'multipart/form-data'},
          })
          .then(({data}) => pictures.push(data.data))
          .catch(err => console.error(JSON.stringify(err)));
      }
      if (photos[2]) {
        await authAxios
          .post('/images/publication/upload', createFormData(photos[2]), {
            headers: {'Content-Type': 'multipart/form-data'},
          })
          .then(({data}) => pictures.push(data.data))
          .catch(err => console.error(JSON.stringify(err)));
      }
      if (photos[3]) {
        await authAxios
          .post('/images/publication/upload', createFormData(photos[3]), {
            headers: {'Content-Type': 'multipart/form-data'},
          })
          .then(({data}) => pictures.push(data.data))
          .catch(err => console.error(JSON.stringify(err)));
      }
      dataCreate.pictures = pictures;
      await authAxios
        .post('/publication', {...dataCreate})
        .then(({data}) => {
          let {message} = data.data;
          Alert.alert('Voces', message);
          navigation.navigate('Home');
        })
        .catch(err => console.error(JSON.stringify(err)));
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
          createPost={createPost}
        />
      );
  }
}

export default CreatePublicationScreen;
