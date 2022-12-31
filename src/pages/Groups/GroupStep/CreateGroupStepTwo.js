import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import NavigationGroups from './NavigationGroups';

const {height} = Dimensions.get('window');

function CreateGroupStepTwo({step, onChangeStep, title, setTitle, navigation}) {
  function validateStep() {
    let failed = false;
    if (!title) {
      failed = true;
      Alert.alert(
        'Voces',
        'Debes ingresar un titulo para la primera publicación',
      );
    }
    if (title.length > 100) {
      failed = true;
      Alert.alert('Voces', 'El titulo no puede superar los 100 caracteres');
    }
    return failed;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationGroups
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        navigation={navigation}
        validateStep={validateStep}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Título de tu publicación"
          textAlignVertical="top"
          multiline={true}
          numberOfLines={4}
          value={title}
          onChangeText={setTitle}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
    maxHeight: height,
  },
  containerInput: {
    height: '40%',
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#164578',
    height: '100%',
    fontSize: 20,
    textAlignVertical: 'top',
  },
});

export default CreateGroupStepTwo;
