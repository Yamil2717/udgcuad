import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IconsEntypo from 'react-native-vector-icons/Entypo';

function NavigationGroups({
  valueScreen,
  previousScreenOnPress,
  afterScreenOnPress,
  incrementOnPress,
  validateStep,
  navigation,
  createPost,
}) {
  return (
    <View
      style={[
        styles.container,
        previousScreenOnPress && afterScreenOnPress
          ? styles.justifyContentBetween
          : previousScreenOnPress
          ? styles.justifyContentStart
          : styles.justifyContentEnd,
      ]}>
      {previousScreenOnPress && (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            if (valueScreen === 1) {
              return navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }
            previousScreenOnPress(valueScreen - incrementOnPress);
          }}>
          <IconsEntypo
            size={18}
            name="arrow-with-circle-left"
            color="#2A9DD8"
            style={styles.icon}
          />
          <Text style={styles.buttonsText}>
            {valueScreen === 0
              ? 'Cancelar'
              : valueScreen === 1
              ? 'No publicar'
              : 'Volver'}
          </Text>
        </TouchableOpacity>
      )}
      {afterScreenOnPress && (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            if (validateStep) {
              let validateFailed = validateStep();
              if (validateFailed === undefined || validateFailed === true) {
                return;
              }
            }
            if (valueScreen === 2) {
              return createPost();
            }
            afterScreenOnPress(valueScreen + incrementOnPress);
          }}>
          <Text style={styles.buttonsText}>Continuar</Text>
          <IconsEntypo
            size={18}
            name="arrow-with-circle-right"
            color="#2A9DD8"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 47.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  buttonsText: {
    fontSize: 18,
    color: '#2A9DD8',
    alignSelf: 'center',
  },
  justifyContentStart: {
    justifyContent: 'flex-start',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
});

export default NavigationGroups;
