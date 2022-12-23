import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import NavigationPublication from './NavigationPublication';

const {width, height} = Dimensions.get('window');

function CreatePublicationStepOne({step, onChangeStep, title, onChangeTitle}) {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Título de tu publicación..."
          textAlignVertical="top"
          multiline={true}
          numberOfLines={4}
          value={title}
          onChangeText={onChangeTitle}
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
  containerSec: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    height: '30%',
    justifyContent: 'center',
  },
  navigate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconNav: {
    width: 20,
    height: 20,
    margin: 10,
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
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  containerImages: {
    maxWidth: width,
    width: width,
    minHeight: 180,
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
    marginVertical: 5,
    marginHorizontal: 10,
  },
  iconCreatePublication: {
    marginHorizontal: 15,
  },
  textCreatePublication: {
    fontSize: 16,
  },
});

export default CreatePublicationStepOne;
