import 'react-native-gesture-handler';
import {StyleSheet, View, Platform, StatusBar, Alert} from 'react-native';
import Navigator from '@/Navigator';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from '@/Redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import React, {useEffect, useState} from 'react';
import JailMonkey from 'jail-monkey';
import Splash from './Screens/Splash';
import OfflineModal from './ReusableComponent/Offline';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const requestUserPermission = async () => {
    await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages()
    messaging()
      .getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          console.log("FCM Token ===>", fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken)
        } else {
          console.log('[FCMService] user does not have a device token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected ', error);
      });

  }
  useEffect(()=> {
    requestUserPermission();
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

  },[])
  React.useEffect(() => {
    SplashScreen.hide();

    // if (JailMonkey.isJailBroken()) {
    //   Alert.alert(
    //     'Error',
    //     'Your phone is customized. You are not eligible to access the app.',
    //     // eslint-disable-next-line no-sparse-arrays
    //     [
    //       {
    //         text: 'Exit App',
    //         onPress: () => {
    //           BackHandler.exitApp();
    //         },
    //       },
    //       ,
    //     ],
    //     {
    //       cancelable: false,
    //     },
    //   );
    // }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsOnline(state.isConnected);
      setShowModal(!state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [isOnline]);

  const handleRetry = () => {
    setShowModal(false);
    setIsOnline(true);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <View style={styles.container}>
          <Navigator />
          <FlashMessage
            type={'danger'}
            duration={5000}
            position={Platform.OS === 'ios' ? 'top' : styles.position}
            floating={Platform.OS !== 'ios'}
          />
          <OfflineModal visible={showModal} retry={handleRetry} setVisible={setShowModal}/>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  position: {
    top: StatusBar.currentHeight,
    left: 0,
    right: 0,
  },
});
