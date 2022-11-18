import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Button, ButtonGroup} from 'react-native';
import {Image} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';

/*function RegisterStepThree({
  setStep,
  photo,
  setPhoto,
  handleChoosePhoto,
  typesUser,
  categoriesInterest,
  styles,
}) {
  let [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
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
          onPress={() => setStep(1)}
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
          onPress={() => setStep(3)}
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.textTitle}>Crear cuenta</Text>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {photo ? (
            <Image
              source={{uri: photo.uri}}
              style={{width: 300, height: 300}}
              onPress={handleUploadPhoto}
            />
          ) : (
            <Image
              source={require('../../../assets/icons/ChooseImage.png')}
              style={{width: 100, height: 100}}
              onPress={handleChoosePhoto}
            />
          )}
        </View>

        <Text
          style={{
            ...styles.textSubTitle,
            marginHorizontal: Constants.statusBarHeight,
          }}>
          Tipo de usuario
        </Text>
        <DropDownPicker
          items={typesUser}
          open={open}
          setOpen={setOpen}
          listMode="SCROLLVIEW"
          containerStyle={{
            height: 40,
            marginHorizontal: Constants.statusBarHeight,
            width: 'auto',
          }}
          style={{backgroundColor: '#fafafa'}}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          labelStyle={{fontSize: 20}}
          itemStyle={{justifyContent: 'flex-start'}}
        />

        <View style={{alignItems: 'center'}}>
          <Text style={styles.textTitle2}>Selecciona tus intereses</Text>
          <ButtonGroup
            buttons={['Tema', '#']}
            /*onPress={(value) => {
              setSelectedIndex(value);
            }}
            textStyle={{
              color: '#45A17C',
            }}
            selectedButtonStyle={{
              backgroundColor: '#45A17C',
            }}
            containerStyle={{
              marginBottom: 20,
              width: 150,
              borderRadius: 20,
              borderColor: '#45A17C',
              borderWidth: 2,
            }}
          />
        </View>

        <SafeAreaView style={styles.containerTheme}>
          <FlatList
            data={categoriesInterest}
            containerStyle={styles.flatListCustom}
            scrollEnabled={false}
            indicatorStyle="black"
            renderItem={({item}) => (
              <View>
                <Image
                  source={item.img}
                  style={styles.itemImage}
                  PlaceholderContent={<ActivityIndicator />}
                  onPress={() => addArrayInterest(item.id)}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}*/

function RegisterStepThree() {
  return <>a</>;
}

export default RegisterStepThree;
