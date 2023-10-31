import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import adjust from 'components/adjust';
import SocialButton from 'components/SocialButton';
import {Images} from '@/Assets';
import {COLORS, FONT_FAMILIES} from '@/Configration';
// @ts-ignore
import OTPTextView from 'react-native-otp-textinput';
import {SCREENS} from '@/Constant';
import {useAppDispatch} from '@/Redux/hooks/hooks';
import Loader from '@/ReusableComponent/Loader';
import {showMessage} from 'react-native-flash-message';
import {useVerifyCashOtpMutation} from '@/Redux/services/myPlans/verifyCashOtp';
import {useInvestOtpVerifyMutation} from '@/Redux/services/investments';
import {useCommitteeOtpVerifyMutation} from '@/Redux/services/committee';
const {REGISTER, MAIN, PROFILE, MYPROFILE} = SCREENS;

export default function PaymentOtp(props: any) {
  const {navigation, route} = props;
  const {params} = route;
  console.log('=====>', params);
  const [plan] = useState<any>({
    id: params?.plan_id,
    otp: params?.plan_otp,
    account: params?.currentAccount,
  });
  const [investment] = useState<any>({
    id: params?.invest_id,
    otp: params?.investOtp,
    account: params?.investAccount,
    offerId: params?.invest_offer_id,
  });
  const [committee] = useState<any>({
    id: params?.committeeId,
    otp: params?.otp,
    account: params?.committeeAccount,
  });
  const [verifyCashOtp, {data, isSuccess}] = useVerifyCashOtpMutation<any>();
  const [investVerifyOtp, {data: investData, isSuccess: investSuccess}] =
    useInvestOtpVerifyMutation();
  const [
    committeeOtpVerify,
    {data: committeeData, isSuccess: committeSuccess},
  ] = useCommitteeOtpVerifyMutation<any>();
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorOtp, setErrorOtp] = useState<string | null>(null);

  // *********************Ref***************************
  const inputRef: any = useRef(null);

  // *********************clear***************************
  const clear = () => {
    inputRef.current.clear();
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      showMessage({
        message: data?.message,
        type: 'success',
        autoHide: true,
        duration: 1000,
      });
      navigation.goBack();
      console.log('Successfully userDATA', data);
    } else {
      setLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (investSuccess) {
      setLoading(false);
      showMessage({
        message: investData?.message,
        type: 'success',
        autoHide: true,
        duration: 1000,
      });
      navigation.goBack();
      console.log('Successfully userDATA', investData);
    } else {
      setLoading(false);
    }
  }, [investSuccess]);

  useEffect(() => {
    if (committeSuccess) {
      setLoading(false);
      showMessage({
        message: committeeData?.message,
        type: 'success',
        autoHide: true,
        duration: 1000,
      });
      navigation.goBack();
      console.log('Successfully userDATA', committeeData);
    } else {
      setLoading(false);
    }
  }, [committeSuccess]);

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
        otp: plan?.otp,
        plan_id: plan.id,
        plan_account: plan.account,
      };
      const investBody = {
        otp: investment?.otp,
        invest_id: investment.id,
        invest_account: investment.account,
        invest_offer_id: investment.offerId,
      };
      const committeeBody = {
        otp: committee?.otp,
        committee_account: committee?.account,
        committee_id: committee?.id,
      };
      try {
        plan?.id
          ? await verifyCashOtp(body)
          : committee?.id
          ? await committeeOtpVerify(committeeBody)
          : await investVerifyOtp(investBody);
      } catch (error) {
        setLoading(false);
        const err: any = JSON.stringify(error?.error);
        alert(err);
      }
    }
  };

  // ********************* resend ***************************
  function _resend() {
    clear();
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.background} style={styles.imgBackground}>
        <View style={styles.main}>
          <View style={styles.backView}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.leftArrow}
                style={{tintColor: COLORS.MAIN}}
              />
            </TouchableOpacity>
          </View>
          <Image source={Images.gradientLogo} style={styles.logo} />
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>{'Verify Otp with the agent'}</Text>
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
            {/* <Text
              style={[
                styles.txt,
                {
                  fontSize: adjust(13),
                  marginVertical: adjust(4),
                  paddingLeft: adjust(7),
                },
              ]}>
              {'Enter OTP sent on your email/mobile'}
            </Text> */}
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
            {/* <View style={styles.resendView}>
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
                  {'Resent OTP'}
                </Text>
              </TouchableOpacity>
            </View> */}
            <SocialButton label={'Verify'} style={styles.btn} press={_verify} />
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
  backView: {
    height: adjust(30),
    position: 'absolute',
    width: adjust(20),
    justifyContent: 'flex-end',
    marginTop: adjust(8),
  },
  backBtn: {height: adjust(20), justifyContent: 'center'},
});
