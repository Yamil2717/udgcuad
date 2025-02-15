import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Loading from '../../components/Spinner';
import CreatePublicationStepOne from './PublicationStep/CreatePublicationStepOne';
import CreatePublicationStepTwo from './PublicationStep/CreatePublicationStepTwo';
import CreatePublicationStepThree from './PublicationStep/CreatePublicationStepThree';
import CreatePublicationStepFour from './PublicationStep/CreatePublicationStepFour';
import {Alert, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tools from '../../tools/tools';

function CreatePublicationScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  let [step, onChangeStep] = useState(0);
  let [title, onChangeTitle] = useState(null);
  let [description, onChangeDescription] = useState(null);
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
    authContext.dataGroups.map(groupFormat => {
      tempGroups.push({
        label: groupFormat.name,
        value: groupFormat.id,
      });
    });
    setGroupsFormatted([...tempGroups]);
    await authAxios
      .get('/user/friends')
      .then(dataFriends => {
        let tempFriends = [];
        dataFriends.map(friend => {
          let {id, name, avatar} = friend;
          tempFriends.push({id, avatar, name});
        });
        authContext.setFriends([...tempFriends]);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Voces error', err?.response?.data?.message || err.message);
        console.error(err?.response?.data?.message || err.message);
      });
  }

  async function createPost() {
    if (!title) {
      return Alert.alert('Error', 'Debe ingresar el titulo de la publicación');
    }
    if (!group) {
      return Alert.alert(
        'Error',
        'Debe seleccionar el grupo en donde desea publicar el post.',
      );
    }
    if (description?.length <= 0 && !photos) {
      return Alert.alert(
        'Error',
        'Debe ingresar al menos la descripción o una fotografía para poder crear un post.',
      );
    }
    let groupSelect;
    groups.map(gp => {
      if (gp.id === group) {
        groupSelect = gp;
      }
    });
    let dataCreate = {
      title: title,
      description: description || '',
      groupID: groupSelect.id,
      categoryID: groupSelect.idInterest,
      ownerID: authContext.dataUser.id,
      pictures: [],
    };
    setLock(true);
    if (photos) {
      await authAxios
        .post(
          '/images/publications/upload',
          tools.formDataMultiplePhotos(photos),
          {
            headers: {'Content-Type': 'multipart/form-data'},
          },
        )
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
          Alert.alert('Voces', err?.response?.data?.message || err.message);
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
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onChangeStep(Number(step) - 1);
        return true;
      },
    );
    return () => backHandler.remove();
  }, [step, navigation]);

  if (loading) {
    return <Loading />;
  }

  switch (step) {
    case 0:
      return (
        <SafeAreaView>
          <CreatePublicationStepOne
            step={step}
            onChangeStep={onChangeStep}
            title={title}
            onChangeTitle={onChangeTitle}
          />
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView>
          <CreatePublicationStepTwo
            step={step}
            onChangeStep={onChangeStep}
            group={group}
            groups={groups}
            setGroup={setGroup}
          />
        </SafeAreaView>
      );
    case 2:
      return (
        <SafeAreaView>
          <CreatePublicationStepThree
            step={step}
            onChangeStep={onChangeStep}
            title={title}
            description={description}
            onChangeDescription={onChangeDescription}
            photos={photos}
            setPhotos={setPhotos}
            groupsFormatted={groupsFormatted}
            setGroupsFormatted={setGroupsFormatted}
            group={group}
            setGroup={setGroup}
          />
        </SafeAreaView>
      );
    case 3:
      return (
        <SafeAreaView>
          <CreatePublicationStepFour
            step={step}
            onChangeStep={onChangeStep}
            title={title}
            description={description}
            photos={photos}
            groupsFormatted={groupsFormatted}
            setGroupsFormatted={setGroupsFormatted}
            group={group}
            setGroup={setGroup}
            lock={lock}
            createPost={createPost}
          />
        </SafeAreaView>
      );
  }
}

export default CreatePublicationScreen;
