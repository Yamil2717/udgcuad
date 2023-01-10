import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import NavigationPublication from './NavigationPublication';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const {height} = Dimensions.get('window');

function CreatePublicationStepTwo({
  step,
  onChangeStep,
  group,
  groups,
  setGroup,
}) {
  let [currentPage, setCurrentPage] = useState(6);
  let [searchGroups, onChangeSearchGroups] = useState(null);
  let [filtersSearchGroups, setFiltersSearchGroups] = useState([]);

  function validateStep() {
    let failed = false;
    if (!group) {
      failed = true;
      return Alert.alert(
        'Datos faltantes',
        'Debe seleccionar un grupo para continuar',
      );
    }
    return failed;
  }

  function filterGroups(text) {
    let dataFilter = [];
    groups
      .filter(groupF => groupF.name.toLowerCase().includes(text.toLowerCase()))
      .map(groupF => dataFilter.push(groupF));
    onChangeSearchGroups(text);
    setFiltersSearchGroups(dataFilter);
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        validateStep={validateStep}
      />
      <View style={styles.containerFlastList}>
        <FlatList
          data={filtersSearchGroups.length > 0 ? filtersSearchGroups : groups}
          ListHeaderComponent={
            <View>
              <View style={styles.navigate}>
                <View style={styles.formsStyle}>
                  <TextInput
                    placeholder="Búsqueda de grupo"
                    style={styles.input}
                    value={searchGroups}
                    onChangeText={text => filterGroups(text)}
                  />
                  <IconFontisto
                    name="search"
                    color="#2A9DD8"
                    size={16}
                    style={styles.iconForm}
                  />
                </View>
              </View>
              <Text style={styles.textTooltip}>
                Por favor selecciona una de tus comunidades
              </Text>
            </View>
          }
          renderItem={({item, index}) => {
            if (index + 1 <= Number(currentPage)) {
              return (
                <TouchableOpacity
                  style={styles.listStyle}
                  key={item.id}
                  onPress={() => {
                    setGroup(item.id.toString());
                    onChangeStep(Number(step) + 1);
                  }}>
                  <Image source={{uri: item.picture}} style={styles.image} />
                  <View>
                    <Text style={styles.textCreatePublication}>
                      {item.name}
                    </Text>
                    <Text style={styles.subTextCreatePublication}>
                      {item.membersCount} Miembros
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          ListFooterComponent={
            groups.length > 6 && (
              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setCurrentPage(Number(currentPage + 3))}>
                  <Text style={styles.textButton}>Ver mas</Text>
                </TouchableOpacity>
              </View>
            )
          }
          style={styles.flatList}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
  },
  containerFlatList: {
    maxHeight: height - 124.5,
  },
  flatList: {
    maxHeight: '100%',
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
  containerInputTitle: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#164578',
    height: 400,
    fontSize: 20,
  },
  image: {
    width: 45,
    height: 45,
    margin: 10,
    borderRadius: 45 / 2,
  },
  containerPublications: {
    marginBottom: 100,
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
  textTooltip: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  iconCreatePublication: {
    marginHorizontal: 15,
  },
  textCreatePublication: {
    fontSize: 24,
  },
  subTextCreatePublication: {
    fontSize: 12,
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  containerButton: {
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#2A9DD8',
    borderWidth: 2,
    borderRadius: 24,
  },
  textButton: {
    fontSize: 16,
    color: '#2A9DD8',
  },
});

export default CreatePublicationStepTwo;
