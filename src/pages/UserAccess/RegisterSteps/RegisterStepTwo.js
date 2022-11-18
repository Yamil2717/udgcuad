import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Input, Button} from 'react-native';

function RegisterStepTwo({
  setStep,
  password,
  setPassword,
  rePassword,
  setRePassword,
  styles,
}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buttonsNextPrev}>
          <Button
            title="Volver"
            icon={{
              name: 'arrow-left',
              type: 'font-awesome',
              size: 15,
              color: '#45A17C',
            }}
            iconContainerStyle={{
              borderColor: '#45A17C',
              borderRadius: 30,
              borderWidth: 2,
              padding: 5,
            }}
            type="clear"
            raised
            containerStyle={{
              width: 150,
              borderRadius: 30,
            }}
            titleStyle={{
              color: '#45A17C',
              marginHorizontal: 5,
              fontSize: 20,
            }}
            onPress={() => setStep(0)}
          />
          <Button
            title="Continuar"
            icon={{
              name: 'arrow-right',
              type: 'font-awesome',
              size: 15,
              color: '#45A17C',
            }}
            iconRight
            iconContainerStyle={{
              borderColor: '#45A17C',
              borderRadius: 30,
              borderWidth: 2,
              padding: 5,
            }}
            type="clear"
            raised
            containerStyle={{
              width: 150,
              borderRadius: 30,
            }}
            titleStyle={{
              color: '#45A17C',
              marginHorizontal: 5,
              fontSize: 20,
            }}
            onPress={() => setStep(2)}
          />
        </View>

        <Text style={styles.textTitle}>Crear cuenta</Text>
        <View style={styles.subContainerStep2}>
          <Text style={styles.textSubTitle}>Contraseña</Text>
          <Input
            placeholder="Contraseña"
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#045A17',
              size: 20,
            }}
            value={password}
            secureTextEntry={true}
            style={styles.inputLogin}
            onChangeText={value => setPassword(value)}
          />
          <Text style={styles.textSubTitle}>Repetir Contraseña</Text>
          <Input
            placeholder="Repetir Contraseña"
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#045A17',
              size: 20,
            }}
            value={rePassword}
            secureTextEntry={true}
            style={styles.inputLogin}
            onChangeText={value => setRePassword(value)}
          />
          {/* <View>
              <Button title="Show Date Picker" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterStepTwo;
