import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from 'components/CustomButton';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {SCREENS} from '@/Constant';
import {showMessage} from 'react-native-flash-message';
import {useApplyLoanMutation} from '@/Redux/services/loans';
import TextBox from '@/Component/TextBox';
import Loader from '@/ReusableComponent/Loader';
const {MYLOAN} = SCREENS;

export default function Apply(props: any) {
  const {navigation, route} = props;
  const {params} = route;
  const [applyLoan, {data, isLoading, isSuccess}] = useApplyLoanMutation();
  const [amount, setAmount] = useState<string | number>(params?.amount);
  const [credit, setCredit] = useState<string | number>('');
  const [errorCredit, setErrorCredit] = useState<string | null>(null);
  const [checkCredit, setcheckCredit] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [monthTo, setMonthTo] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [errorDob, seterrorDob] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    useState<boolean>(false);

  // *********************************DatePicker***********************************************
  const updateDate = (selectedDate: any) => {
    if (isDatePickerVisible1) {
      setToDate(selectedDate);
      setDateTo(moment(selectedDate).format('DD'));
      setMonthTo(moment(selectedDate).format('MM'));
      setYearTo(moment(selectedDate).format('YYYY'));
    } else {
      setFromDate(selectedDate);
      setDate(moment(selectedDate).format('DD'));
      setMonth(moment(selectedDate).format('MM'));
      setYear(moment(selectedDate).format('YYYY'));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    if (isDatePickerVisible1) {
      setDatePickerVisibility1(false);
    }
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    if (isDatePickerVisible1) {
      setDatePickerVisibility1(false);
    }
    updateDate(date);
    hideDatePicker();
  };

  function _validateCredit(txt: string) {
    if (txt === '') {
      setErrorCredit('*Please enter credit score');
      setcheckCredit(true);
    } else if (Number(300) > Number(txt) || Number(txt) > Number(900)) {
      setErrorCredit('*Please enter valid credit score');
      setcheckCredit(true);
    } else if (700 > Number(txt)) {
      setErrorCredit('You are not eligible for loan');
      setcheckCredit(true);
    } else {
      setErrorCredit(null);
      setcheckCredit(false);
    }
  }

  function _validateTenure() {
    if (date === '') {
      seterrorDob('*Please select tenure');
    } else if (dateTo === '') {
      seterrorDob('*Please select end tenure');
    } else {
      seterrorDob(null);
    }
  }

  useEffect(() => {
    _validateTenure();
  }, [date, dateTo]);

  // *********************************** _validate *************************************
  const _validate = () => {
    let flag: boolean = true;
    if (credit === '' || checkCredit) {
      setErrorCredit(errorCredit ? errorCredit : '*Please enter credit score');
      flag = false;
    }
    if (date === '' || dateTo === '') {
      seterrorDob(errorDob ? errorDob : '*Please select tenure');
      flag = false;
    } else {
      return flag;
    }
  };

  // *********************************** _submit *************************************
  const _submit = async () => {
    if (_validate()) {
      const body: FormData = new FormData();
      body.append('amount', amount as string);
      body.append('cibil_score', credit as string);
      body.append('start_date', year + '-' + month + '-' + date);
      body.append('end_date', yearTo + '-' + monthTo + '-' + dateTo);
      body.append('roi', params?.roi);
      try {
        await applyLoan(body);
      } catch (error) {
        console.log('==error comes==>', error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        message: data?.message,
        type: data?.status ? 'success' : 'danger',
      });
      navigation.navigate(MYLOAN,{active:true});
      setDate('');
      setMonth('');
      setYear('');
      setDateTo('');
      setMonthTo('');
      setYearTo('');
      setCredit('');
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Header title={'Apply for Loan'} isBack />
      <ImageBackground source={Images.background} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <Text style={styles.label}>{'Amount'}</Text>
            <TextBox
              placeholder={'Select One'}
              style={styles.textbox}
              value={amount}
              setValue={setAmount}
              containerStyle={styles.containerStyle}
              // validate={_investAmountValidate}
              num
              editable={false}
            />
            <Text style={[styles.label, {marginTop: adjust(6)}]}>
              {'Select Tenure'}
            </Text>
            <View style={styles.date}>
              <TouchableOpacity
                style={styles.from}
                onPress={() => {
                  showDatePicker(), seterrorDob(null);
                }}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: date ? COLORS.DARK : COLORS.GRAY,
                      fontSize: adjust(13),
                    },
                  ]}>
                  {date ? `${year}-${month}-${date}` : 'From'}
                </Text>
                <Image source={Images.calender} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.from}
                onPress={() => {
                  setDatePickerVisibility1(true), seterrorDob(null);
                }}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: dateTo ? COLORS.DARK : COLORS.GRAY,
                      fontSize: adjust(13),
                    },
                  ]}>
                  {dateTo ? `${yearTo}-${monthTo}-${dateTo}` : 'To'}
                </Text>
                <Image source={Images.calender} />
              </TouchableOpacity>
            </View>
            {errorDob ? <Text style={styles.errorTxt}>{errorDob}</Text> : null}
            <DateTimePickerModal
              isVisible={isDatePickerVisible || isDatePickerVisible1}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={isDatePickerVisible1?moment(fromDate).add(1, 'month').toDate():new Date()}
            />
            <Text style={[styles.label, {marginTop: adjust(6)}]}>
              {'Credit Score'}
            </Text>
            <TextBox
              placeholder={'Select One'}
              style={styles.textbox}
              value={credit}
              setValue={setCredit}
              containerStyle={styles.containerStyle}
              validate={_validateCredit}
              num
            />
            {errorCredit ? (
              <Text style={styles.errorTxt}>{errorCredit}</Text>
            ) : null}
          </View>
          <Loader loading={isLoading} />
        </ScrollView>
        <CustomButton label={'Submit'} press={_submit} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
  input: {
    height: '10%',
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: adjust(5),
    paddingLeft: adjust(8),
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    backgroundColor: COLORS.WHITE,
  },
  label: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  date: {
    height: adjust(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  from: {
    backgroundColor: COLORS.WHITE,
    height: adjust(40),
    // width: Platform.OS === 'ios' ? adjust(125) : adjust(130),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: adjust(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '45%',
  },
  slide: {
    marginVertical: adjust(5),
  },
  uploadContainer: {
    height: adjust(104),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  uploadBtn: {
    height: adjust(90),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: COLORS.WHITE,
  },
  uploadImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dummy: {},
  errorTxt: {
    color: 'red',
    fontFamily: FONT_FAMILIES.AMERETTO,
    top: adjust(-4),
  },
  textbox: {
    // width: adjust(270),
    height: adjust(40),
    fontSize: adjust(12),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: COLORS.WHITE,
    borderWidth: StyleSheet.hairlineWidth,
  },
  containerStyle: {
    height: adjust(50),
  },
});
