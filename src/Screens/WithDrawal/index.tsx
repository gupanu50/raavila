import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import CustomButton from 'components/CustomButton';
import {VALIDATE_FORM} from '@/Constant';
import Loader from '@/ReusableComponent/Loader';
import AmountEnter from 'screens/WithDrawal/AmountEntered';
import WithdrawalStatus from './WithDrawalStatus';
import {useMakeWithdrawalMutation} from '@/Redux/services/withdrawal';
import {showMessage} from 'react-native-flash-message';

export default function WithDrawal() {
  const [makeWithdrawal, {data, isLoading, isSuccess}] =
    useMakeWithdrawalMutation();
  const [amount, setAmount] = useState<number | string>(0);
  const [availAmount, setAvailAmount] = useState<number | string>(0);
  const [accountSelect, setAccountSelect] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string | null>(null);
  const [checkAmount, setCheckAmount] = useState<boolean>(false);
  const [errorAccountSelect, setErrorAccountSelect] = useState<string | null>(
    null,
  );
  const [bankAccountSelect, setBankAccountSelect] = useState<string>('');
  const [errorBankAccountSelect, setErrorBankAccountSelect] = useState<
    string | null
  >(null);
  const [active, setActive] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      showMessage({
        message: data?.message,
        type: data?.data?.status ? 'success' : 'danger',
        autoHide: true,
        duration: 900,
      });
      setAmount('');
      setAccountSelect('');
      setBankAccountSelect('');
      setAvailAmount(0);
    }
  }, [isSuccess]);

  // ****************************** _validate ************************************
  function _validate() {
    let flag: boolean = true;
    if (amount === 0 || checkAmount) {
      setErrorAmount(VALIDATE_FORM.AMOUNT);
      flag = false;
    }
    if (accountSelect == '') {
      setErrorAccountSelect('Please select your withdrawal account');
      flag = false;
    }
    if (bankAccountSelect == '') {
      setErrorBankAccountSelect('Please select your bank account');
      flag = false;
    } else {
      return flag;
    }
  }

  // ****************************** _validateAmount ********************************
  function _validateAmount(amount: any) {
    if (Number(availAmount) < amount) {
      setErrorAmount('*Please enter a valid amount');
      setCheckAmount(true);
    } else {
      setErrorAmount(null);
      setCheckAmount(false);
    }
  }

  // ****************************** _submit ************************************
  const _submit = async () => {
    if (_validate()) {
      const body: FormData = new FormData();
      body.append('account_number', accountSelect);
      body.append('amount', amount as string);
      body.append('bank_account', bankAccountSelect);
      try {
        await makeWithdrawal(body);
      } catch (error) {
        console.log('===error==>', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Withdrawals'} isBack />
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.headerBtn,
            {backgroundColor: active ? COLORS.WHITE : COLORS.MAIN},
          ]}
          onPress={() => setActive(false)}>
          <Text
            style={[styles.txt, {color: active ? COLORS.MAIN : COLORS.WHITE}]}>
            {'Withdrawal Request'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerBtn,
            {backgroundColor: active ? COLORS.MAIN : COLORS.WHITE},
          ]}
          onPress={() => setActive(true)}>
          <Text
            style={[styles.txt, {color: active ? COLORS.WHITE : COLORS.MAIN}]}>
            {'Withdrawal Status'}
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          {active ? (
            <WithdrawalStatus />
          ) : (
            <AmountEnter
              amount={amount}
              setAmount={setAmount}
              validAmount={_validateAmount}
              errorAmount={errorAmount}
              accountSelect={accountSelect}
              bankAccountSelect={bankAccountSelect}
              setAccountSelect={setAccountSelect}
              setBankAccountSelect={setBankAccountSelect}
              errorAccountSelect={errorAccountSelect}
              errorBankAccountSelect={errorBankAccountSelect}
              setErrorAccountSelect={setErrorAccountSelect}
              setErrorBankAccountSelect={setErrorBankAccountSelect}
              availAmount={availAmount}
              setAvailAmount={setAvailAmount}
            />
          )}
        </View>
        <Loader loading={isLoading} />
        <Modal animationType={'slide'} transparent={true} visible={visible}>
          <View style={styles.modalview}>
            <View style={[styles.modal, {}]}>
              <View style={styles.cross}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false), setActive(!active);
                  }}
                  style={styles.crossbtn}>
                  <Image style={styles.close} source={Images.cross} />
                </TouchableOpacity>
              </View>
              <View style={styles.cashView}>
                <View style={styles.cashView1}>
                  <Image
                    source={Images.tick}
                    style={{tintColor: COLORS.WHITE}}
                  />
                </View>
                <Text style={styles.confirmText}>
                  {'Withdraw Request Submitted'}
                </Text>
                <Text style={styles.otpText}>
                  {
                    'Please wait for 7-10 working days for your amount to be credited'
                  }
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
      {active ? null : (
        <CustomButton label={'Withdraw Amount'} press={_submit} />
      )}
    </View>
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
  modalview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor:'green',
    // height:adjust(1500),
    // width:adjust(1100)
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    // height: adjust(170),
    // width: adjust(200),
    borderRadius: 8,
    elevation: 10,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    // top:250,
    // left:77,
    padding: adjust(10),
  },
  cross: {
    height: adjust(25),
    // width: adjust(79),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  crossbtn: {
    height: adjust(25),
    width: adjust(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    tintColor: 'black',
  },
  confirmText: {
    marginTop: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(16),
    color: COLORS.BLACK,
    fontWeight: '400',
    // padding:adjust(5)
  },
  otpText: {
    marginTop: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(15),
    color: COLORS.BLACK,
    fontWeight: '400',
    textAlign: 'center',
    padding: adjust(5),
  },
  mainOtp: {
    marginTop: adjust(5),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(18),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  cashView: {
    alignItems: 'center',
  },
  cashView1: {
    alignItems: 'center',
    height: adjust(30),
    width: adjust(30),
    backgroundColor: COLORS.DARK,
    borderRadius: 100 / 2,
    justifyContent: 'center',
  },
});
