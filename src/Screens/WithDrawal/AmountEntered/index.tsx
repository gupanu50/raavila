import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import TextBox from 'components/TextBox';
import DropDown from 'components/DropDown';
import {useLazyGetAccountsQuery} from '@/Redux/services/withdrawal';
import Loader from '@/ReusableComponent/Loader';
import {useIsFocused} from '@react-navigation/native';

export default function AmountEnter(props: any) {
  const {
    amount,
    setAmount,
    errorAmount,
    setErrorAmount,
    accountSelect,
    bankAccountSelect,
    setAccountSelect,
    setBankAccountSelect,
    errorAccountSelect,
    errorBankAccountSelect,
    setErrorAccountSelect,
    setErrorBankAccountSelect,
    availAmount,
    setAvailAmount,
    validAmount
  } = props;
  const [getAccounts, {isLoading, data}] = useLazyGetAccountsQuery();
  const isFocus = useIsFocused();

  useEffect(() => {
    apiCall();
  }, [isFocus]);

  async function apiCall() {
    try {
      const date = new Date();
      const refetch = date.getSeconds();
      await getAccounts(refetch);
    } catch (error) {
      console.log('===error===>', error);
    }
  }


  return (
    <>
      <Text style={[styles.txt, {}]}>{'Select Withdrawal Account'}</Text>
      <DropDown
        data1={true}
        type={'accounts'}
        select={accountSelect}
        setSelect={setAccountSelect}
        setError={setErrorAccountSelect}
        setAvailAmount={setAvailAmount}
        setAmount={setAmount}
      />
      {errorAccountSelect ? (
        <Text style={styles.errorTxt}>{errorAccountSelect}</Text>
      ) : null}
      <Text
        style={[
          styles.txt,
          {fontSize: FONT_SIZES.LABEL},
        ]}>{`Available Balance : ₹${availAmount}`}</Text>
      <Text style={[styles.txt, {marginTop: adjust(15)}]}>
        {'Withdraw Amount'}
      </Text>
      <TextBox
        placeholder={'Enter Amount'}
        value={amount}
        setValue={setAmount}
        validate={validAmount}
        error={setErrorAmount}
      />
      {errorAmount ? <Text style={styles.errorTxt}>{errorAmount}</Text> : null}
      <Text style={[styles.txt, {marginTop: adjust(15)}]}>
        {'Select Bank Account'}
      </Text>
      <DropDown
        data1={true}
        type={'bankAccounts'}
        select={bankAccountSelect}
        setSelect={setBankAccountSelect}
        setError={setErrorBankAccountSelect}
      />
      {errorBankAccountSelect ? (
        <Text style={styles.errorTxt}>{errorBankAccountSelect}</Text>
      ) : null}
      <Loader loading={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontSize: adjust(14),
    color: COLORS.DARK,
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
  bgImg: {
    flex: 1,
  },
  errorTxt: {
    fontSize: adjust(12),
    color: 'red',
    fontFamily: FONT_FAMILIES.AMERETTO,
    top: adjust(-5),
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
  },
  headerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: adjust(157),
    width: '50%',
  },
});
