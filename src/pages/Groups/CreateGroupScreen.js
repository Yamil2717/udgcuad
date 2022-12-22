import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Loading from '../../components/Spinner';
import CreateGroupStepOne from './GroupStep/CreateGroupStepOne';
import CreateGroupStepTwo from './GroupStep/CreateGroupStepTwo';
import {Alert, Linking, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tools from '../../tools/tools';

function CreateGroupScreen({navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let [step, onChangeStep] = useState(0);
  let [photo, setPhoto] = useState();
  let [photos, setPhotos] = useState();
  let [name, setName] = useState();
  let [description, setDescription] = useState();

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
        <SafeAreaView>
          <CreateGroupStepOne
            step={step}
            onChangeStep={onChangeStep}
            photo={photo}
            setPhoto={setPhoto}
            name={name}
            setName={setName}
          />
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView>
          <CreateGroupStepTwo
            step={step}
            onChangeStep={onChangeStep}
            description={description}
            photos={photos}
            setPhotos={setPhotos}
            setDescription={setDescription}
          />
        </SafeAreaView>
      );
  }
}

export default CreateGroupScreen;
