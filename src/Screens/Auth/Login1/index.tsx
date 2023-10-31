import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import adjust from 'components/adjust';
import { COLORS, FONT_FAMILIES, REGEX } from '@/Configration';
import { Images } from '@/Assets';
import { TextInput } from 'react-native-gesture-handler';
import SocialButton from 'components/SocialButton';
import { SCREENS, VALIDATE_FORM } from '@/Constant';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '@/Redux/services/auth/authService';
import { useAppDispatch } from '@/Redux/hooks/hooks';
import { setCredentials } from '@/Redux/services/auth/authSlice';
import { useEffect } from 'react';
import Loader from '@/ReusableComponent/Loader';
import { showMessage } from 'react-native-flash-message';
import { useUserRegisterMutation } from '@/Redux/services/auth/userRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { OTP,REGISTER,LOGIN1 } = SCREENS;

export default function Login1(props: any) {
  const { route } = props;
  const { isRegister } = route?.params;
  const navigation: any = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [checkEmail, setCheckEmail] = useState<boolean | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [active, setActive] = useState<boolean | null>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [fixLength, setfixLength] = useState<number>();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation<any>();
    const [registerUser, { isLoading: isLoadingRegister, isError: isErrorRegister, 
      isSuccess:isSuccessRegister, data:dataRegister, error: errorRegister }] =
    useUserRegisterMutation<any>();
    const fcmToken = {
      fcmTokenByStorage : undefined
    }
  useEffect(() => {
    if (isSuccess && data?.data !== null) {
      showMessage({
        message: data?.message,
        type: 'success',
      });
      navigation.navigate(OTP, { userData: data?.data,isRegister: isRegister});
      setLoading(false);
    } else {
      setErrorEmail(data?.message);
      setLoading(false);
    }
    console.log('User Data', data);
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessRegister && dataRegister?.data !== null) {
      showMessage({
        message: dataRegister?.message,
        type: 'success',
      });
      navigation.navigate(OTP, { userData: dataRegister?.data, isRegister: isRegister});
      setLoading(false);
    } else {
      setErrorEmail(dataRegister?.message);
      setLoading(false);
    }
    console.log('User Data', dataRegister);
  }, [isSuccessRegister]);
  /**
   * @method loginToApp
   * @returns {object}
   */
  const loginToApp = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const datax = { username: email, type: 1, device_token: fcmToken };
    console.log('fcmTokenwithbody', datax);
    setLoading(true);
    try {
      const user: any = await login(datax).unwrap();
      return user;
    } catch (error: any) {
      const err = JSON.stringify(error?.error);
      alert(err);
      setLoading(false);
    }
  };

  const registerToApp = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const datax = { username: email, type: 1, device_token: fcmToken};
    setLoading(true);
    try {
      const userRegister: any = await registerUser(datax).unwrap();
      return userRegister;
    } catch (error: any) {
      const err = JSON.stringify(error?.error);
      alert(err);
      setLoading(false);
    }
  };
  
  const _emailvalidate = (mail: string) => {
    setCheckEmail(false);
    setActive(true);
    var emailRegex = REGEX.EMAIL;
    var phoneRegex = REGEX.MOBILE;
    setfixLength(0);
    if (mail === '') {
      setErrorEmail(VALIDATE_FORM.EMAILMOBILE);
      setCheckEmail(null);
    } else if (!emailRegex.test(mail) && !phoneRegex.test(mail)) {
      setErrorEmail(VALIDATE_FORM.VALIDEMAILMOBILE);
      setCheckEmail(true);
    } else if (!emailRegex.test(mail) && phoneRegex.test(mail)) {
      setErrorEmail('');
      setCheckEmail(false);
      setfixLength(10);
      setActive(false);
    } else {
      setErrorEmail('');
      setCheckEmail(false);
      setActive(false);
    }
  };

  const _validate = () => {
    let flag = true;
    if (email === '' || checkEmail) {
      setErrorEmail(errorEmail ? errorEmail : VALIDATE_FORM.EMAILMOBILE);
      flag = false;
    } else {
      return flag;
    }
  };

  const _getOtp = () => {
    if (_validate()) {
      isRegister==true? registerToApp(): loginToApp();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.background} style={styles.imgBackground}>
        <View style={styles.main}>
          <Image source={Images.gradientLogo} style={styles.logo} />
          <View style={styles.txtContainer}>
            { isRegister ? 
              <Text style={styles.txt}>{'Register with Email or Mobile'}</Text>:
              <Text style={styles.txt}>{'Login with Email or Mobile'}</Text>}
          </View>
          <View
            style={[
              styles.txtContainer,
              { flex: 0.6, alignItems: 'flex-start', justifyContent: 'flex-end' },
            ]}>
            <Text
              style={[
                styles.txt,
                {
                  fontSize: adjust(13),
                  marginVertical: adjust(4),
                  paddingLeft: adjust(4),
                },
              ]}>
              {'Enter email or mobile number'}
            </Text>
            <KeyboardAvoidingView>
              <View style={styles.input}>
                <Image source={Images.account} style={styles.acc} />
                <TextInput
                  style={styles.inp}
                  placeholder="Enter your Email or mobile no"
                  placeholderTextColor={COLORS.GRAY}
                  value={email}
                  maxLength={fixLength ? fixLength : 50}
                  keyboardType={'email-address'}
                  autoCapitalize="none"
                  onChangeText={txt => {
                    setEmail(txt), _emailvalidate(txt);
                  }}
                />
                {checkEmail !== null &&
                  (active ? (
                    <ActivityIndicator color={COLORS.MAIN} />
                  ) : (
                    <Image source={Images.tick} style={styles.tick} />
                  ))}
              </View>
              {errorEmail ? (
                <Text
                  style={[styles.txt, { color: 'red', fontSize: adjust(12) }]}>
                  {errorEmail}
                </Text>
              ) : null}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.bottom}>
            <SocialButton
              label={'Get OTP'}
              style={styles.btn}
              press={_getOtp}
            />
          </View>
        </View>
        <Loader loading={loading} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: adjust(35),
    height: adjust(120),
    width: adjust(150),
  },
  txtContainer: {
    flex: 0.13,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: adjust(15)
  },
  txt: {
    fontSize: adjust(20),
    color: COLORS.DARK,
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  fb: {
    height: adjust(18),
    width: adjust(10),
  },
  btn: {
    height: adjust(35),
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
  input: {
    height: adjust(40),
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  acc: {
    height: adjust(15),
    width: adjust(13),
    tintColor: 'black',
  },
  inp: {
    width: adjust(190),
    height: adjust(40),
    fontSize: adjust(12),
    color: 'black',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tick: {
    height: adjust(10),
    width: adjust(14),
  },
});
