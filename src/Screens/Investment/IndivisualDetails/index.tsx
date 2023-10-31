import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '@/ReusableComponent/Header';
import TextBox from '@/Component/TextBox';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import adjust from '@/Component/adjust';
import moment from 'moment';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import CustomTabBar from '@/Component/CustomTabBar';
import CustomButton from '@/Component/CustomButton';
import {useGetVerifyPinCodeMutation} from '@/Redux/services/investments';
import {showMessage} from 'react-native-flash-message';
const {PAYCASH,ONLINEPAYMENT} = SCREENS;
const IndivisualDetails = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;

  // committeEmiData
  const committeeEmiAmount = params?.committeeAmount;
  const committeeEmiAmountString =
    committeeEmiAmount !== undefined ? committeeEmiAmount.toString() : '';
  const [committeEmiData] = useState({
    committeeMonth: params?.committeeMonth,
    committeeAccount: params?.committeeAccount,
    committeeId: params?.committeeId,
    committeeAmount: committeeEmiAmountString,
    naviName: 'committee',
  });

  console.log('-=-=-=-=committeeEmi-=-=-=-=-', committeEmiData);

  // committeData
  const committeeAmount = params?.committee_amount;
  const committeeAmountString =
    committeeAmount !== undefined ? committeeAmount.toString() : '';

  const [committeData] = useState({
    committee_amount: committeeAmountString,
    committee_id: params?.committee_id,
    naviName: 'committee',
  });

  console.log('===comitteeAmount===>', committeData);

  // investment offer data
  const [offerData] = useState({
    amount: params?.offerAmount,
    for: params?.offerFor,
    getAmount: params?.offerGetAmount,
    id: params?.offerId,
    roi: params?.offerRoi,
    type: params?.offerType,
    from: params?.offerFrom,
    to: params?.offerTo,
    naviName: 'investmentOffer',
  });

  const [previousData] = useState({
    amount: params?.amount,
    for: params?.for,
    getAmount: params?.getamount,
    id: params?.id,
    roi: params?.roi,
    type: params?.type,
    naviName: 'investment',
  });

  const [getVerifyPinCode] = useGetVerifyPinCodeMutation();
  const [investAmount, setInvestAmount] = useState<string>(
    previousData?.amount
      ? previousData?.amount
      : committeData?.committee_amount
      ? committeData.committee_amount
      : committeEmiData?.committeeAmount
      ? committeEmiData.committeeAmount
      : offerData?.amount,
  );

  console.log('===investAmount==>', investAmount);

  const [errorInvestAmount, setErrorInvestAmount] = useState<string | null>(
    null,
  );
  const formattedRoi: any = (params?.roi ?? [])
    .filter((item: any) => item !== null)
    .map((item: any) => `${item} %`)
    .join(' , ');
  const formattedGetAmount: any = (params?.getamount ?? [])
    .filter((item: any) => item !== null)
    .map((item: any) => `${'\u20B9'} ${item}`)
    .join(' , ');

  const [errorFromTenure, setErrorFromTenure] = useState<string | null>(null);
  const [errorToTenure, setErrorToTenure] = useState<string | null>(null);
  const [errorRoi, setErrorRoi] = useState<string | null>(null);
  const [errorPinCode, setErrorPinCode] = useState<string | null>(null);
  const [errorTerms, setErrorTerms] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [dt, setDt] = useState<string>('DD');
  const [mon, setMon] = useState<string>('');
  const [yr, setYr] = useState<string>('');
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    useState<boolean>(false);
  const [dt1, setDt1] = useState<string>('DD');
  const [mon1, setMon1] = useState<string>('');
  const [yr1, setYr1] = useState<string>('');
  const [roi, setRoi] = useState<string>(
    previousData?.roi ? formattedRoi : offerData?.roi + ' %',
  );
  const [pincode, setPincode] = useState<string>('');
  const [mar, setMar] = useState<boolean>(false);
  const [adjustMargin, setAdjustMargin] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const [checkPincode, setCheckPincode] = useState<boolean>(false);
  // const dob = new Date();
  // const year = dob.getFullYear();
  // const month = dob.getMonth();
  // const day = dob.getDate();
  // const dob1 = new Date();
  // const year1 = dob.getFullYear();
  // const month1 = dob.getMonth();
  // const day1 = dob.getDate();
  // *********************************DatePicker***********************************************
  const updateDate = (selectedDate: any) => {
    setDt(moment(selectedDate).format('DD'));
    setMon(moment(selectedDate).format('MM'));
    setYr(moment(selectedDate).format('YYYY'));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    updateDate(date);
    hideDatePicker();
    setAdjustMargin(true);
    setErrorFromTenure(null);
  };

  // *********************************DatePicker***********************************************
  const updateDate1 = (selectedDate1: any) => {
    setDt1(moment(selectedDate1).format('DD'));
    setMon1(moment(selectedDate1).format('MM'));
    setYr1(moment(selectedDate1).format('YYYY'));
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date1: any) => {
    updateDate1(date1);
    setErrorToTenure(null);
    hideDatePicker1();
  };
  const _investAmountValidate = (mail: string) => {
    if (mail === '') {
      setErrorInvestAmount(VALIDATE_FORM.AMOUNT);
    } else {
      setErrorInvestAmount(null);
    }
  };
  const _roiValidate = (mail: string) => {
    if (mail === '') {
      setErrorRoi(VALIDATE_FORM.ROI);
    } else {
      setErrorRoi(null);
    }
  };

  async function checkPinCode(pin: any) {
    const body = {pincode: pin};
    try {
      const response = await getVerifyPinCode(body);
      if (response?.data?.status) {
        setErrorPinCode(response?.data?.message);
        setActive(false);
      } else {
        setErrorPinCode(response?.data?.message);
        setActive(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const _pinCodeValidate = (mail: string) => {
    var pinCodeRegex = /^[1-9][0-9]{5}$/;
    if (mail === '') {
      setErrorPinCode(VALIDATE_FORM.PINCODE);
      setCheckPincode(true);
      setActive(true);
      // @ts-ignore
    } else if (!pinCodeRegex.test(mail)) {
      setErrorPinCode('*Invalid PinCode');
      setCheckPincode(true);
      setActive(true);
    } else {
      setErrorPinCode(null);
      setCheckPincode(false);
      checkPinCode(mail);
    }
  };
  const isValidate = () => {
    let flag: boolean = true;
    if (pincode === '') {
      setErrorPinCode(VALIDATE_FORM.PINCODE);
      flag = false;
    }
    if (mar === false) {
      setErrorTerms(VALIDATE_FORM.TERMS_AND_CODITION);
      flag = false;
    } else {
      return flag;
    }
  };

  const _validateCash = () => {
    if (isValidate()) {
      navigation.navigate(
        PAYCASH,
        previousData.amount
          ? {previousData, pincode}
          : committeData?.committee_amount
          ? {
              committeData,
              pincode,
            }
          : committeEmiData?.committeeAmount
          ? {
              committeEmiData,
              pincode,
            }
          : {offerData, pincode},
      );
    }
  };

  const _onlinePay = () => {
    if (mar === false) {
      setErrorTerms(VALIDATE_FORM.TERMS_AND_CODITION);
    } else {
      navigation.navigate(ONLINEPAYMENT, {amount: investAmount});
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          title={
            committeData?.committee_amount
              ? 'Committe Payment'
              : 'Indivisual Investment'
          }
          isBack
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, margin: adjust(15)}}>
            <Text style={styles.labeltxt}>
              {committeData?.committee_amount
                ? 'Committe Amount'
                : 'Invest Amount'}
            </Text>
            <TextBox
              placeholder={'Select One'}
              style={styles.textbox}
              value={investAmount}
              setValue={setInvestAmount}
              containerStyle={styles.containerStyle}
              validate={_investAmountValidate}
              num
              editable={false}
            />
            {errorInvestAmount ? (
              <Text style={styles.errorTxt}>{errorInvestAmount}</Text>
            ) : null}
            {/* <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Select Tenure'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <>
                                <TouchableOpacity style={styles.dob} onPress={() => { showDatePicker() }}>
                                    {dt && mon && yr ?
                                        <Text style={[styles.txt, { color: COLORS.DARK, paddingLeft: 0 }]}>{`${dt} / ${mon}`}</Text> :
                                        <Text style={[styles.txt, { color: COLORS.GRAY, paddingLeft: 0 }]}>From</Text>
                                    }
                                    <Image source={Images.calender} />
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    // maximumDate={new Date(year - 18, month, day)}
                                />
                            </>
                            <>
                                <TouchableOpacity style={styles.dob} onPress={() => { showDatePicker1() }}>
                                    {dt1 && mon1 && yr1 ?
                                        <Text style={[styles.txt, { color: COLORS.DARK, paddingLeft: 0 }]}>{`${dt1} / ${mon1}`}</Text> :
                                        <Text style={[styles.txt, { color: COLORS.GRAY, paddingLeft: 0 }]}>To</Text>
                                    }
                                    <Image source={Images.calender} />
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible1}
                                    mode="date"
                                    onConfirm={handleConfirm1}
                                    onCancel={hideDatePicker1}
                                    // maximumDate={new Date(year1 - 18, month1, day1)}
                                />
                            </>
                        </View>
                        {(errorFromTenure || errorToTenure) &&
                            <View style={styles.errorView}>
                                {errorFromTenure ? <Text style={[styles.errorTxt, { top: 0 }]}>{errorFromTenure}</Text> : null}
                                {errorToTenure ? <Text style={[styles.errorTxt, { marginLeft: adjustMargin ? '55%' : '20%' }]}>{errorToTenure}</Text> : null}
                            </View>
                        } */}
            {committeData?.committee_amount ||
            committeEmiData?.committeeAmount ? null : (
              <Text style={[styles.labeltxt, {marginTop: adjust(5)}]}>
                {'ROI'}
              </Text>
            )}
            {committeData?.committee_amount ||
            committeEmiData?.committeeAmount ? null : (
              <View style={styles.roiView}>
                <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                  {roi}
                </Text>
              </View>
            )}
            {committeData?.committee_amount ||
            committeEmiData?.committeeAmount ? null : (
              <Text style={[styles.labeltxt, styles.labeltxt1]}>
                Geeting Amount
              </Text>
            )}
            {committeData?.committee_amount ||
            committeEmiData?.committeeAmount ? null : (
              <Text style={[styles.labeltxt, styles.labeltxt2]}>
                {previousData?.getAmount
                  ? formattedGetAmount
                  : `${'\u20B9'} ${offerData?.getAmount}`}
              </Text>
            )}
            <Text style={[styles.labeltxt, styles.labeltxt2]}>
              {'Check Serviceable Pincode'}
            </Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={pincode}
              setValue={setPincode}
              containerStyle={styles.containerStyle}
              validate={_pinCodeValidate}
              length={6}
              num
            />
            {errorPinCode ? (
              <Text
                style={[
                  styles.errorTxt,
                  {color: active ? COLORS.RED : 'green'},
                ]}>
                {errorPinCode}
              </Text>
            ) : null}
            <Text style={styles.serviceableText}>
              If Serviceable then Cash option will be Activated
            </Text>
            <TouchableOpacity
              style={styles.maritalBtn}
              onPress={() => {
                setMar(!mar);
              }}>
              <View
                style={[
                  styles.round,
                  {backgroundColor: mar == true ? COLORS.MAIN : COLORS.WHITE},
                ]}
              />
              <Text style={styles.maritalTxt}>{'Terms and condition'}</Text>
            </TouchableOpacity>
            {errorTerms && mar === false ? (
              <Text style={[styles.errorTxt, {marginTop: adjust(6)}]}>
                {errorTerms}
              </Text>
            ) : null}
          </View>
          <View style={styles.bottomView}>
            <CustomButton
              label="Pay Online"
              containerStyle={{width: '50%'}}
              onPress={_onlinePay}
            />
            <CustomButton
              label="Pay Through Cash"
              containerStyle={{width: '50%', marginLeft: '1%'}}
              style={{
                backgroundColor: active ? COLORS.GRAY_BACKGROUND : COLORS.MAIN,
              }}
              txtStyle={{color: active ? COLORS.BLACK : COLORS.WHITE}}
              press={() => _validateCash()}
              disabled={active}
            />
          </View>
        </ScrollView>
      </View>
      <CustomTabBar />
    </>
  );
};

export default IndivisualDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labeltxt: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    // marginTop: adjust(15),
    // marginLeft: adjust(25),
    fontWeight: '400',
  },
  labeltxt1: {
    marginTop: adjust(0),
  },
  labeltxt2: {
    marginTop: adjust(5),
  },
  textbox: {
    // width: adjust(270),
    height: adjust(40),
    fontSize: adjust(12),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
    backgroundColor: COLORS.WHITE,
  },
  textbox1: {
    width: adjust(110),
    height: adjust(40),
    fontSize: adjust(12),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
  },
  dob: {
    backgroundColor: COLORS.WHITE,
    height: adjust(40),
    width: '48%',
    // marginLeft: adjust(25),
    borderWidth: 1,
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: adjust(5),
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    padding: adjust(12),
    fontWeight: '400',
  },
  serviceableText: {
    // marginLeft: adjust(30),
    fontSize: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  round: {
    backgroundColor: COLORS.WHITE,
    height: adjust(15),
    width: adjust(15),
    borderRadius: 5,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
  maritalTxt: {
    fontSize: adjust(11),
    fontFamily: FONT_FAMILIES.REGULAR,
    color: COLORS.DARK,
  },
  maritalBtn: {
    flexDirection: 'row',
    height: adjust(15),
    width: adjust(140),
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor:'red',
    // marginLeft: adjust(25),
    marginTop: adjust(10),
  },
  bottomView: {
    flexDirection: 'row',
    // justifyContent:'space-evenly',
    height: Platform.OS === 'ios' ? adjust(220) : adjust(340),
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  bottomButtonView: {
    height: adjust(60),
    width: Platform.OS === 'ios' ? adjust(150) : adjust(150),
    backgroundColor: COLORS.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
  },
  containerStyle: {
    height: adjust(50),
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    top: adjust(-5),
  },
  errorView: {
    flexDirection: 'row',
    marginTop: adjust(2),
  },
  roiView: {
    backgroundColor: 'white',
    height: adjust(40),
    // width: adjust(70),
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    // marginLeft: adjust(9),
    marginBottom: adjust(9),
  },
  text: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(10),
    marginBottom: adjust(2),
    marginLeft: adjust(10),
    fontSize: adjust(11),
    fontWeight: '400',
    color: COLORS.BLACK,
  },
});
