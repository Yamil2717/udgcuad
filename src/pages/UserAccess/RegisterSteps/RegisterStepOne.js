import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Input, Button} from 'react-native';

function RegisterStepOne({
  setStep,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  postalCode,
  setPostalCode,
  styles,
}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
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
            onPress={() => setStep(1)}
          />
        </View>
        <Text style={styles.textTitle}>Crear cuenta</Text>
        <View style={styles.subContainerStep1}>
          <Text style={styles.textSubTitle}>Nombre completo</Text>
          <Input
            placeholder="Nombre"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#045A17',
              size: 20,
            }}
            value={name}
            style={styles.inputLogin}
            onChangeText={value => setName(value)}
          />

          <Text style={styles.textSubTitle}>Correo</Text>
          <Input
            placeholder="Correo"
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: '#045A17',
              size: 20,
            }}
            value={email}
            style={styles.inputLogin}
            onChangeText={value => setEmail(value)}
          />

          <Text style={styles.textSubTitle}>Teléfono</Text>
          <Input
            placeholder="Teléfono"
            leftIcon={{
              type: 'font-awesome',
              name: 'phone',
              color: '#045A17',
              size: 20,
            }}
            value={phone}
            style={styles.inputLogin}
            onChangeText={value => setPhone(value)}
          />

          <Text style={styles.textSubTitle}>C.P.</Text>
          <Input
            placeholder="Código postal"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#045A17',
              size: 20,
            }}
            value={postalCode}
            style={styles.inputLogin}
            onChangeText={value => setPostalCode(value)}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title="Ingresa con Google"
            icon={{
              // type: "flat-color",
              // name: "FcGoogle",
              // color: "white",
              // backgroundColor: "#DB4437",
              // background: uri(GoogleLogo),
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 100,
              size: 30,
            }}
            buttonStyle={{
              borderColor: '#156746',
              borderRadius: 30,
              borderWidth: 2,
              paddingVertical: 5,
            }}
            type="outline"
            raised
            containerStyle={{
              width: 300,
              borderRadius: 30,
              marginHorizontal: 10,
              marginBottom: 15,
            }}
            titleStyle={{
              color: '#156746',
              marginHorizontal: 5,
              fontSize: 16,
            }}
            onPress={() => alert('Google')}
          />

          <Button
            title="Ingresa con Facebook"
            icon={{
              type: 'font-awesome',
              name: 'facebook',
              color: 'white',
              backgroundColor: '#3b5998',
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 100,
              size: 30,
            }}
            buttonStyle={{
              borderColor: '#156746',
              borderRadius: 30,
              borderWidth: 2,
              paddingVertical: 5,
            }}
            containerStyle={{
              width: 300,
              borderRadius: 30,
              marginHorizontal: 10,
              marginTop: 15,
            }}
            titleStyle={{
              color: '#156746',
              marginHorizontal: 5,
              fontSize: 16,
            }}
            type="submit"
            onPress={() => alert('Facebook')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterStepOne;
