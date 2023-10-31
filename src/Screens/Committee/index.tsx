import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/ReusableComponent/Header';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Images} from '@/Assets';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import TextBox from '@/Component/TextBox';
import adjust from '@/Component/adjust';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import CustomButton from '@/Component/CustomButton';
import {useGetCommitteeListingQuery} from '@/Redux/services/committee';
import RenderHTML from 'react-native-render-html';
import Loader from '@/ReusableComponent/Loader';
import NewCommittee from './NewCommittee';
import MyCommittee from './MyCommittee';
const {PAYCASH} = SCREENS;
const Committee = (props: any) => {
  const {navigation} = props;
  const [investAmount, setInvestAmount] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const {data, isLoading} = useGetCommitteeListingQuery<any>('');
  // const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  // const [dt, setDt] = useState<string>('DD');
  // const [mon, setMon] = useState<string>('');
  // const [yr, setYr] = useState<string>('');
  // const [isDatePickerVisible1, setDatePickerVisibility1] = useState<boolean>(false);
  // const [dt1, setDt1] = useState<string>('DD');
  // const [mon1, setMon1] = useState<string>('');
  // const [yr1, setYr1] = useState<string>('');
  // const [mar, setMar] = useState<boolean>(false);
  // const [errorInvestAmount, setErrorInvestAmount] = useState<string | null>(null);
  // const [errorFromTenure, setErrorFromTenure] = useState<string | null>(null);
  // const [errorToTenure, setErrorToTenure] = useState<string | null>(null);
  // const [errorTerms, setErrorTerms] = useState<string | null>(null);
  // const [errorSpace, setErrorSpace] = useState<boolean>(false);
  type CommitteeType = {
    id: number;
    description: string;
    amount: number;
    duration: number;
    name: string;
  };
  const listing: [CommitteeType] = data?.data;
  // useEffect(() => {
  //   if (purchaseSuccess) {
  //     console.log("Purchased Data", purchaseData)
  //     // setLoading(false);
  //     const msg = JSON.stringify(purchaseData?.message);
  //     showMessage({
  //       message: purchaseData?.message,
  //       type: purchaseData.status ? 'success' : 'danger',
  //     });
  //     console.log('listingDataAfterpurchaseCommittee', listing)
  //     navigation.navigate(PAYCASH);
  //   }
  // }, [purchaseSuccess]);
  // const dob = new Date();
  // const year = dob.getFullYear();
  // const month = dob.getMonth();
  // const day = dob.getDate();
  // const dob1 = new Date();
  // const year1 = dob.getFullYear();
  // const month1 = dob.getMonth();
  // const day1 = dob.getDate();
  // *********************************DatePicker***********************************************
  // const updateDate = (selectedDate: any) => {
  //   setDt(moment(selectedDate).format('DD'));
  //   setMon(moment(selectedDate).format('MM'));
  //   setYr(moment(selectedDate).format('YYYY'));
  // }

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date: any) => {
  //   updateDate(date);
  //   setErrorFromTenure(null);
  //   setErrorSpace(true);
  //   hideDatePicker();
  // };

  // // *********************************DatePicker***********************************************
  // const updateDate1 = (selectedDate1: any) => {
  //   setDt1(moment(selectedDate1).format('DD'));
  //   setMon1(moment(selectedDate1).format('MM'));
  //   setYr1(moment(selectedDate1).format('YYYY'));
  // }

  // const showDatePicker1 = () => {
  //   setDatePickerVisibility1(true);
  // };

  // const hideDatePicker1 = () => {
  //   setDatePickerVisibility1(false);
  // };

  // const handleConfirm1 = (date1: any) => {
  //   updateDate1(date1);
  //   setErrorToTenure(null)
  //   hideDatePicker1();
  // };
  // const _investAmountValidate = (mail: string) => {
  //   if (mail === '') {
  //     setErrorInvestAmount(VALIDATE_FORM.AMOUNT);
  //   } else {
  //     setErrorInvestAmount(null);
  //   }
  // };
  // const isValidate = () => {
  //   let flag: boolean = true;
  //   if (investAmount === '') {
  //     setErrorInvestAmount(VALIDATE_FORM.AMOUNT);
  //     flag = false;
  //   } if (dt === 'DD') {
  //     setErrorFromTenure(VALIDATE_FORM.FROMTENURE);
  //     flag = false;
  //   } if (dt1 === 'DD') {
  //     setErrorToTenure(VALIDATE_FORM.TOTENURE);
  //     flag = false;
  //   } if (mar === false) {
  //     setErrorTerms(VALIDATE_FORM.TERMS_AND_CODITION)
  //   }
  //   else {
  //     return flag;
  //   }
  // }
  // const _validateCash = () => {
  //   if (isValidate()) {
  //     navigation.navigate(PAYCASH)
  //   }
  // }

  const tagStyles = {
    ul: {
      fontSize: adjust(10),
      fontFamily: FONT_FAMILIES.AMERETTO,
      color: COLORS.DARK,
      paddingLeft: adjust(21),
    },
    li: {
      fontSize: adjust(10),
      fontFamily: FONT_FAMILIES.AMERETTO,
      color: COLORS.DARK,
    },
  };
  const purchaseCommittee = async (itemData: any) => {
    navigation.navigate(PAYCASH, {
      committee_id: itemData.id,
      committee_amount: itemData.amount,
      naviName: 'committee',
    });
  };
  // return (
  //   <View style={styles.container}>
  //     <Header title='Raavila Committee' isBack />
  //     <ScrollView showsVerticalScrollIndicator={false}>
  //       <View style={{ flex: 1, margin: adjust(20) }}>
  //         <Text style={styles.labeltxt}>{'Enter Amount'}</Text>
  //         <TextBox placeholder={'Enter Here'} style={styles.textbox} value={investAmount} setValue={setInvestAmount} containerStyle={styles.containerStyle} validate={_investAmountValidate} num />
  //         {errorInvestAmount ? <Text style={styles.errorTxt}>{errorInvestAmount}</Text> : null}
  //         <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Select Tenure'}</Text>
  //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //           <>
  //             <TouchableOpacity style={styles.dob} onPress={() => { showDatePicker() }}>
  //               {dt && mon && yr ?
  //                 <Text style={[styles.txt, { color: COLORS.DARK, paddingLeft: 0 }]}>{`${dt} / ${mon}`}</Text> :
  //                 <Text style={[styles.txt, { color: COLORS.GRAY, paddingLeft: 0 }]}>From</Text>
  //               }
  //               <Image source={Images.calender} />
  //             </TouchableOpacity>
  //             {/* {erDob ? <Text style={[styles.errorTxt, { top: 0 }]}>{erDob}</Text> : null} */}
  //             <DateTimePickerModal
  //               isVisible={isDatePickerVisible}
  //               mode="date"
  //               onConfirm={handleConfirm}
  //               onCancel={hideDatePicker}
  //             // maximumDate={new Date(year - 18, month, day)}
  //             />
  //           </>
  //           <>
  //             <TouchableOpacity style={styles.dob} onPress={() => { showDatePicker1() }}>
  //               {dt1 && mon1 && yr1 ?
  //                 <Text style={[styles.txt, { color: COLORS.DARK, paddingLeft: 0 }]}>{`${dt1} / ${mon1}`}</Text> :
  //                 <Text style={[styles.txt, { color: COLORS.GRAY, paddingLeft: 0 }]}>To</Text>
  //               }
  //               <Image source={Images.calender} />
  //             </TouchableOpacity>
  //             {/* {erDob ? <Text style={[styles.errorTxt, { top: 0 }]}>{erDob}</Text> : null} */}
  //             <DateTimePickerModal
  //               isVisible={isDatePickerVisible1}
  //               mode="date"
  //               onConfirm={handleConfirm1}
  //               onCancel={hideDatePicker1}
  //             // maximumDate={new Date(year1 - 18, month1, day1)}
  //             />
  //           </>
  //         </View>
  //         {(errorFromTenure || errorToTenure) &&
  //           <View style={styles.errorView}>
  //             {errorFromTenure ? <Text style={[styles.errorTxt, { top: 0 }]}>{errorFromTenure}</Text> : null}
  //             {errorToTenure ? <Text style={[styles.errorTxt, { marginLeft: errorSpace ? '55%' : '20%' }]}>{errorToTenure}</Text> : null}
  //           </View>
  //         }
  //         <TouchableOpacity style={styles.maritalBtn} onPress={() => { setMar(!mar) }}>
  //           <View style={[styles.round, { backgroundColor: mar == true ? COLORS.MAIN : COLORS.WHITE }]} />
  //           <Text style={styles.maritalTxt}>{'Terms and condition'}</Text>
  //         </TouchableOpacity>
  //         {(errorTerms && mar === false) ? <Text style={[styles.errorTxt, { marginTop: adjust(3) }]}>{errorTerms}</Text> : null}
  //         <View style={styles.boxView}>
  //           <Text style={styles.boxText}>details</Text>
  //         </View>
  //       </View>
  //       <View style={styles.bottomView}>
  //         <CustomButton label='Pay Online' containerStyle={{ width: '50%' }} />
  //         <CustomButton label='Pay Through Cash' containerStyle={{ width: '50%', marginLeft: '1%' }} press={() => _validateCash()} />
  //       </View>
  //     </ScrollView>
  //   </View>
  // )
  return (
    <View style={styles.container}>
      <Header title="Raavila Committee" isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.WHITE : COLORS.MAIN},
            ]}
            onPress={() => setActive(false)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.MAIN : COLORS.WHITE},
              ]}>
              {'New Committee'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.MAIN : COLORS.WHITE},
            ]}
            onPress={() => setActive(true)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.WHITE : COLORS.MAIN},
              ]}>
              {'My Committee'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {!active ? (
            // <CashForm params={params} setActive={setActive} />
            <NewCommittee />
          ) : (
            // <CashStatus params={params} />
            <MyCommittee />
          )}
        </View>
      </ImageBackground>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, margin: adjust(20) }}>
          {listing?.map((committee: CommitteeType) => {
            const HTML: any = {
              html: committee?.description,
            };
            return (
              <View key={committee.id} style={styles.boxView}>
                <Text style={styles.txt}>{committee.name}</Text>
                <View style={styles.rowView}>
                  <Text style={styles.valueText}>{`${'\u20B9'} ${committee.amount}/month`}</Text>
                  <Text style={[styles.valueText, { marginRight: adjust(10) }]}>{`${committee.duration} months`}</Text>
                </View>
                <RenderHTML
                  source={HTML}
                  contentWidth={adjust(100)}
                  tagsStyles={tagStyles}
                />
                <TouchableOpacity onPress={() => { purchaseCommittee(committee) }}>
                  <View style={styles.bottomView}>
                    <Text style={styles.investNowText}>Invest Now</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </ScrollView>*/}
      <Loader loading={isLoading} />
    </View>
  );
};

export default Committee;

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
    marginTop: adjust(10),
  },
  textbox: {
    // width: adjust(270),
    height: adjust(40),
    fontSize: adjust(10),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
    backgroundColor: COLORS.WHITE,
  },
  textbox1: {
    width: adjust(110),
    height: adjust(40),
    fontSize: adjust(10),
    marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
  },
  dob: {
    backgroundColor: COLORS.WHITE,
    height: adjust(45),
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
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  valueText: {
    color: COLORS.DARK,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    // marginTop: adjust(10),
    fontWeight: '400',
  },
  containerStyle: {
    height: adjust(50),
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
    marginTop: adjust(15),
  },
  boxView: {
    height: adjust(160),
    marginBottom: adjust(10),
    borderRadius: 10,
    // width: adjust(260),
    backgroundColor: COLORS.WHITE,
    // marginLeft: adjust(30),
    // marginTop: adjust(20)
  },
  boxText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
    color: COLORS.BLACK,
    fontWeight: '400',
    marginTop: adjust(30),
    marginLeft: adjust(30),
  },
  bottomView: {
    backgroundColor: COLORS.MAIN,
    height: adjust(35),
    marginTop: adjust(9),
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  investNowText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    // marginTop: adjust(10),
    fontWeight: '400',
  },
  bottomButtonView: {
    height: adjust(60),
    width: Platform.OS === 'ios' ? adjust(153) : adjust(155),
    backgroundColor: COLORS.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  errorView: {
    flexDirection: 'row',
    marginTop: adjust(2),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: adjust(25),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.DARK,
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: COLORS.BORDER_COLOR,
  },
  headerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: adjust(157),
    width: '50%',
  },
  main: {
    flex: 1,
    // margin: adjust(20),
  },
  bgImg: {
    flex: 1,
  },
});
