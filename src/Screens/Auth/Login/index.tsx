import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Images } from '@/Assets';
import adjust from 'components/adjust';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import SocialButton from 'components/SocialButton';
import { SCREENS } from '@/Constant';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/Redux/hooks/auth';
import Loader from '@/ReusableComponent/Loader';
import { useSignInViaSocialHook } from './useLoginHook';
// import { useSignInViaSocialHook } from './useLoginHook';
// import { AppleButton } from '@invertase/react-native-apple-authentication';
const { LOGIN1, GUESTDASHBOARD } = SCREENS;
export default function Login() {
  const [loading, setLoading] = useState<boolean>();
  const user = useAuth();
  console.log('UserData', user);
  // const {userInfo, error, loginWithApple, loginWithGoogle, loginWithFaceBook} = useSignInViaSocialHook()
  // const appleLoggedin = () => loginWithApple();
  const navigation: any = useNavigation();
  const {userInfo, error,isLoading, loginWithGoogle, loginWithFaceBook} = useSignInViaSocialHook();
  function userLogin(isRegister: boolean) {
    setLoading(true);
    navigation.navigate(LOGIN1,{isRegister:isRegister});
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.background} style={styles.imgBackground}>
        <View style={styles.main}>
          <Image source={Images.gradientLogo} style={styles.logo} />
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>{'Member Login'}</Text>
          </View>
          <SocialButton
            img={Images.logo}
            label={'Login with Email or Mobile        '}
            press={()=> userLogin(false)}
          />
          <SocialButton
            img={Images.fb}
            label={'Login with Facebook         '}
            imgStyle={styles.fb}
            style={styles.btn}
            press={()=> loginWithFaceBook()}
          />
          <SocialButton
            img={Images.google}
            label={'Login with Google              '}
            imgStyle={styles.google}
            style={{ backgroundColor: 'white', justifyContent: 'space-evenly' }}
            txtStyle={{ color: 'black' }}
            press={()=> loginWithGoogle()}
          />
          <SocialButton
            img={Images.logo}
            label={'Register with Email or Mobile       '}
            press={()=> userLogin(true)}
          />
          <View
            style={[
              styles.txtContainer,
              { marginBottom: 0, justifyContent: 'center' },
            ]}>
            <Image source={Images.line} />
          </View>
          <SocialButton
            label={'Continue as Guest User'}
            style={styles.guest}
            txtStyle={{ color: 'black' }}
            press={() => navigation.navigate(GUESTDASHBOARD)}
          />
        </View>
        <Loader loading={isLoading} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgBackground: {
    flex: 1,
  },
  main: {
    flex: 0.99,
    margin: adjust(25),
  },
  logo: {
    alignSelf: 'center',
    marginVertical: adjust(40),
    height: adjust(120),
    width: adjust(150),
  },
  txtContainer: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: adjust(15),
  },
  txt: {
    fontSize: adjust(20),
    color: COLORS.DARK,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginBottom:adjust(-5)
  },
  fb: {
    height: adjust(18),
    width: adjust(10),
  },
  btn: {
    backgroundColor: '#1877F2',
    justifyContent: 'space-evenly',
  },
  google: {
    width: adjust(18.2),
    height: adjust(18.7),
  },
  guest: {
    backgroundColor: 'white',
    borderColor: COLORS.DARK,
    borderWidth: 1,
  },
});
