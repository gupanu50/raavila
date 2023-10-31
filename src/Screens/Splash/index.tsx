import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from '@/Constant';
import {Images} from '@/Assets';
import {useLoginMutation} from '@/Redux/services/auth/authService';
import {useDispatch} from 'react-redux';
import {setCredentials} from '@/Redux/services/auth/authSlice';
import {purgeStore} from '@/Redux/store/store';
import {useAuth} from '@/Redux/hooks/auth';

const {MAIN, LOGIN, REGISTER} = Constant.SCREENS;

const Splash = (props: any) => {
  const {navigation, isPersisted} = props;
  const currentUser = useAuth();
  console.log('Splash', props);

  // ************************ fetch data from asyncStorage **************************
  const getUserData = async () => {
    try {
      let data: any = await AsyncStorage.getItem('user');
      //const userData = JSON.parse(data);
      const userData = currentUser.user;
      if (userData) {
        // if async storage has data app move to dashboard
        if (userData?.complete_profile !== 1) {
          navigation.navigate(REGISTER);
        } else {
          navigation.navigate(MAIN);
        }
      } else {
        // otherwise app go to login screen
        navigation.navigate(LOGIN);
      }
    } catch (error) {
      // in any error case also, app move to login screen
      navigation.navigate(LOGIN);
    }
  };

  setTimeout(() => {
    if(!isPersisted){
      getUserData();
    }
    
  }, 2400);

  return (
    <View style={styles.container}>
      <Image source={Images.splashgif} style={styles.img} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
