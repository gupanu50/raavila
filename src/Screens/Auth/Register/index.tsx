import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES, REGEX} from '@/Configration';
import Registration from 'components/Registration';
import BankDetails from 'components/BankDetails';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import {image} from '@/Types';
import {showMessage} from 'react-native-flash-message';
import {useAppDispatch, useAppSelector} from '@/Redux/hooks/hooks';
import {useRegisterUserMutation} from '@/Redux/services/register';
import Loader from '@/ReusableComponent/Loader';
import {setCredentials} from '@/Redux/services/auth/authSlice';
import {useAddBankDetailMutation} from '@/Redux/services/addBankDetails';

const {MAIN, LOGIN1, LOGIN} = SCREENS;
export default function Register(props: any) {
  const user = useAppSelector((state: any) => state?.auth?.user);
  console.log('===user==>', user);
  const dispatch = useAppDispatch();
  const [registerUser, {isLoading, data, isSuccess}] =
    useRegisterUserMutation<any>();

  const [
    addBankDetails,
    {isSuccess: bankSuccess, data: bankData, isLoading: bankLoading},
  ] = useAddBankDetailMutation<any>();
  // const [] =

  const {navigation} = props;
  const [next, setNext] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>('');

  const [name, setName] = useState<string>('');
  const [errorName, seterrorName] = useState<string | null>(null);
  const [checkName, setcheckName] = useState<boolean>(false);

  const [mother, setMother] = useState<string>('');
  const [errorMother, setErrorMother] = useState<string | null>(null);
  const [checkMother, setCheckMother] = useState<boolean>(false);

  const [father, setFather] = useState<string>('');
  const [errorFather, setErrorFather] = useState<string | null>(null);
  const [checkFather, setCheckFather] = useState<boolean>(false);

  const [date, setDate] = useState<string>('DD');
  const [month, setMonth] = useState<string>('MM');
  const [year, setYear] = useState<string>('YYYY');
  const [errorDob, seterrorDob] = useState<string | null>(null);

  const [mobile, setMobile] = useState<string | number>(
    user?.mobile !== null ? user?.mobile : '',
  );
  const [errorMobile, setErrorMobile] = useState<string | null>(null);
  const [checkMobile, setCheckMobile] = useState<boolean>(false);

  const [email, setEmail] = useState<string>(user?.email);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  const [address, setAddress] = useState<string>('');
  const [errorAddress, setErrorAddress] = useState<string | null>(null);

  const [marital, setMarital] = useState<string>('');
  const [errorMarital, setErrorMarital] = useState<string | null>(null);

  const [disable, setDisable] = useState<string>('');
  const [errorDisable, setErrorDisable] = useState<string | null>(null);

  const [selected, setSelected] = useState<string>('');
  const [errorOccupation, setErrorOccupation] = useState<string | null>(null);

  const [profile, setProfile] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });

  const [aadhar, setAadhar] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });
  const [errorAadhar, setErrorAadhar] = useState<string | null>(null);

  const [pan, setPan] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });
  const [errorPan, setErrorPan] = useState<string | null>(null);

  const [passport, setPassport] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });

  const [itr, setItr] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });

  const [accName, setAccName] = useState<string>('');
  const [errorAccName, setErrorAccName] = useState<string | null>(null);

  const [accNumber, setAccNumber] = useState<string>('');
  const [errorAccNumber, setErrorAccNumber] = useState<string | null>(null);

  const [ifscCode, setIfscCode] = useState<string>('');
  const [errorIfsc, setErrorIfsc] = useState<string | null>(null);

  const [cheque, setCheque] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });
  const [errorCheque, setErrorCheque] = useState<string | null>(null);

  const [upi, setUpi] = useState<string>('');
  const [errorUpi, setErrorUpi] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  // *********************************** email validation ********************************
  const _emailvalidate = (mail: string) => {
    var emailRegex = REGEX.EMAIL;
    if (mail === '') {
      setErrorEmail(VALIDATE_FORM.EMAILMOBILE);
      setCheckEmail(true);
    } else if (!emailRegex.test(mail)) {
      setErrorEmail(VALIDATE_FORM.VALIDEMAILMOBILE);
      setCheckEmail(true);
    } else {
      setErrorEmail(null);
      setCheckEmail(false);
    }
  };

  // *********************************** mobile validation ********************************
  const _mobileValidate = (PhoneNumber: number | string) => {
    var phoneNumberRegex = REGEX.MOBILE;
    if (PhoneNumber === '') {
      setErrorMobile(VALIDATE_FORM.MOBILE);
      setCheckMobile(true);
      // @ts-ignore
    } else if (!phoneNumberRegex.test(PhoneNumber)) {
      setErrorMobile(VALIDATE_FORM.MOBILE_VALID);
      setCheckMobile(true);
    } else {
      setErrorMobile(null);
      setCheckMobile(false);
    }
  };

  // *********************************** name validation ********************************
  const _namevalidate = (mail: string) => {
    var nameRegex = REGEX.NAME;
    if (mail === '') {
      seterrorName(VALIDATE_FORM.NAME);
      setcheckName(true);
    } else if (!nameRegex.test(mail)) {
      seterrorName(VALIDATE_FORM.VALID_NAME);
      setcheckName(true);
    } else {
      seterrorName(null);
      setcheckName(false);
    }
  };

  // *********************************** Father's name validation ********************************
  const _fatherValidate = (mail: string) => {
    var nameRegex = REGEX.NAME;
    if (mail === '') {
      setErrorFather(VALIDATE_FORM.FATHER);
      setCheckFather(true);
    } else if (!nameRegex.test(mail)) {
      setErrorFather(VALIDATE_FORM.VALID_NAME);
      setCheckFather(true);
    } else {
      setErrorFather(null);
      setCheckFather(false);
    }
  };
  // *********************************** Mother's name validation ********************************
  const _motherValidate = (mail: string) => {
    var nameRegex = REGEX.NAME;
    if (mail === '') {
      setErrorMother(VALIDATE_FORM.MOTHER);
      setCheckMother(true);
    } else if (!nameRegex.test(mail)) {
      setErrorMother(VALIDATE_FORM.VALID_NAME);
      setCheckMother(true);
    } else {
      setErrorMother(null);
      setCheckMother(false);
    }
  };

  // *********************************** Address validation ********************************
  const _addressValidate = (mail: string) => {
    if (mail === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
    } else {
      setErrorAddress(null);
    }
  };

  const [checkUpi, setCheckUpi] = useState<boolean>(false);
  // *********************************** UPI validation ********************************
  const _upiValidate = (mail: string) => {
    // let regex = /^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$/;
    let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
    if (mail === '') {
      setErrorUpi('*Please enter your UPI ID');
      setCheckUpi(true);
    } else if (!regex.test(mail)) {
      setErrorUpi('*Please enter a valid UPI ID');
      setCheckUpi(true);
    } else {
      setErrorUpi(null);
      setCheckUpi(false);
    }
  };

  const isValidate = () => {
    let flag: boolean = true;
    if (name === '' || checkName) {
      seterrorName(errorName ? errorName : VALIDATE_FORM.NAME);
      flag = false;
    }
    if (mother === '' || checkMother) {
      setErrorMother(errorMother ? errorMother : VALIDATE_FORM.MOTHER);
      flag = false;
    }
    if (father === '' || checkFather) {
      setErrorFather(errorFather ? errorFather : VALIDATE_FORM.FATHER);
      flag = false;
    }
    if (email === '' || checkEmail) {
      setErrorEmail(errorEmail ? errorEmail : VALIDATE_FORM.EMAIL);
      flag = false;
    }
    if (mobile === '' || checkMobile) {
      setErrorMobile(errorMobile ? errorMobile : VALIDATE_FORM.MOBILE);
      flag = false;
    }
    if (address === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
      flag = false;
    }
    if (date == 'DD') {
      seterrorDob(VALIDATE_FORM.DOB);
      flag = false;
    }
    if (marital == '') {
      setErrorMarital(VALIDATE_FORM.MARITAL);
      flag = false;
    }
    if (disable == '') {
      setErrorDisable(VALIDATE_FORM.PHYSICAL);
      flag = false;
    }
    if (selected == '') {
      setErrorOccupation(VALIDATE_FORM.OCCUPATION);
      flag = false;
    }
    if (aadhar.uri == '') {
      setErrorAadhar(VALIDATE_FORM.AADHAR);
      flag = false;
    }
    if (pan.uri == '') {
      setErrorPan(VALIDATE_FORM.PAN);
      flag = false;
    } else {
      return flag;
    }
  };

  const _isValidateBankDetails = () => {
    let flag: boolean = true;
    if (accName == '') {
      setErrorAccName(VALIDATE_FORM.ACCOUNT);
      flag = false;
    }
    if (accNumber == '') {
      setErrorAccNumber(VALIDATE_FORM.ACC_NUMBER);
      flag = false;
    }
    if (ifscCode == '') {
      setErrorIfsc(VALIDATE_FORM.IFSC);
      flag = false;
    }
    if (cheque.uri == '') {
      setErrorCheque(VALIDATE_FORM.CHEQUE);
      flag = false;
    }
    if (upi === '' || checkUpi) {
      setErrorUpi(errorUpi ? errorUpi : '*Please enter your UPI ID');
      flag = false;
    } else {
      return flag;
    }
  };

  useEffect(() => {
    if (bankSuccess && bankData?.data) {
      showMessage({
        message: data?.message,
        type: 'success',
      });
      // dispatch(setCredentials({user: null}));
      navigation.navigate(LOGIN1, {isRegister: false});
      setLoading(false);
    }
    setLoading(false);
  }, [bankSuccess]);

  useEffect(() => {
    if (isSuccess && data?.data) {
      // showMessage({
      //   message: data?.message,
      //   type: 'success',
      // });
      setProfileData(data?.data);
      setLoading(false);
      console.log('Successfully registerDATA', data);
      setNext(true);
    }
    setLoading(false);
  }, [isSuccess]);

  const _validate = async (inf: string) => {
    if (inf == 'personal') {
      if (isValidate()) {
        const body: FormData = new FormData();
        body.append('fullname', name);
        body.append('mother_name', mother);
        body.append('father_name', father);
        body.append('dob', year + '-' + month + '-' + date);
        body.append('marital_status', marital);
        body.append('physically_disable', disable);
        body.append('occupation', selected);
        body.append('comm_address', address);
        body.append('profile_pic', profile);
        body.append('mobile', mobile as any);
        body.append('email', email);
        body.append('aadhar', aadhar);
        body.append('pan_card', pan);
        {
          passport.name ? body.append('dl_passport', passport) : null;
        }
        {
          itr.name ? body.append('itr_document', itr) : null;
        }
        try {
          await registerUser(body);
        } catch (error) {
          showMessage({
            message: data?.message,
            type: 'danger',
          });
          console.log('==error==', error);
        }
      }
    } else {
      if (_isValidateBankDetails()) {
        const body:FormData = new FormData();
        body.append('account_holder_name', accName),
          body.append('account_number', accNumber),
          body.append('ifsc_code', ifscCode),
          body.append('cancle_cheque', cheque as any);
          body.append('upi_id', upi);
        try {
          await addBankDetails(body);
        } catch (error) {
          showMessage({
            message: data?.message,
            type: 'danger',
          });
          console.log('==error==', error);
        }
      }
    }
  };

  const _skip = () => {
    showMessage({
      message: 'Your Account created Successfully!!',
      type: 'success',
    });
    // dispatch(setCredentials({user: profileData}));
    navigation.navigate(LOGIN1, {isRegister: false});
  };

  const _backButton = () => {
    if (next) {
      setNext(false);
    } else {
      navigation.navigate(LOGIN, {isRegister: false});
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.background} style={styles.imgBackground}>
        <SafeAreaView style={styles.main}>
          <View style={styles.up}>
            <View style={styles.header}>
              <Text style={styles.headerTxt}>
                {next ? 'Bank Information' : 'Complete your profile'}
              </Text>
              <TouchableOpacity onPress={_skip} disabled={true}>
                {next ? (
                  <Text style={[styles.headerTxt, {fontSize: adjust(15)}]}>
                    {/* {'Skip'} */}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={styles.line}>
              <Image source={Images.line1} style={styles.lineImg} />
              <Image
                source={Images.line1}
                style={[
                  styles.lineImg,
                  {tintColor: next ? COLORS.MAIN : COLORS.GRAY},
                ]}
              />
            </View>
          </View>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            // scrollEnabled={!next}
          >
            <View style={styles.insideScroll}>
              {next ? (
                <BankDetails
                  accName={accName}
                  setAcName={setAccName}
                  erAc={errorAccName}
                  setErAc={setErrorAccName}
                  acNum={accNumber}
                  setAcNum={setAccNumber}
                  erNum={errorAccNumber}
                  setErNum={setErrorAccNumber}
                  ifCode={ifscCode}
                  setIfCode={setIfscCode}
                  erIfCode={errorIfsc}
                  setErIfCode={setErrorIfsc}
                  cheque={cheque}
                  setCheque={setCheque}
                  erCheque={errorCheque}
                  setErCheque={setErrorCheque}
                  upi={upi}
                  setUpi={setUpi}
                  erUpi={errorUpi}
                  setErUpi={setErrorUpi}
                  valUpi={_upiValidate}
                />
              ) : (
                <Registration
                  nam={name}
                  setNam={setName}
                  val={_namevalidate}
                  erNam={errorName}
                  mobile={mobile}
                  setMobile={setMobile}
                  mobileVal={_mobileValidate}
                  errorMobile={errorMobile}
                  email={email}
                  setEmail={setEmail}
                  emailVal={_emailvalidate}
                  errorEmail={errorEmail}
                  namMo={mother}
                  setMo={setMother}
                  valMo={_motherValidate}
                  erMo={errorMother}
                  namFa={father}
                  setFa={setFather}
                  valFa={_fatherValidate}
                  erFa={errorFather}
                  com={address}
                  setCom={setAddress}
                  valCom={_addressValidate}
                  erCom={errorAddress}
                  dat={date}
                  mon={month}
                  yer={year}
                  setDt={setDate}
                  setMon={setMonth}
                  setYr={setYear}
                  erDob={errorDob}
                  setErDob={seterrorDob}
                  mar={marital}
                  setMar={setMarital}
                  erMar={errorMarital}
                  setErMar={setErrorMarital}
                  dis={disable}
                  setDis={setDisable}
                  erDis={errorDisable}
                  setErDis={setErrorDisable}
                  select={selected}
                  setSelect={setSelected}
                  erSelect={errorOccupation}
                  setErSelect={setErrorOccupation}
                  pro={profile}
                  setPro={setProfile}
                  aad={aadhar}
                  setAad={setAadhar}
                  pan={pan}
                  setPan={setPan}
                  passport={passport}
                  setPassport={setPassport}
                  itr={itr}
                  setItr={setItr}
                  errorAadhar={errorAadhar}
                  setErrorAadhar={setErrorAadhar}
                  errorPan={errorPan}
                  setErrorPan={setErrorPan}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => _backButton()}>
            {/* {next ?  */}
            <Text style={styles.txt}>{'Back'}</Text>
            {/* : null} */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _validate(next ? 'bank' : 'personal')}>
            <Text style={styles.txt}>{next ? 'Submit' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
        <Loader loading={next ? bankLoading : isLoading} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  imgBackground: {
    flex: 1,
  },
  main: {
    flex: 0.92,
    // flex:1,
    // alignItems: 'center',
    margin: adjust(20),
    // backgroundColor:'green'
  },
  bottom: {
    backgroundColor: COLORS.MAIN,
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    padding: adjust(12),
  },
  scroll: {
    // width: adjust(280)
  },
  insideScroll: {
    marginVertical: adjust(5),
  },
  up: {
    // width: adjust(280),
    height: adjust(50),
  },
  headerTxt: {
    fontSize: adjust(20),
    color: COLORS.MAIN,
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineImg: {
    // width: adjust(135),
    width: '47%',
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
