import React, {useContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import CreatePublicationStepOne from './PublicationStep/CreatePublicationStepOne';

function CreatePublicationScreen() {
  let [step, onChangeStep] = useState(0);

  useEffect(() => {
    // get data grupos
  }, []);

  switch (step) {
    case 0:
      return (
        <CreatePublicationStepOne step={step} onChangeStep={onChangeStep} />
      );
    case 1:
      return <Text>step2</Text>;
  }
}

export default CreatePublicationScreen;
