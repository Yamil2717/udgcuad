import React, {useContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import CreatePublicationStepOne from './PublicationStep/CreatePublicationStepOne';
import CreatePublicationStepTwo from './PublicationStep/CreatePublicationStepTwo';
import CreatePublicationStepThree from './PublicationStep/CreatePublicationStepThree';
import CreatePublicationStepFour from './PublicationStep/CreatePublicationStepFour';

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
      return (
        <CreatePublicationStepTwo step={step} onChangeStep={onChangeStep} />
      );
    case 2:
      return (
        <CreatePublicationStepThree step={step} onChangeStep={onChangeStep} />
      );
    case 3:
      return (
        <CreatePublicationStepFour step={step} onChangeStep={onChangeStep} />
      );
  }
}

export default CreatePublicationScreen;
