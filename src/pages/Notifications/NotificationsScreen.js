import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import Publication from '../components/Publication';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Notifications from '../components/Notifications';
import NavigationScreens from '../components/NavigationScreens';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {SafeAreaView} from 'react-native-safe-area-context';


function NotificationsScreen({navigation}) {
    return loading ? (
        <Spinner />
      ) : (
 <SafeAreaView>
<View>
    <Text>Hoy</Text>
    <View>
        
    </View>
</View>
 </SafeAreaView>
 )
}
export default NotificationsScreen;