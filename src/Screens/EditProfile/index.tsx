import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import adjust from 'components/adjust';
import {Images} from '@/Assets';
import Registration from 'components/Registration';
import {editProfile, image} from '@/Types';
import BankDetails from 'components/BankDetails';
import {COLORS, FONT_FAMILIES, REGEX} from '@/Configration';
import {VALIDATE_FORM} from '@/Constant';
import Loader from '@/ReusableComponent/Loader';
import {useUpdateProfileMutation} from '@/Redux/services/profile/profile';
import {showMessage} from 'react-native-flash-message';
//Add this while refectoring the code make a profile model for user and use this accross the app.
type Profile = {};
export default function EditProfile(props: any) {
  const {params} = props?.route;
  const {
    aadhar: adhar,
    itr_document,
    profile_pic,
    physically_disable,
    pan_card,
    marital_status,
    mobile,
    occupation,
    mother_name,
    name: i_name,
    account_number,
    bank,
    comm_address,
    dl_passport,
    dob,
    email,
    father_name,
  } = params?.data;
  const dobArray = dob?.split('/');
  const userDob = new Date(dob);
  const userYear = userDob.getFullYear();
  const userMonth = String(userDob.getMonth() + 1).padStart(2, '0');
  const userDay = String(userDob.getDate()).padStart(2, '0');

  const [name, setName] = useState<string>(i_name);
  const [errorName, seterrorName] = useState<string | null>(null);
  const [checkName, setcheckName] = useState<boolean>(false);

  const [mother, setMother] = useState<string>(mother_name);
  const [errorMother, setErrorMother] = useState<string | null>(null);
  const [checkMother, setCheckMother] = useState<boolean>(false);

  const [father, setFather] = useState<string>(father_name);
  const [errorFather, setErrorFather] = useState<string | null>(null);
  const [checkFather, setCheckFather] = useState<boolean>(false);

  const [date, setDate] = useState<string>(dob ? userDay : '');
  const [month, setMonth] = useState<string>(dob ? userMonth : '');
  const [year, setYear] = useState<string | number>(userYear);
  const [errorDob, seterrorDob] = useState<string | null>(null);

  const [address, setAddress] = useState<string>(comm_address);
  const [errorAddress, setErrorAddress] = useState<string | null>(null);

  const [marital, setMarital] = useState<string>(marital_status);
  const [errorMarital, setErrorMarital] = useState<string | null>(null);

  const [disable, setDisable] = useState<string>(physically_disable);
  const [errorDisable, setErrorDisable] = useState<string | null>(null);

  const [selected, setSelected] = useState<string>(occupation);
  const [errorOccupation, setErrorOccupation] = useState<string | null>(null);

  const [profile, setProfile] = useState<image>({
    uri: profile_pic,
    type: '',
    name: '',
  });

  const [aadhar, setAadhar] = useState<image>({
    uri: adhar,
    type: '',
    name: '',
  });
  const [errorAadhar, setErrorAadhar] = useState<string | null>(null);

  const [pan, setPan] = useState<image>({
    uri: pan_card,
    type: '',
    name: '',
  });
  const [errorPan, setErrorPan] = useState<string | null>(null);

  const [passport, setPassport] = useState<image>({
    uri: dl_passport,
    type: '',
    name: '',
  });

  const [itr, setItr] = useState<image>({
    uri: itr_document,
    type: '',
    name: '',
  });

  const [accName, setAccName] = useState<string>('');
  const [errorAccName, setErrorAccName] = useState<string | null>(null);

  const [accNumber, setAccNumber] = useState<string>('');
  const [errorAccNumber, setErrorAccNumber] = useState<string | null>(null);

  const [ifscCode, setIfscCode] = useState<string>('');
  const [errorIfsc, setErrorIfsc] = useState<string | null>(null);

  const [cheque, setCheque] = useState<image>({
    uri: '',
    type: '',
    name: '',
  });
  const [errorCheque, setErrorCheque] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  /**
   * Apply services for edit profile
   */
  const [updateProfile, result] = useUpdateProfileMutation();
  console.log(
    'What we are getting here in results:\n',
    result?.data?.errors?.fullname,
  );
  console.log('====profileResult====>>>',result);
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
  useEffect(() => {
    if (result.isSuccess) {
      showMessage({
        message: result.data?.message,
        type: result?.data?.status?'success':'danger',
        autoHide: true,
        duration: 1000,
      });
      props.navigation.goBack();
    }
  }, [result.isSuccess]);

  /**
   * @access : @access @abstract
   */
  const editProfileUpdate = (isUpdate: Boolean) => {
    const data: editProfile = {
      physically_disable: disable,
      marital_status: marital,
      mobile,
      occupation: selected,
      mother_name: mother,
      name: name,
      fullname: name,
      account_number,
      bank,
      comm_address: address,
      dob: year + '-' + month + '-' + date,
      email,
      father_name: father,
    };
    let formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    if (profile.type) {
      formData.append('profile_pic', profile as any);
    }
    if (aadhar.type) {
      formData.append('aadhar', aadhar as any);
    }
    if (pan.type) {
      formData.append('pan_card', pan as any);
    }
    if (passport.type) {
      formData.append('dl_passport', passport as any);
    }
    if (itr.type) {
      formData.append('itr_document', itr as any);
    }
    console.log('Profile Picture', profile.type);
    console.log('===formdata===>', formData);
    updateProfile(formData);
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

  const _validate = () => {
    if (isValidate()) {
    editProfileUpdate(true);
    }else{
      console.log('====not Validate====>')
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'My Profile'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={Images.bgcurve} style={styles.curve} />
          <View style={styles.inside}>
            <Registration
              nam={name}
              setNam={setName}
              val={_namevalidate}
              erNam={errorName}
              namMo={mother}
              setMo={setMother}
              valMo={_motherValidate}
              emailVal={email}
              mobile={mobile}
              email={email}
              mobileVal={mobile}
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
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={_validate}>
            <Text style={styles.txt}>{'Save Changes'}</Text>
          </TouchableOpacity>
        </View>
        <Loader loading={result?.isLoading} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {},
  insideScroll: {
    backgroundColor: 'green',
    flex: 1,
  },
  curve: {
    // width: adjust(320),
    resizeMode: 'stretch',
    width: '100%',
    height: adjust(110),
  },
  bgImg: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  inside: {
    flex: 1,
    margin: adjust(15),
    top: adjust(-100),
  },
  bottom: {
    backgroundColor: COLORS.MAIN,
    height: adjust(45),
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    textAlign: 'center',
    paddingTop: adjust(10),
  },
});
