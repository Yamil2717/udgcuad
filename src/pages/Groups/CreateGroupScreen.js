import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import CreateGroupStepOne from './GroupStep/CreateGroupStepOne';
import CreateGroupStepTwo from './GroupStep/CreateGroupStepTwo';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tools from '../../tools/tools';
import env from '../../env';

function CreateGroupScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [step, onChangeStep] = useState(0);
  let [photoGroup, setPhotoGroup] = useState(null);
  let [photosFirstPublication, setPhotosFirstPublication] = useState(null);
  let [name, setName] = useState(null);
  let [description, setDescription] = useState(null);

  useEffect(() => {
    if (step === -1) {
      navigation.navigate('Home');
    }
  }, [step, navigation]);

  async function createGroup() {
    try {
      if (!name || !photoGroup || !description) {
        return Alert.alert(
          'Voces',
          'Debe rellenar todos los campos y elegir una imagen para está nueva comunidad.',
        );
      }
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
            })
            .then(async group => {
              await authAxios
                .put(`/user/addGroup/${group.id}`)
                .then(async success => {
                  if (success) {
                    let tempAuthContext = {...authContext.dataUser};
                    tempAuthContext.groups[group.id] = new Date().toISOString();
                    authContext.setDataUser({...tempAuthContext});
                    await authAxios
                      .get('/myGroups')
                      .then(myGroups =>
                        authContext.setDataGroups([...myGroups]),
                      );
                    Alert.alert(
                      'Voces',
                      'Se ha creado su grupo correctamente.',
                    );
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    });
                  }
                });
            });
        });
    } catch (error) {
      console.log(error);
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
            description={description}
            setDescription={setDescription}
            createGroup={createGroup}
          />
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView>
          <CreateGroupStepTwo step={step} onChangeStep={onChangeStep} />
        </SafeAreaView>
      );
  }
}

export default CreateGroupScreen;
