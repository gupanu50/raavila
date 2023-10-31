import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/ReusableComponent/Header';
import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import BankDetails from '@/Component/BankDetails';
import {image} from '@/Types';
import CustomButton from '@/Component/CustomButton';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {useAddBankDetailMutation} from '@/Redux/services/addBankDetails';
import Loader from '@/ReusableComponent/Loader';
const {MYPROFILE} = SCREENS;

export default function EditBank(props: any) {
  const {navigation, route} = props;
  const {bank,isBank} = route?.params;

  const [accName, setAccName] = useState<string>(bank?.account_holder_name);
  const [errorAccName, setErrorAccName] = useState<string | null>(null);

  const [accNumber, setAccNumber] = useState<string>(bank?.account_number);
  const [errorAccNumber, setErrorAccNumber] = useState<string | null>(null);

  const [ifscCode, setIfscCode] = useState<string>(bank?.ifsc_code);
  const [errorIfsc, setErrorIfsc] = useState<string | null>(null);

  const [cheque, setCheque] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });
  const [errorCheque, setErrorCheque] = useState<string | null>(null);

  const [upi, setUpi] = useState<string>('');
  const [errorUpi, setErrorUpi] = useState<string | null>(null);
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

  const [addBankDetails, result] = useAddBankDetailMutation();
  console.log('useeddd', result);
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

  const saveBankDetails = () => {
    const bank:FormData = new FormData();
    bank.append('account_holder_name', accName);
    bank.append('account_number', accNumber);
    bank.append('ifsc_code', ifscCode);
    bank.append('cancle_cheque', cheque as any);
    bank.append('upi_id', upi);
    addBankDetails(bank);
    // bank.append('cheque',cheque as Blob)
  };
  function _save() {
    if (_isValidateBankDetails()) {
      saveBankDetails();
    }
  }

  useEffect(() => {
    if (result.isSuccess && result.data?.data) {
      showMessage({
        message: isBank?'Your Bank Details Add Successfully':'Your Account created Successfully!!',
        type: 'success',
      });
      navigation.navigate(MYPROFILE);
    }
  }, [result.isSuccess]);

  return (
    <View style={styles.container}>
      <Header title={'Add/Edit Bank Account'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </ImageBackground>
      <Loader loading={result.isLoading} />
      <CustomButton label={'Save Changes'} press={_save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
});
