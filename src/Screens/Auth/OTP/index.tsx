import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import adjust from 'components/adjust';
import SocialButton from 'components/SocialButton';
import {Images} from '@/Assets';
import {COLORS, FONT_FAMILIES} from '@/Configration';
// @ts-ignore
import OTPTextView from 'react-native-otp-textinput';
import {SCREENS} from '@/Constant';
import {useLoginMutation} from '@/Redux/services/auth/authService';
import {useVerifyOtpMutation} from '@/Redux/services/auth/verifyOtp';
import {setCredentials} from '@/Redux/services/auth/authSlice';
import {useAppDispatch} from '@/Redux/hooks/hooks';
import Loader from '@/ReusableComponent/Loader';
import {showMessage} from 'react-native-flash-message';
import { setRegisterUser } from '@/Redux/services/auth/registerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {REGISTER, MAIN, PROFILE, MYPROFILE} = SCREENS;

export default function Otp(props: any) {
  const {navigation, route} = props;
  const userData = route.params?.userData;
  const isRegister= route.params?.isRegister;
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOtpNumber, setResendOtpNumber] = useState<number|null>(null);
  const [errorOtp, setErrorOtp] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [verifyOtp, {isLoading, data, isSuccess}] = useVerifyOtpMutation<any>();
  const [login, { isLoading : isLoadingOtp, isError: isErrorOtp, isSuccess: isSuccessOtp, data : dataOtp, error: errorOtp1 }] =
    useLoginMutation<any>();
  // *********************Ref***************************
  const inputRef: any = useRef(null);

  // *********************clear***************************
  const clear = () => {
    inputRef.current.clear();
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      showMessage({
        message: data?.message,
        type: 'success',
        autoHide:true,
        duration:1000
      });
      setLoading(false);
      console.log('Successfully userDATA', data);
      if (data?.data?.complete_profile === 1) {
        dispatch(setCredentials({user: data?.data, token: data?.data.token, isSplash:true}));
        ////navigation.navigate(MAIN);
      } else {
        dispatch(setCredentials({user: data?.data, token: data?.data.token, isSplash:false}));
        // dispatch(setRegisterUser({user: data?.data}));
        navigation.navigate(REGISTER);
      }
    } else {
      setLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessOtp && dataOtp?.data !== null) {
      showMessage({
        message: dataOtp?.message,
        type: 'success',
        autoHide:true,
        duration:1000
      });
      setResendOtpNumber(dataOtp?.data?.otp)
      setLoading(false);
    } else {
      setLoading(false);
    }
    console.log('User Data', dataOtp);
  }, [isSuccessOtp]);
  const _validate = () => {
    let flag = true;
    if (otp.length !== 4) {
      setErrorOtp('*Please enter OTP');
      flag = false;
    }
    return flag;
  };

  // ********************* verify ***************************
  const _verify = async () => {
    if (_validate()) {
      setLoading(true);
      const body = {
        otp: resendOtpNumber? resendOtpNumber: userData.otp,
        username: userData.email
          ? userData.email
          : userData.mobile
          ? userData.mobile
          : userData.username,
      };
      try {
        await verifyOtp(body);
      } catch (error:any) {
        setLoading(false);
        const err = JSON.stringify(error?.error);
        alert(err);
      }
    }
  };
  const resendOtp = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setLoading(true);
    const body = {
      type:1,
      username: userData.email
          ? userData.email
          : userData.mobile
          ? userData.mobile
          : userData.username,
          device_token: fcmToken
    }
    try {
      const user: any = await login(body).unwrap();
      return user;
    } catch (error: any) {
      const err = JSON.stringify(error?.error);
      alert(err);
      setLoading(false);
    }
  }
  // ********************* resend ***************************
  function _resend() {
    clear();
    resendOtp();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={()=>Keyboard.dismiss()}>
      <ImageBackground source={Images.background} style={styles.imgBackground}>
        <View style={styles.main}>
          <Image source={Images.gradientLogo} style={styles.logo} />
          <View style={styles.txtContainer}>
            {
              isRegister==true ? 
              <Text style={styles.txt}>{'Register with Email or Mobile'}</Text>:
              <Text style={styles.txt}>{'Login with Email or Mobile'}</Text>}
          </View>
          <View
            style={[
              styles.txtContainer,
              {
                flex: 0.6,
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              },
            ]}>
            <Text
              style={[
                styles.txt,
                {
                  fontSize: adjust(13),
                  marginVertical: adjust(4),
                  paddingLeft: adjust(7),
                },
              ]}>
              {'Enter OTP sent on your email/mobile'}
            </Text>
            <KeyboardAvoidingView>
              <View style={styles.input}>
                <OTPTextView
                  handleTextChange={(txt: string) => {
                    setOtp(txt), setErrorOtp(null);
                  }}
                  containerStyle={styles.otpinput}
                  textInputStyle={styles.otp}
                  inputCount={4}
                  autoFocus={true}
                  secureTextEntry={true}
                  ref={inputRef}
                  tintColor={COLORS.BORDER_COLOR}
                />
              </View>
              {errorOtp ? (
                <Text style={styles.errorTxt}>{errorOtp}</Text>
              ) : null}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.bottom}>
            <View style={styles.resendView}>
              <TouchableOpacity style={styles.resend} onPress={_resend}>
                <Text
                  style={[
                    styles.txt,
                    {
                      fontSize: adjust(14),
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>
            <SocialButton label={'Verify'} style={styles.btn} press={_verify} />
          </View>
        </View>
        <Loader loading={loading} />
      </ImageBackground>
    </TouchableOpacity>
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
    margin: adjust(20),
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
  btn: {
    height: adjust(35),
  },
  input: {
    height: adjust(65),
    // width: Platform.OS === 'ios' ? adjust(257) : adjust(262),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    width: '100%',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  otpinput: {
    // height: 10,
    // width: '94%',
    // backgroundColor:'blue',
    width: '100%',
  },
  otp: {
    color: COLORS.MAIN,
    borderBottomWidth: 0.5,
    height: adjust(60),
    width: adjust(50),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 0.5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    elevation: 10,
    fontSize: adjust(30),
    fontFamily: FONT_FAMILIES.AMERETTO,
    // marginHorizontal: adjust(9),
  },
  errorTxt: {
    fontSize: adjust(12),
    color: 'red',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  resendView: {
    height: adjust(60),
    alignItems: 'center',
  },
  resend: {
    width: '40%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
