import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import adjust from './adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {Plan} from '@/Types';

export default function RoiMonthly(props: any) {
  const {plan, amount, getAmount, setGet} = props;

  const calculateReturns = (plan: Plan, amount: any) => {
    // Perform the calculation here
    // You can use the same logic from the previous example
    const minimumInvestment = Number(plan?.plan_range_from);
    const maximumInvestment = Number(plan?.plan_range_to);
    // const tenure = Number(currentPlan?.withdrawal_lock_in_period);

    let flag = true;
    if (minimumInvestment > Number(amount)) {
      flag = false;
      // setErrorAmount('*Invalid Amount');
    } else if (maximumInvestment < Number(amount)) {
      flag = false;
      // setErrorAmount('*Invalid Amount');
    } else {
      flag = true;
      // setErrorAmount(null);
    }
    const monthlyInterestRateOne = Number(plan?.montly_roi_one);
    const monthlyInterestRateTwo = Number(plan?.montly_roi_two);
    const monthlyInterestRate0 = Number(plan?.montly_roi_0_3);
    const monthlyInterestRate1 = Number(plan?.montly_roi_4_6);
    const monthlyInterestRate2 = Number(plan?.montly_roi_7_9);
    const monthlyInterestRate3 = Number(plan?.montly_roi_10_12);

    let greetingAmountOne: Number|string = 0;
    let greetingAmount0: Number|string = 0;
    let greetingAmount1: Number|string = 0;
    let greetingAmount2: Number|string = 0;
    let greetingAmount3: Number|string = 0;
    let greetingAmountTwo: Number|string = 0;
    if (flag) {
      // Monthly Returns - 7 to 12 months
      greetingAmountOne = (amount * (monthlyInterestRateOne / 100)).toFixed(2);
      greetingAmountTwo = (amount * (monthlyInterestRateTwo / 100)).toFixed(2);
      greetingAmount0 = (amount * (monthlyInterestRate0 / 100)).toFixed(2);
      greetingAmount1 = (amount * (monthlyInterestRate1 / 100)).toFixed(2);
      greetingAmount2 = (amount * (monthlyInterestRate2 / 100)).toFixed(2);
      greetingAmount3 = (amount * (monthlyInterestRate3 / 100)).toFixed(2);
    }
    return setGet({
      one: greetingAmountOne,
      two: greetingAmountTwo,
      first: greetingAmount0,
      second: greetingAmount1,
      third: greetingAmount2,
      four: greetingAmount3,
    });
  };

  useEffect(()=>{calculateReturns(plan,amount)},[amount])

  return (
    <>
      {plan.montly_roi_one !== '0' ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (1-6)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_one} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.one}
            </Text>
          </View>
        </View>
      ) : null}
      {plan.montly_roi_two !== '0' ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (7-12)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_two} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.two}
            </Text>
          </View>
        </View>
      ) : null}
      {plan.montly_roi_0_3 !== 0 ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (1-3)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_0_3} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.first}
            </Text>
          </View>
        </View>
      ) : null}
      {plan.montly_roi_4_6 !== 0 ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (4-6)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_4_6} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.second}
            </Text>
          </View>
        </View>
      ) : null}
      {plan.montly_roi_7_9 !== 0 ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (7-9)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_7_9} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.third}
            </Text>
          </View>
        </View>
      ) : null}
      {plan.montly_roi_10_12 !== 0 ? (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={[styles.labeltxt, {marginBottom: adjust(0)}]}>
              {'ROI (10-12)'}
            </Text>
            <View style={styles.roiView}>
              <Text style={[styles.text, {marginTop: 0, marginBottom: 0}]}>
                {plan.montly_roi_10_12} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text4, {marginTop: adjust(5)}]}>
              Geting Amount
            </Text>
            <Text style={[styles.text4, {marginTop: adjust(0)}]}>
              {'\u20B9'} {getAmount.four}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
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
