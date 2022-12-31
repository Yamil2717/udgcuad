import React from 'react';
import {
  Modal as ModalRN,
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

function Modal({
  description,
  icon,
  textButton1,
  handleButton1,
  textButton2,
  handleButton2,
  modalVisible,
  setModalVisible,
  photoUrl,
}) {
  return (
    <ModalRN
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        {photoUrl ? (
          <View>
            <FastImage
              source={{
                uri: photoUrl,
                priority: FastImage.priority.high,
              }}
              style={styles.imageModal}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={[styles.containerButtons, styles.containerImage]}>
              <Pressable
                style={styles.button1}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textButton1}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.modalText}>{description}</Text>
              {icon && (
                <IconIonicons
                  name="md-logo-whatsapp"
                  color="#20B038"
                  size={60}
                  style={styles.icon}
                />
              )}
            </View>
            <View style={styles.containerButtons}>
              {textButton2 && (
                <Pressable
                  style={styles.button2}
                  onPress={() => {
                    handleButton2 && handleButton2();
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textButton2}>{textButton2}</Text>
                </Pressable>
              )}
              <Pressable
                style={styles.button1}
                onPress={() => {
                  handleButton1 && handleButton1();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textButton1}>{textButton1}</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <IconIonicons
                name="ios-close-circle-outline"
                color="#699DB8"
                size={20}
                style={styles.headerIcon}
              />
              <Text style={styles.textButtonClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  container: {
    minWidth: '80%',
    maxWidth: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 55,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  imageModal: {
    width: width,
    height: height / 2,
  },
  subContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'left',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  containerButtons: {
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button1: {
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 25,
    elevation: 2,
    color: 'white',
    backgroundColor: '#2196F3',
    borderWidth: 1,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 25,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textButton1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  textButton2: {
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonClose: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 20,
    alignItems: 'center',
  },
  textButtonClose: {
    color: '#699DB8',
    fontSize: 16,
    marginLeft: 2.5,
  },
});

export default Modal;
