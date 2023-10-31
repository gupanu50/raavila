import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from 'header';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import TextBox from '@/Component/TextBox';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import CustomTabBar from '@/Component/CustomTabBar';
import {
  useGetPlanByTypeQuery,
  useGetPlanByTypeMutation,
} from '@/Redux/services/investments';
import Loader from '@/ReusableComponent/Loader';
import RoiMonthly from '@/Component/RoiMonthly';
const {ENTERPRISEDETAILS} = SCREENS;
import {Plan, roi} from '@/Types';

const Indivisual = (props: any) => {
  const {route} = props;
  console.log('Params', route);
  const [getPlans, result] = useGetPlanByTypeMutation();

  const body = {plan_type: route?.params[0]?.investmet_type};
  async function callData() {
    await getPlans(body);
  }
  useEffect(() => {
    callData();
  }, []);

  // console.log('Error in Data', result?.data?.data);
  const {navigation}: any = props;

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [planKey, setPlanKey] = useState<number>(0);
  const [amount, setAmount] = useState<number|null>(null);
  const [getAmount1, setGetAmount1] = useState<number | string>('Enter Amount');
  const [errorAmount, setErrorAmount] = useState<string | null>(null);
  const [getAmount3, setGetAmount3] = useState<number | string>('Enter Amount');
  const [getAmount2, setGetAmount2] = useState<roi>({
    one: 0,
    two: 0,
    first: 0,
    second: 0,
    third: 0,
    four: 0,
  });

  const planArray: Plan[] | undefined = result?.data?.data;
  return (
    <View style={styles.container}>
      <Header title={'Enterprise Investment'} isBack />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {planArray?.map((plan: Plan) => {
            // const _dailyAmountValidate = (mail: string | number) => {
            //   if (mail === '') {
            //     setErrorDailyAmount(VALIDATE_FORM.AMOUNT);
            //   } else if (plan.plan_range_to < mail) {
            //     setErrorDailyAmount('*Please enter amount in range');
            //   } else if (plan.plan_range_from > mail) {
            //     setErrorDailyAmount('*Please enter amount in range');
            //   } else {
            //     setErrorDailyAmount(null);
            //   }
            // };

            // const handleInvestmentAmountChange = (
            //   value: string,
            //   plan: Plan,
            // ) => {
            //   console.log('======plannnnn=====>', plan?.id);
            //   plan?.id === planKey && setAmount(Number(value));
            //   calculateReturns(plan);
            // };

            // const _validateDailyReturn = () => {
            //   setPlanKey(plan?.id);
            //   if (planKey === plan?.id && isValidateDailyReturn()) {
            //     navigation.navigate(INDIVISUALDETAILS);
            //   }
            // };

            // const isValidateDailyReturn = () => {
            //   let flag: boolean = true;
            //   if (plan?.id === planKey && amount === null) {
            //     setErrorAmount(VALIDATE_FORM.AMOUNT);
            //     flag = false;
            //   } else {
            //     return flag;
            //   }
            // };

            function _validateAmount() {
              let flag = false;
              if (plan?.id === planKey) {
                flag = true;
                if (amount === null) {
                  setErrorAmount(VALIDATE_FORM.AMOUNT);
                  flag = false;
                } else if (errorAmount !== null) {
                  setErrorAmount(
                    errorAmount ? errorAmount : VALIDATE_FORM.AMOUNT,
                  );
                  flag = false;
                }
              }
              return flag;
            }

            function _investAmount() {
              if (_validateAmount()) {
                var currentPlan: any;
                if (plan?.id === planKey) {
                  currentPlan = plan;
                }
                let roi;
                if (selectedItem === '1') {
                  roi = [currentPlan?.daily_roi];
                } else if (selectedItem === '3') {
                  roi = [currentPlan?.yearly_roi];
                } else if (selectedItem === '2') {
                  // roi = `${currentPlan?.montly_roi_one}, ${currentPlan?.montly_roi_two}, ${currentPlan?.montly_roi_0_3}, ${currentPlan?.montly_roi_4_6}, ${currentPlan?.montly_roi_7_9}, ${currentPlan?.montly_roi_10_12}`;
                  roi = [
                    currentPlan?.montly_roi_one !== 0
                      ? currentPlan?.montly_roi_one
                      : null,
                    currentPlan?.montly_roi_two !== 0
                      ? currentPlan?.montly_roi_two
                      : null,
                    currentPlan?.montly_roi_0_3 !== 0
                      ? currentPlan?.montly_roi_0_3
                      : null,
                    currentPlan?.montly_roi_4_6 !== 0
                      ? currentPlan?.montly_roi_4_6
                      : null,
                    currentPlan?.montly_roi_7_9 !== 0
                      ? currentPlan?.montly_roi_7_9
                      : null,
                    currentPlan?.montly_roi_10_12 !== 0
                      ? currentPlan?.montly_roi_10_12
                      : null,
                  ];
                }

                let amountGet;
                if (selectedItem === '1') {
                  amountGet = [getAmount1];
                } else if (selectedItem === '3') {
                  amountGet = [getAmount3];
                } else if (selectedItem === '2') {
                  // amountGet = `${currentPlan?.montly_roi_one}, ${currentPlan?.montly_roi_two}, ${currentPlan?.montly_roi_0_3}, ${currentPlan?.montly_roi_4_6}, ${currentPlan?.montly_roi_7_9}, ${currentPlan?.montly_roi_10_12}`;
                  amountGet = [
                    currentPlan?.montly_roi_one !== 0 ? getAmount2.one : null,
                    currentPlan?.montly_roi_two !== 0 ? getAmount2.two : null,
                    currentPlan?.montly_roi_0_3 !== 0 ? getAmount2.first : null,
                    currentPlan?.montly_roi_4_6 !== 0
                      ? getAmount2.second
                      : null,
                    currentPlan?.montly_roi_7_9 !== 0 ? getAmount2.third : null,
                    currentPlan?.montly_roi_10_12 !== 0
                      ? getAmount2.four
                      : null,
                  ];
                }

                navigation.navigate(ENTERPRISEDETAILS, {
                  enterprise: route?.params[1],
                  amount: amount,
                  id: currentPlan?.id,
                  type: currentPlan?.type,
                  for: selectedItem,
                  roi: roi,
                  getamount: amountGet,
                });
                setAmount(null)
              } else {
                alert('Please enter req. details to continue!!');
              }
            }

            const calculateReturns = (plan: Plan, amount: any) => {
              var currentPlan;
              if (plan?.id === planKey) {
                currentPlan = plan;
              }
              // Perform the calculation here
              // You can use the same logic from the previous example
              const minimumInvestment = Number(currentPlan?.plan_range_from);
              const maximumInvestment = Number(currentPlan?.plan_range_to);
              const tenure = Number(currentPlan?.withdrawal_lock_in_period);

              let flag = true;
              if (minimumInvestment > Number(amount)) {
                flag = false;
                setErrorAmount('*Invalid Amount');
              } else if (maximumInvestment < Number(amount)) {
                flag = false;
                setErrorAmount('*Invalid Amount');
              } else {
                flag = true;
                setErrorAmount(null);
              }

              const daily_roi = Number(currentPlan?.daily_roi);
              const yearlyInterestRate = Number(currentPlan?.yearly_roi);

              let greetingAmount1: any = 0;
              let greetingAmount3: any = 0;
              if (flag) {
                // Daily Returns
                greetingAmount1 = ((amount * (daily_roi / 100)) / 30).toFixed(
                  2,
                );
                // Yearly Returns - 13+ months
                greetingAmount3 = (
                  amount *
                  (yearlyInterestRate / 100) *
                  12
                ).toFixed(2);
              }
              return (
                setGetAmount1(greetingAmount1), setGetAmount3(greetingAmount3)
              );
            };

            return (
              <View style={styles.boxView} key={plan.plan_name}>
                <Text style={styles.text}>{plan.plan_name}</Text>
                <Text style={styles.text1}>{`${'\u20B9'}${
                  plan.plan_range_from
                } - ${'\u20B9'}${plan.plan_range_to}`}</Text>
                <View style={[styles.radioButtonView, {}]}>
                  <TouchableOpacity
                    style={styles.radioBtn}
                    onPress={() => {
                      setSelectedItem('1'), setPlanKey(plan?.id);
                    }}>
                    <View
                      style={[
                        styles.radioView,
                        {
                          borderColor:
                            plan?.id === planKey && selectedItem === '1'
                              ? COLORS.MAIN
                              : COLORS.BORDER_COLOR,
                          borderWidth:
                            plan?.id === planKey && selectedItem === '1'
                              ? 5
                              : 1,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.text,
                        {marginTop: 0, marginBottom: 0, marginLeft: adjust(4)},
                      ]}>
                      {'Daily'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioBtn}
                    onPress={() => {
                      setSelectedItem('2'), setPlanKey(plan?.id);
                    }}>
                    <View
                      style={[
                        styles.radioView,
                        {
                          borderColor:
                            plan?.id === planKey && selectedItem === '2'
                              ? COLORS.MAIN
                              : COLORS.BORDER_COLOR,
                          borderWidth:
                            plan?.id === planKey && selectedItem === '2'
                              ? 5
                              : 1,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.text,
                        {marginTop: 0, marginBottom: 0, marginLeft: adjust(4)},
                      ]}>
                      {'Monthly'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioBtn}
                    onPress={() => {
                      setSelectedItem('3'), setPlanKey(plan?.id);
                    }}>
                    <View
                      style={[
                        styles.radioView,
                        {
                          borderColor:
                            plan?.id === planKey && selectedItem === '3'
                              ? COLORS.MAIN
                              : COLORS.BORDER_COLOR,
                          borderWidth:
                            plan?.id === planKey && selectedItem === '3'
                              ? 5
                              : 1,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.text,
                        {marginTop: 0, marginBottom: 0, marginLeft: adjust(4)},
                      ]}>
                      {'Yearly'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={styles.text}>{`\u2022 Limit ranges from ${'\u20B9'}${
                  plan.plan_range_from
                } to ${'\u20B9'}${plan.plan_range_to}`}</Text>
                <Text
                  style={[
                    styles.text,
                    {marginTop: adjust(0)},
                  ]}>{`\u2022 Withdrawal Lock-in Period: ${plan.withdrawal_lock_in_period} Month`}</Text>
                <Text style={styles.labeltxt}>{'Invest Amount'}</Text>
                <View style={[styles.roiView, {width: adjust(130)}]}>
                  <TextInput
                    style={styles.textbox}
                    placeholder={`${'\u20B9'} 1,54,700`}
                    placeholderTextColor={'grey'}
                    autoCapitalize="none"
                    value={planKey === plan?.id?amount:null}
                    keyboardType='number-pad'
                    onChangeText={(txt: any) => {
                      setPlanKey(plan?.id),
                        setAmount(txt),
                        calculateReturns(plan, txt);
                    }}
                  />
                </View>
                {planKey === plan?.id && errorAmount ? (
                  <Text style={styles.errorTxt}>{errorAmount}</Text>
                ) : null}
                {selectedItem === '1' && plan?.id === planKey ? (
                  plan?.daily_roi !== '0' && (
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Text
                          style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
                          {'ROI'}
                        </Text>
                        <View style={styles.roiView}>
                          <Text
                            style={[
                              styles.text,
                              {marginTop: 0, marginBottom: 0},
                            ]}>
                            {plan.daily_roi} %
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={[styles.text4, {marginTop: adjust(5)}]}>
                          Geting Amount
                        </Text>
                        <Text style={[styles.text4, {marginTop: adjust(0)}]}>
                          {'\u20B9'} {getAmount1}
                        </Text>
                      </View>
                    </View>
                  )
                ) : selectedItem === '2' && plan?.id === planKey ? (
                  <RoiMonthly
                    plan={plan}
                    amount={amount}
                    getAmount={getAmount2}
                    setGet={setGetAmount2}
                  />
                ) : selectedItem === '3' && plan?.id === planKey ? (
                  plan?.yearly_roi !== '0' && (
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Text
                          style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
                          {'ROI'}
                        </Text>
                        <View style={styles.roiView}>
                          <Text
                            style={[
                              styles.text,
                              {marginTop: 0, marginBottom: 0},
                            ]}>
                            {plan.yearly_roi} %
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={[styles.text4, {marginTop: adjust(5)}]}>
                          Geting Amount
                        </Text>
                        <Text style={[styles.text4, {marginTop: adjust(0)}]}>
                          {'\u20B9'} {getAmount3}
                        </Text>
                      </View>
                    </View>
                  )
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text
                        style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
                        {'ROI'}
                      </Text>
                      <View style={[styles.roiView, {width: adjust(130)}]}>
                        <Text
                          style={[
                            styles.text,
                            {marginTop: 0, marginBottom: 0, color: 'red'},
                          ]}>
                          {'Please Select Tenure type'}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.text4, {marginTop: adjust(5)}]}>
                        Geting Amount
                      </Text>
                      <Text style={[styles.text4, {marginTop: adjust(0)}]}>
                        {'\u20B9'} {'0'}
                      </Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => _investAmount()}>
                  <View style={styles.bottomView}>
                    <Text style={styles.text3}>Invest Now</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <CustomTabBar />
      <Loader loading={result.isLoading} />
    </View>
  );
};

export default Indivisual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(15),
    // alignItems: 'center'
  },
  boxView: {
    // height: adjust(301),
    // width: adjust(280),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY,
    // marginTop: adjust(15),
    marginVertical: adjust(5),
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
  text1: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(10),
    fontSize: adjust(13),
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  text2: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(10),
    fontSize: adjust(10),
    fontWeight: '400',
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
  },
  text4: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(10),
    marginBottom: adjust(5),
    marginLeft: adjust(20),
    fontSize: adjust(14),
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  labeltxt: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(5),
    marginLeft: adjust(10),
  },
  textbox: {
    width: adjust(214),
    height: adjust(35),
    fontSize: adjust(12),
    marginLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
  },
  textbox1: {
    width: adjust(94),
    height: adjust(35),
    fontSize: adjust(12),
    marginLeft: adjust(10),
    borderColor: COLORS.GRAY,
  },
  bottomView: {
    backgroundColor: COLORS.MAIN,
    height: adjust(35),
    // width: adjust(280),
    marginTop: adjust(15),
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    color: COLORS.WHITE,
    fontSize: adjust(15),
  },
  containerStyle: {
    height: adjust(40),
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    marginLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  radioButtonView: {
    height: adjust(45),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: adjust(6),
  },
  roiView: {
    backgroundColor: 'white',
    height: adjust(27),
    width: adjust(70),
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: adjust(9),
  },
  radioBtn: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: adjust(5),
  },
  radioView: {
    height: adjust(14),
    width: adjust(14),
    borderRadius: adjust(14 / 2),
    backgroundColor: 'white',
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
});

// import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useMemo, useState } from 'react'
// import TextBox from '@/Component/TextBox'
// import adjust from '@/Component/adjust'
// import Header from '@/ReusableComponent/Header'
// import { COLORS, FONT_FAMILIES } from '@/Configration'
// import { SCREENS, VALIDATE_FORM } from '@/Constant'
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import CustomTabBar from '@/Component/CustomTabBar'
// const { ENTERPRISEVALIDATE } = SCREENS
// const Business = (props: any) => {
//   const { navigation } = props;
//   const [investDailyAmount, setInvestDailyAmount] = useState<string>('');
//   const [investMonthlyAmount, setInvestMonthlyAmount] = useState<string>('');
//   const [investYearlyAmount, setInvestYearlyAmount] = useState<string>('');
//   const [roiDaily, setRoiDaily] = useState<string>('');
//   const [roiMonthly, setRoiMonthly] = useState<string>('');
//   const [roiYearly, setRoiYearly] = useState<string>('');
//   const [investBillionAmount, setInvestBillionAmount] = useState<string>('');
//   const [roiBillion, setRoiBillion] = useState<string>('');
//   const [errorDailyAmount, setErrorDailyAmount] = useState<string | null>(null);
//   const [errorMonthlyAmount, setErrorMonthlyAmount] = useState<string | null>(null);
//   const [errorYearlyAmount, setErrorYearlyAmount] = useState<string | null>(null);
//   const [errorDailyRoi, setErrorDailyRoi] = useState<string | null>(null);
//   const [errorMonthlyRoi, setErrorMonthlyRoi] = useState<string | null>(null);
//   const [errorYearlyRoi, setErrorYearlyRoi] = useState<string | null>(null);
//   const [selectedIdRangers, setSelectedIdRangers] = useState<string | undefined>();
//   const [selectedIdAvengers, setSelectedIdAvengers] = useState<string | undefined>();
//   const [selectedIdMoney, setSelectedIdMoney] = useState<string | undefined>();
//   const [selectedIdBillion, setSelectedIdBillion] = useState<string | undefined>();
//   const [errorBillion, setErrorBillion] = useState<string | null>(null);
//   const [errorBillionAmount, setErrorBillionAmount] = useState<string | null>(null);
//   const _dailyAmountValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorDailyAmount(VALIDATE_FORM.AMOUNT);
//     } else {
//       setErrorDailyAmount(null);
//     }
//   };
//   const _monthlyAmountValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorMonthlyAmount(VALIDATE_FORM.AMOUNT);
//     } else {
//       setErrorMonthlyAmount(null);
//     }
//   };
//   const _yearlyAmountValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorYearlyAmount(VALIDATE_FORM.AMOUNT);
//     } else {
//       setErrorYearlyAmount(null);
//     }
//   };
//   const _dailyRoiValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorDailyRoi(VALIDATE_FORM.ROI);
//     } else {
//       setErrorDailyRoi(null);
//     }
//   };
//   const _monthlyRoiValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorMonthlyRoi(VALIDATE_FORM.ROI);
//     } else {
//       setErrorMonthlyRoi(null);
//     }
//   };
//   const _yearlyRoiValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorYearlyRoi(VALIDATE_FORM.ROI);
//     } else {
//       setErrorYearlyRoi(null);
//     }
//   };
//   const _billionAmountValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorBillionAmount(VALIDATE_FORM.ROI);
//     } else {
//       setErrorBillionAmount(null);
//     }
//   };
//   const _billionRoiValidate = (mail: string) => {
//     if (mail === '') {
//       setErrorBillion(VALIDATE_FORM.ROI);
//     } else {
//       setErrorBillion(null);
//     }
//   };
//   const isValidateDailyReturn = () => {
//     let flag: boolean = true;
//     if (investDailyAmount === '') {
//       setErrorDailyAmount(VALIDATE_FORM.AMOUNT);
//       flag = false;
//     } if (roiDaily === '') {
//       setErrorDailyRoi(VALIDATE_FORM.ROI);
//       flag = false;
//     }
//     else {
//       return flag;
//     }
//   }
//   const isValidateMonthlyReturn = () => {
//     let flag: boolean = true;
//     if (investMonthlyAmount === '') {
//       setErrorMonthlyAmount(VALIDATE_FORM.AMOUNT);
//       flag = false;
//     } if (roiMonthly === '') {
//       setErrorMonthlyRoi(VALIDATE_FORM.ROI);
//       flag = false;
//     }
//     else {
//       return flag;
//     }
//   }
//   const isValidateYearlyReturn = () => {
//     let flag: boolean = true;
//     if (investYearlyAmount === '') {
//       setErrorYearlyAmount(VALIDATE_FORM.AMOUNT);
//       flag = false;
//     } if (roiYearly === '') {
//       setErrorYearlyRoi(VALIDATE_FORM.ROI);
//       flag = false;
//     }
//     else {
//       return flag;
//     }
//   }
//   const isValidateBillion = () => {
//     let flag: boolean = true;
//     if (investBillionAmount === '') {
//       setErrorBillionAmount(VALIDATE_FORM.AMOUNT);
//       flag = false;
//     } if (roiBillion === '') {
//       setErrorBillion(VALIDATE_FORM.ROI);
//       flag = false;
//     }
//     else {
//       return flag;
//     }
//   }
//   const _validateBillion = () => {
//     if (isValidateBillion()) {
//       navigation.navigate(ENTERPRISEVALIDATE)
//     }
//   }
//   const radioButtons: RadioButtonProps[] = useMemo(() => ([
//     {
//       id: '1',
//       label: 'Daily',
//       value: 'daily',
//       size: 15,
//       labelStyle: { fontFamily: FONT_FAMILIES.AMERETTO },
//       borderSize: 1,
//       borderColor: COLORS.GRAY,
//       color: COLORS.DARK,
//     },
//     {
//       id: '2',
//       label: 'Monthly',
//       value: 'monthly',
//       size: 15,
//       labelStyle: { fontFamily: FONT_FAMILIES.AMERETTO },
//       borderSize: 1,
//       borderColor: COLORS.GRAY,
//       color: COLORS.DARK
//     },
//     {
//       id: '3',
//       label: 'Yearly',
//       value: 'yearly',
//       size: 15,
//       labelStyle: { fontFamily: FONT_FAMILIES.AMERETTO },
//       borderSize: 1,
//       borderColor: COLORS.GRAY,
//       color: COLORS.DARK
//     },
//   ]), []);
//   const _validateDailyReturn = () => {
//     if (isValidateDailyReturn()) {
//       navigation.navigate(ENTERPRISEVALIDATE)
//     }
//   }
//   const _validateMonthlyReturn = () => {
//     if (isValidateMonthlyReturn()) {
//       navigation.navigate(ENTERPRISEVALIDATE)
//     }
//   }
//   const _validateYearlyReturn = () => {
//     if (isValidateYearlyReturn()) {
//       navigation.navigate(ENTERPRISEVALIDATE)
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Header title={'Enterprise Investment'} isBack />
//         <View style={styles.main}>
//           <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//             <View style={styles.boxView}>
//               <Text style={styles.text}>Rangers club</Text>
//               <Text style={styles.text1}>{`${'\u20B9'}50,000 - ${'\u20B9'}2,50,000`}</Text>
//               <View style={styles.radioButtonView}>
//                 <RadioGroup
//                   radioButtons={radioButtons}
//                   onPress={setSelectedIdRangers}
//                   selectedId={selectedIdRangers}
//                   layout='row'
//                 />
//               </View>
//               <Text style={styles.text}>{`\u2022 Limit ranges from ${'\u20B9'}50,000 to ${'\u20B9'}2,50,000`}</Text>
//               <Text style={[styles.text, { marginTop: adjust(0) }]}>{`\u2022 Withdrawal Lock-in Period: 1 Month`}</Text>
//               <Text style={styles.labeltxt}>{'Invest Amount'}</Text>
//               <TextBox placeholder={`${'\u20B9'} 1,54,700`} style={styles.textbox} value={investDailyAmount} setValue={setInvestDailyAmount} containerStyle={styles.containerStyle} validate={_dailyAmountValidate} num />
//               {errorDailyAmount ? <Text style={styles.errorTxt}>{errorDailyAmount}</Text> : null}
//               <View style={{ flexDirection: 'row' }}>
//                 <View>
//                   <Text style={[styles.labeltxt, { marginBottom: adjust(0) }]}>{'ROI'}</Text>
//                   <TextBox placeholder={'10%'} style={styles.textbox1} value={roiDaily} setValue={setRoiDaily} containerStyle={styles.containerStyle} validate={_dailyRoiValidate} num />
//                   {errorDailyRoi ? <Text style={styles.errorTxt}>{errorDailyRoi}</Text> : null}
//                 </View>
//                 <View>
//                   <Text style={[styles.text4, { marginTop: adjust(5) }]}>Geeting Amount</Text>
//                   <Text style={[styles.text4, { marginTop: adjust(0) }]}>{'\u20B9'} 15,47,000</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => _validateDailyReturn()}>
//                 <View style={styles.bottomView}>
//                   <Text style={styles.text3}>Invest Now</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={[styles.boxView, { marginTop: (errorDailyAmount || errorDailyRoi) ? adjust(35) : adjust(15) }]}>
//               <Text style={styles.text}>Avengers Club</Text>
//               <Text style={styles.text1}>{`${'\u20B9'}50,000 - ${'\u20B9'}2,50,000`}</Text>
//               <View style={styles.radioButtonView}>
//                 <RadioGroup
//                   radioButtons={radioButtons}
//                   onPress={setSelectedIdAvengers}
//                   selectedId={selectedIdAvengers}
//                   layout='row'
//                 />
//               </View>
//               <Text style={styles.text}>{`\u2022 Limit ranges from ${'\u20B9'}50,000 to ${'\u20B9'}2,50,000`}</Text>
//               <Text style={[styles.text, { marginTop: adjust(0) }]}>{`\u2022 Withdrawal Lock-in Period: 1 Month`}</Text>
//               <Text style={styles.labeltxt}>{'Invest Amount'}</Text>
//               <TextBox placeholder={`${'\u20B9'} 1,54,700`} style={styles.textbox} value={investMonthlyAmount} setValue={setInvestMonthlyAmount} containerStyle={styles.containerStyle} validate={_monthlyAmountValidate} num />
//               {errorMonthlyAmount ? <Text style={styles.errorTxt}>{errorMonthlyAmount}</Text> : null}
//               <View style={{ flexDirection: 'row' }}>
//                 <View>
//                   <Text style={[styles.labeltxt, { marginBottom: adjust(0) }]}>{'ROI'}</Text>
//                   <TextBox placeholder={'10%'} style={styles.textbox1} value={roiMonthly} setValue={setRoiMonthly} containerStyle={styles.containerStyle} validate={_monthlyRoiValidate} num />
//                   {errorMonthlyRoi ? <Text style={styles.errorTxt}>{errorMonthlyRoi}</Text> : null}
//                 </View>
//                 <View>
//                   <Text style={[styles.text4, { marginTop: adjust(5) }]}>Geeting Amount</Text>
//                   <Text style={[styles.text4, { marginTop: adjust(0) }]}>{'\u20B9'} 15,47,000</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => _validateMonthlyReturn()}>
//                 <View style={styles.bottomView}>
//                   <Text style={styles.text3}>Invest Now</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={[styles.boxView,
//             {
//               marginTop: (errorMonthlyAmount || errorMonthlyRoi) ? adjust(35) : adjust(15),
//               marginBottom: (errorYearlyAmount || errorYearlyRoi) ? adjust(30) : adjust(5)
//             }
//             ]}>
//               <Text style={styles.text}>Money Explorers Club</Text>
//               <Text style={styles.text1}>{`${'\u20B9'}50,000 - ${'\u20B9'}2,50,000`}</Text>
//               <View style={styles.radioButtonView}>
//                 <RadioGroup
//                   radioButtons={radioButtons}
//                   onPress={setSelectedIdMoney}
//                   selectedId={selectedIdMoney}
//                   layout='row'
//                 />
//               </View>
//               <Text style={styles.text}>{`\u2022 Limit ranges from ${'\u20B9'}50,000 to ${'\u20B9'}2,50,000`}</Text>
//               <Text style={[styles.text, { marginTop: adjust(0) }]}>{`\u2022 Withdrawal Lock-in Period: 1 Month`}</Text>
//               <Text style={styles.labeltxt}>{'Invest Amount'}</Text>
//               <TextBox placeholder={`${'\u20B9'} 1,54,700`} style={styles.textbox} value={investYearlyAmount} setValue={setInvestYearlyAmount} containerStyle={styles.containerStyle} validate={_yearlyAmountValidate} num />
//               {errorYearlyAmount ? <Text style={styles.errorTxt}>{errorYearlyAmount}</Text> : null}
//               <View style={{ flexDirection: 'row' }}>
//                 <View>
//                   <Text style={[styles.labeltxt, { marginBottom: adjust(0) }]}>{'ROI'}</Text>
//                   <TextBox placeholder={'10%'} style={styles.textbox1} value={roiYearly} setValue={setRoiYearly} containerStyle={styles.containerStyle} validate={_yearlyRoiValidate} num />
//                   {errorYearlyRoi ? <Text style={styles.errorTxt}>{errorYearlyRoi}</Text> : null}
//                 </View>
//                 <View>
//                   <Text style={[styles.text4, { marginTop: adjust(5) }]}>Geeting Amount</Text>
//                   <Text style={[styles.text4, { marginTop: adjust(0) }]}>{'\u20B9'} 15,47,000</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => _validateYearlyReturn()}>
//                 <View style={styles.bottomView}>
//                   <Text style={styles.text3}>Invest Now</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={[styles.boxView,
//             {
//               marginBottom: (errorBillionAmount || errorBillion) ? adjust(30) : adjust(5),marginTop: adjust(10)
//             }
//             ]}>
//               <Text style={styles.text}>Billion Mining Club</Text>
//               <Text style={styles.text1}>{`${'\u20B9'}50,000 - ${'\u20B9'}2,50,000`}</Text>
//               <View style={styles.radioButtonView}>
//                 <RadioGroup
//                   radioButtons={radioButtons}
//                   onPress={setSelectedIdBillion}
//                   selectedId={selectedIdBillion}
//                   layout='row'
//                 />
//               </View>
//               <Text style={styles.text}>{`\u2022 Limit ranges from ${'\u20B9'}50,000 to ${'\u20B9'}2,50,000`}</Text>
//               <Text style={[styles.text, { marginTop: adjust(0) }]}>{`\u2022 Withdrawal Lock-in Period: 1 Month`}</Text>
//               <Text style={styles.labeltxt}>{'Invest Amount'}</Text>
//               <TextBox placeholder={`${'\u20B9'} 1,54,700`} style={styles.textbox} value={investBillionAmount} setValue={setInvestBillionAmount} containerStyle={styles.containerStyle} validate={_billionAmountValidate} num />
//               {errorBillionAmount ? <Text style={styles.errorTxt}>{errorBillionAmount}</Text> : null}
//               <View style={{ flexDirection: 'row' }}>
//                 <View>
//                   <Text style={[styles.labeltxt, { marginBottom: adjust(0) }]}>{'ROI'}</Text>
//                   <TextBox placeholder={'10%'} style={styles.textbox1} value={roiBillion} setValue={setRoiBillion} containerStyle={styles.containerStyle} validate={_billionRoiValidate} num />
//                   {errorBillion ? <Text style={styles.errorTxt}>{errorBillion}</Text> : null}
//                 </View>
//                 <View>
//                   <Text style={[styles.text4, { marginTop: adjust(5) }]}>Geeting Amount</Text>
//                   <Text style={[styles.text4, { marginTop: adjust(0) }]}>{'\u20B9'} 15,47,000</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => _validateBillion()}>
//                 <View style={styles.bottomView}>
//                   <Text style={styles.text3}>Invest Now</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       <CustomTabBar />
//     </View>
//   )
// }

// export default Business

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   main: {
//     flex: 1,
//     margin: adjust(15)
//     // alignItems: 'center'
//   },
//   boxView: {
//     height: adjust(301),
//     // width: adjust(280),
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: COLORS.WHITE,
//     borderColor: COLORS.GRAY,
//     // marginTop: adjust(15),
//   },
//   text: {
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     marginTop: adjust(10),
//     marginBottom: adjust(2),
//     marginLeft: adjust(10),
//     fontSize: adjust(11),
//     fontWeight: '400',
//     color: COLORS.BLACK
//   },
//   text1: {
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     marginLeft: adjust(10),
//     fontSize: adjust(13),
//     fontWeight: '400',
//     color: COLORS.BLACK
//   },
//   text2: {
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     marginLeft: adjust(10),
//     fontSize: adjust(10),
//     fontWeight: '400',
//     color: COLORS.BLACK,
//     textDecorationLine: 'underline'
//   },
//   labeltxt: {
//     color: COLORS.DARK,
//     fontSize: adjust(14),
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     marginTop: adjust(5),
//     marginLeft: adjust(10),
//   },
//   textbox: {
//     width: adjust(214),
//     height: adjust(35),
//     fontSize: adjust(12),
//     marginLeft: adjust(10),
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     borderColor: COLORS.GRAY
//   },
//   textbox1: {
//     width: adjust(94),
//     height: adjust(35),
//     fontSize: adjust(12),
//     marginLeft: adjust(10),
//     borderColor: COLORS.GRAY
//   },
//   bottomView: {
//     backgroundColor: COLORS.MAIN,
//     height: adjust(35),
//     // width: adjust(280),
//     marginTop: adjust(16.5),
//     borderBottomEndRadius: 10,
//     borderBottomStartRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   text3: {
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     fontWeight: '400',
//     color: COLORS.WHITE,
//     fontSize: adjust(15)
//   },
//   text4: {
//     fontFamily: FONT_FAMILIES.AMERETTO,
//     marginTop: adjust(10),
//     marginBottom: adjust(5),
//     marginLeft: adjust(20),
//     fontSize: adjust(14),
//     fontWeight: '400',
//     color: COLORS.BLACK
//   },
//   containerStyle: {
//     height: adjust(40)
//   },
//   errorTxt: {
//     color: 'red',
//     fontSize: adjust(10),
//     marginLeft: adjust(10),
//     fontFamily: FONT_FAMILIES.AMERETTO
//   },
//   radioButtonView: {
//     height: adjust(45), justifyContent: 'center'
//   }
// })
