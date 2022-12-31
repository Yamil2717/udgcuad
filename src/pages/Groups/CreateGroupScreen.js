import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import CreateGroupStepOne from './GroupStep/CreateGroupStepOne';
import CreateGroupStepTwo from './GroupStep/CreateGroupStepTwo';
import CreateGroupStepThree from './GroupStep/CreateGroupStepThree';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tools from '../../tools/tools';
import env from '../../env';

function CreateGroupScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [step, onChangeStep] = useState(0);
  let [photoGroup, setPhotoGroup] = useState(null);
  let [name, setName] = useState(null);
  let [selectCategories, onChangeSelectCategories] = useState(null);
  let [description, setDescription] = useState(null);
  let [dataGroupFirst, setDataGroupFirst] = useState(null);
  let [titleFirst, setTitleFirst] = useState(null);
  let [descriptionFirst, setDescriptionFirst] = useState(null);
  let [photosFirst, setPhotosFirst] = useState(null);
  let [lock, setLock] = useState(false);

  useEffect(() => {
    if (step === -1) {
      navigation.navigate('Home');
    }
  }, [step, navigation]);

  async function createGroup() {
    if (!name || !photoGroup || !description || !selectCategories) {
      return Alert.alert(
        'Voces',
        'Debe rellenar todos los campos y elegir una imagen para está nueva comunidad.',
      );
    }
    if (name.length > 100) {
      return Alert.alert(
        'Voces',
        'El nombre del grupo no puede superar los 100 caracteres.',
      );
    }
    if (description.length > 280) {
      return Alert.alert(
        'Voces',
        'La descripción de grupo no puede superar los 280 caracteres.',
      );
    }
    if (lock) {
      return;
    }
    setLock(true);
    await authAxios
      .post(
        `${env.api}/images/groups/upload`,
        tools.formDataSinglePhoto(photoGroup),
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      )
      .then(async url => {
        await authAxios
          .post('/group', {
            name,
            description,
            picture: url,
            ownerID: authContext.dataUser.id,
            idCategory: selectCategories,
          })
          .then(async group => {
            setDataGroupFirst(group);
            await authAxios
              .put(`/user/addGroup/${group.id}`)
              .then(async success => {
                if (success) {
                  let tempAuthContext = {...authContext.dataUser};
                  tempAuthContext.groups[group.id] = new Date().toISOString();
                  authContext.setDataUser({...tempAuthContext});
                  await authAxios
                    .get('/myGroups')
                    .then(myGroups => {
                      authContext.setDataGroups([...myGroups]);
                      Alert.alert(
                        'Voces',
                        'Se ha creado su grupo correctamente.',
                      );
                      onChangeStep(1);
                      setLock(false);
                    })
                    .catch(err => {
                      setLock(false);
                      console.error(
                        err?.response?.data?.message || err.message,
                      );
                      Alert.alert(
                        'Voces',
                        err?.response?.data?.message || err.message,
                      );
                    });
                }
              })
              .catch(err => {
                setLock(false);
                console.error(err?.response?.data?.message || err.message);
                Alert.alert(
                  'Voces',
                  err?.response?.data?.message || err.message,
                );
              });
          })
          .catch(err => {
            setLock(false);
            console.error(err?.response?.data?.message || err.message);
            Alert.alert('Voces', err?.response?.data?.message || err.message);
          });
      })
      .catch(err => {
        setLock(false);
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }

  async function createPost() {
    if (!titleFirst) {
      return Alert.alert('Error', 'Debe ingresar el titulo de la publicación');
    }
    if (descriptionFirst?.length <= 0 && !photosFirst) {
      return Alert.alert(
        'Error',
        'Debe ingresar al menos la descripción o una fotografía para poder crear un post.',
      );
    }
    let dataCreate = {
      title: titleFirst,
      description: descriptionFirst || '',
      groupID: dataGroupFirst.id,
      categoryID: dataGroupFirst.idInterest,
      ownerID: authContext.dataUser.id,
      pictures: [],
    };
    setLock(true);
    if (photosFirst) {
      await authAxios
        .post(
          '/images/publications/upload',
          tools.formDataMultiplePhotos(photosFirst),
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
              navigation.navigate('Group', {id: dataGroupFirst.id});
            })
            .catch(err => {
              setLock(false);
              console.error(err?.response?.data?.message || err.message);
            });
        })
        .catch(err => {
          setLock(false);
          Alert.alert('Voces', err?.response?.data?.message || err.message);
          //console.error(err?.response?.data?.message || err.message);
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
          navigation.navigate('Group', {id: dataGroupFirst.id});
        })
        .catch(err => {
          setLock(false);
          console.error(err?.response?.data?.message || err.message);
        });
    }
  }

  switch (step) {
    case 0:
      return (
        <SafeAreaView>
          <CreateGroupStepOne
            step={step}
            onChangeStep={onChangeStep}
            photoGroup={photoGroup}
            setPhotoGroup={setPhotoGroup}
            name={name}
            setName={setName}
            selectCategories={selectCategories}
            onChangeSelectCategories={onChangeSelectCategories}
            description={description}
            setDescription={setDescription}
            createGroup={createGroup}
          />
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView>
          <CreateGroupStepTwo
            step={step}
            onChangeStep={onChangeStep}
            title={titleFirst}
            setTitle={setTitleFirst}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    case 2:
      return (
        <SafeAreaView>
          <CreateGroupStepThree
            step={step}
            onChangeStep={onChangeStep}
            dataGroup={dataGroupFirst}
            title={titleFirst}
            description={descriptionFirst}
            setDescription={setDescriptionFirst}
            photos={photosFirst}
            setPhotos={setPhotosFirst}
            createPost={createPost}
          />
        </SafeAreaView>
      );
  }
}

export default CreateGroupScreen;
