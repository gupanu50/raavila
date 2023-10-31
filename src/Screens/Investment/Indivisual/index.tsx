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
const {INDIVISUALDETAILS} = SCREENS;
import {Plan} from '@/Types';

const Indivisual = (props: any) => {
  const {route} = props;
  const [getPlans, result] = useGetPlanByTypeMutation();

  const body = {plan_type: route?.params?.investmet_type};
  async function callData() {
    await getPlans(body);
  }
  useEffect(() => {
    callData();
  }, []);

  const {navigation} = props;

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [planKey, setPlanKey] = useState<number>(0);
  const [amount, setAmount] = useState<number|null>(null);
  const [getAmount1, setGetAmount1] = useState<number | string>('Enter Amount');
  const [errorAmount, setErrorAmount] = useState<string | null>(null);
  const [getAmount3, setGetAmount3] = useState<number | string>('Enter Amount');
  const [getAmount2, setGetAmount2] = useState({
    one: null,
    two: null,
    first: null,
    second: null,
    third: null,
    four: null,
  });

  const planArray: Plan[] | undefined = result?.data?.data;
  return (
    <View style={styles.container}>
      <Header title={'Indivisual Investment'} isBack />
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

            console.log('==amount==>',amount);
            console.log('===planKey===>',planKey)
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
                var currentPlan;
                if (plan?.id === planKey) {
                  currentPlan = plan;
                }
                let roi;
                let amountGet;
                if (selectedItem === '1') {
                  roi = [currentPlan?.daily_roi];
                  amountGet = [getAmount1];
                } else if (selectedItem === '3') {
                  roi = [currentPlan?.yearly_roi];
                  amountGet = [getAmount3];
                } else if (selectedItem === '2') {
                  // roi = `${currentPlan?.montly_roi_one}, ${currentPlan?.montly_roi_two}, ${currentPlan?.montly_roi_0_3}, ${currentPlan?.montly_roi_4_6}, ${currentPlan?.montly_roi_7_9}, ${currentPlan?.montly_roi_10_12}`;
                  roi = [
                    Number(currentPlan?.montly_roi_one) !== 0
                      ? currentPlan?.montly_roi_one
                      : null,
                    Number(currentPlan?.montly_roi_two) !== 0
                      ? currentPlan?.montly_roi_two
                      : null,
                    Number(currentPlan?.montly_roi_0_3) !== 0
                      ? currentPlan?.montly_roi_0_3
                      : null,
                    Number(currentPlan?.montly_roi_4_6) !== 0
                      ? currentPlan?.montly_roi_4_6
                      : null,
                    Number(currentPlan?.montly_roi_7_9) !== 0
                      ? currentPlan?.montly_roi_7_9
                      : null,
                    Number(currentPlan?.montly_roi_10_12) !== 0
                      ? currentPlan?.montly_roi_10_12
                      : null,
                  ];
                  amountGet = [
                    Number(currentPlan?.montly_roi_one) !== 0
                      ? getAmount2.one
                      : null,
                    Number(currentPlan?.montly_roi_two) !== 0
                      ? getAmount2.two
                      : null,
                    Number(currentPlan?.montly_roi_0_3) !== 0
                      ? getAmount2.first
                      : null,
                    Number(currentPlan?.montly_roi_4_6) !== 0
                      ? getAmount2.second
                      : null,
                    currentPlan?.montly_roi_7_9 !== 0 ? getAmount2.third : null,
                    currentPlan?.montly_roi_10_12 !== 0
                      ? getAmount2.four
                      : null,
                  ];
                }

                navigation.navigate(INDIVISUALDETAILS, {
                  amount: amount,
                  id: currentPlan?.id,
                  type: currentPlan?.type,
                  for: selectedItem,
                  roi: roi,
                  getamount: amountGet,
                });
                setAmount(null);
              } 
              else {
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
                    keyboardType="number-pad"
                    value={planKey === plan?.id?amount:null}
                    onChangeText={(txt: any) => {
                      setPlanKey(plan?.id),
                        setAmount(txt),
                        calculateReturns(plan, txt);
                    }}
                    keyboardType='numeric'
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
