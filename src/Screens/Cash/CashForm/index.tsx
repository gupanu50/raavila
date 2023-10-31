import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES, REGEX} from '@/Configration';
import TextBox from '@/Component/TextBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Images} from '@/Assets';
import {VALIDATE_FORM} from '@/Constant';
import CustomButton from '@/Component/CustomButton';
import {useCodApiMutation} from '@/Redux/services/cod';
import {useAppDispatch} from '@/Redux/hooks/hooks';
import {showMessage} from 'react-native-flash-message';
import {usePurchasePlanMutation} from '@/Redux/services/purchasePlan';
import Loader from '@/ReusableComponent/Loader';
import {useUpgradePlanMutation} from '@/Redux/services/upgradePlan';
import {useCommitteePurchaseMutation} from '@/Redux/services/committee/committeePurchase';
import {useCodCommitteeApiMutation} from '@/Redux/services/codCommittee';
import {
  useGetCashCollectMutation,
  useGetUserInvestMutation,
  usePurchaseInvestmentOfferMutation,
} from '@/Redux/services/investments';
import {useCommitteePurchaseEmiMutation} from '@/Redux/services/committee/committeeEmi';

const CashForm = (props: any) => {
  console.log('======codProps=====>', props);

  // Cod Api
  const [codApi, {isLoading, isSuccess, data}] = useCodApiMutation();

  // Purchase plan api
  const [purchasePlan, {isSuccess: purchaseSuccess, data: purchaseData}] =
    usePurchasePlanMutation<any>();

  // Investments api
  const [getUserInvest, {isSuccess: userInvestSuccess, data: userInvestData}] =
    useGetUserInvestMutation<any>();

  const [getCashCollect, {isSuccess: cashInvestSuccess, data: cashInvestData}] =
    useGetCashCollectMutation<any>();

  // Investment Offer Purchase api
  const [purchaseInvestmentOffer, {data: offerData, isSuccess: offerSuccess}] =
    usePurchaseInvestmentOfferMutation();

  // Upgrade plan api
  const [
    upgradePlan,
    {isLoading: upgradeLoading, isSuccess: upgradeSuccess, data: upgradeData},
  ] = useUpgradePlanMutation<any>();

  // Committe purchase api
  const [
    committeePurchase,
    {isSuccess: committeePurchaseSuccess, data: committeePurchaseData},
  ] = useCommitteePurchaseMutation<any>();

  const [
    committeePurchaseEmi,
    {isSuccess: committeePurchaseEmiSuccess, data: committeePurchaseEmiData},
  ] = useCommitteePurchaseEmiMutation<any>();

  // Cod for Committe
  const [
    codCommitteeApi,
    {isSuccess: codCommitteeApiSuccess, data: codCommitteeApiData},
  ] = useCodCommitteeApiMutation<any>();
  const {params, setActive} = props;

  // raavila plan state
  const [planData] = useState({
    plan_id: params?.id,
    plan_type: params?.type,
    payment_status: params?.paymentOption,
    amount: params?.amount,
  });

  // upgrade plan state
  const [upgrade] = useState<any>({
    current_id: params?.current_id,
    upgrade: params?.upgrade,
    currentAmount: params?.current_amount,
    currentAccount: params?.current_account,
  });
  const upgradeAmount = parseInt(planData.amount, 10) - upgrade.currentAmount;

  // investment state
  const [investData] = useState<any>({
    amount: params?.previousData?.amount,
    for: params?.previousData?.for,
    getAmount: (params?.previousData?.getAmount ?? [])
      .filter((item: any) => item !== null)
      .map((item: any) => `${item}`)
      .join(','),
    id: params?.previousData?.id.toString(),
    roi: (params?.previousData?.roi ?? [])
      .filter((item: any) => item !== null)
      .map((item: any) => `${item}`)
      .join(','),
    type: params?.previousData?.type,
    pinCode: params?.pincode,
  });

  function dateConverter(date: any) {
    const dateParts = date?.split(' ')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const extractedDate = `${year}-${month}-${day}`;
    return extractedDate;
  }

  // investment Offer state
  const [investmentOfferData] = useState<any>({
    amount: params?.offerData?.amount,
    for: params?.offerData?.for,
    getAmount: params?.offerData?.getAmount,
    id: params?.offerData?.id,
    roi: params?.offerData?.roi.toString(),
    type: params?.offerData?.type,
    from: params?.offerData?.from
      ? dateConverter(params?.offerData?.from)
      : null,
    to: params?.offerData?.to ? dateConverter(params?.offerData?.to) : null,
    pinCode: params?.pincode,
  });

  // committe state
  const [committeeData] = useState({
    committee_id: params?.committeData?.committee_id,
    committee_amount: params?.committeData?.committee_amount,
  });

  const [committeeEmiData] = useState({
    committeeMonth: params?.committeEmiData?.committeeMonth,
    committeeAccount: params?.committeEmiData?.committeeAccount,
    committeeId: params?.committeEmiData?.committeeId,
    committeeAmount: params?.committeEmiData?.committeeAmount,
  });

  console.log('===committeeEmiData===>',committeeEmiData);

  const [address, setAddress] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>(
    investData?.pinCode
      ? investData.pinCode
      : investmentOfferData?.pinCode
      ? investmentOfferData?.pinCode
      : '',
  );
  const [amount, setAmount] = useState<string | null | number>(
    upgrade.upgrade
      ? upgradeAmount
      : committeeData.committee_amount
      ? committeeData.committee_amount
      : committeeEmiData.committeeAmount
      ? committeeEmiData.committeeAmount
      : investData.amount
      ? investData.amount
      : investmentOfferData?.amount
      ? investmentOfferData?.amount
      : planData.amount,
  );

  const [name, setName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [errorInvestAmount, setErrorInvestAmount] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorAddress, setErrorAddress] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorPinCode, setErrorPinCode] = useState<string | null>(null);
  const [errorDate, setErrorDate] = useState<string | null>(null);
  const [errorContactNumber, setErrorContactNumber] = useState<string | null>(
    null,
  );
  const [checkName, setCheckName] = useState<boolean>(false);
  const [checkMobile, setCheckMobile] = useState<boolean>(false);
  const [dat, setDt] = useState<string>('DD');
  const [mon, setMon] = useState<string>('MM');
  const [yer, setYr] = useState<string>('YYYY');
  const dob = new Date();
  const year1 = dob.getFullYear();
  const month1 = dob.getMonth();
  const day = dob.getDate();
  const updateDate = (selectedDate: any) => {
    setDt(moment(selectedDate).format('DD'));
    setMon(moment(selectedDate).format('MM'));
    setYr(moment(selectedDate).format('YYYY'));
  };
  // *********************************DatePicker***********************************************
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    updateDate(date);
    hideDatePicker();
    setErrorDate(null);
  };

  const _investAmountValidate = (mail: string) => {
    if (mail === '') {
      setErrorInvestAmount(VALIDATE_FORM.AMOUNT);
    } else {
      setErrorInvestAmount(null);
    }
  };

  const _addressValidate = (mail: string) => {
    if (mail === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
    } else {
      setErrorAddress(null);
    }
  };

  const [checkPinCode, setCheckPinCode] = useState<boolean>(false);
  const _pinCodeValidate = (mail: string) => {
    var pinCodeRegex = /^[1-9][0-9]{5}$/;
    if (mail === '') {
      setErrorPinCode(VALIDATE_FORM.PINCODE);
      setCheckPinCode(true);
      // @ts-ignore
    } else if (!pinCodeRegex.test(mail)) {
      setErrorPinCode('*Invalid PinCode');
      setCheckPinCode(true);
    } else {
      setErrorPinCode(null);
      setCheckPinCode(false);
    }
  };

  const _nameValidate = (mail: string) => {
    var nameRegex = REGEX.NAME;
    if (mail === '') {
      setErrorName(VALIDATE_FORM.NAME);
      setCheckName(true);
    } else if (!nameRegex.test(mail)) {
      setErrorName(VALIDATE_FORM.VALID_NAME);
      setCheckName(true);
    } else {
      setErrorName(null);
      setCheckName(false);
    }
  };

  const _contactNumberValidate = (mail: string) => {
    var nameRegex = REGEX.MOBILE;
    if (mail === '') {
      setErrorContactNumber(VALIDATE_FORM.MOBILE);
      setCheckMobile(true);
    } else if (!nameRegex.test(mail)) {
      setErrorContactNumber(VALIDATE_FORM.MOBILE_VALID);
      setCheckMobile(true);
    } else {
      setErrorContactNumber(null);
      setCheckMobile(false);
    }
  };

  // validation function
  const isValidate = () => {
    let flag: boolean = true;
    if (address === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
      flag = false;
    }
    if (pinCode === '' || checkPinCode) {
      setErrorPinCode(VALIDATE_FORM.PINCODE);
      flag = false;
    }
    if (amount === '') {
      setErrorInvestAmount(VALIDATE_FORM.AMOUNT);
      flag = false;
    }
    if (dat === 'DD') {
      setErrorDate(VALIDATE_FORM.DATE);
      flag = false;
    }
    if (name === '' || checkName) {
      setErrorName(errorName ? errorName : VALIDATE_FORM.NAME);
      flag = false;
    }
    if (contactNumber === '' || checkMobile) {
      setErrorContactNumber(
        errorContactNumber ? errorContactNumber : VALIDATE_FORM.MOBILE,
      );
      flag = false;
    } else {
      return flag;
    }
  };

  // purchase plan function
  const purchase = async () => {
    console.log('==pass through purchase api===>');
    const body: any = new FormData();
    body.append('plan_id', planData.plan_id),
      body.append('plan_type', planData.plan_type),
      body.append('amount', planData.amount),
      body.append('payment_type', 'cash'),
      body.append('payment_status', planData.payment_status);
    body.append('transaction_number', null);
    try {
      const response: any = await purchasePlan(body);
      if (response?.data?.status === true) {
        cod();
      } else if (response?.data?.status == !true) {
        setLoading(false);
        const msg = response?.data?.message;
        showMessage({
          message: JSON.stringify(msg),
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  // cod function
  const cod = async () => {
    console.log('==come to cod api===>');
    const body: any = new FormData();
    body.append('address', address),
      body.append('pin_code', pinCode),
      body.append('amount', amount),
      body.append('date', `${yer}-${mon}-${dat}`),
      body.append('full_name', name),
      body.append('contact_number', contactNumber);
    body.append('plan_id', planData.plan_id);
    try {
      await codApi(body);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  // committee function
  const committee = async () => {
    const body: any = new FormData();
    body.append('committee_id', committeeData.committee_id),
      body.append('amount', committeeData.committee_amount),
      body.append('payment_type', 'cash'),
      body.append('payment_status', 2);
    body.append('transaction_number', null);
    try {
      const response: any = await committeePurchase(body);
      console.log('===response==>', response?.data?.message);
      if (response?.data?.status === true) {
        codCommittee();
      } else if (response?.data?.status == !true) {
        setLoading(false);
        const msg = response?.data?.message;
        showMessage({
          message: JSON.stringify(msg),
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  // cod Committee function
  const codCommittee = async () => {
    console.log('==come to codCommittee api===>');
    const body: any = new FormData();
    body.append('address', address),
      body.append('pin_code', pinCode),
      body.append('amount', amount),
      body.append('date', `${yer}-${mon}-${dat}`),
      body.append('full_name', name),
      body.append('contact_number', contactNumber);
    {
      committeeEmiData.committeeId
        ? body.append('committee_id', committeeEmiData.committeeId)
        : body.append('committee_id', committeeData.committee_id);
    }
    // body.append('committee_id', committeeData.committee_id);
    try {
      await codCommitteeApi(body);
      console.log('runningcodcommitteapibyemi');
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  // committeeEmi function
  const committeeEmi = async () => {
    const body: any = new FormData();
    body.append('month', committeeEmiData.committeeMonth + 1),
      body.append('committee_account', committeeEmiData.committeeAccount),
      body.append('committee_id', committeeEmiData.committeeId),
      body.append('amount', committeeEmiData.committeeAmount);
    body.append('transaction_number', null);
    body.append('payment_type', 'cash');
    body.append('payment_status', 2);
    try {
      const response: any = await committeePurchaseEmi(body);
      console.log('===response==>', response?.data?.message);
      if (response?.data?.status === true) {
        codCommittee();
      } else if (response?.data?.status == !true) {
        setLoading(false);
        const msg = response?.data?.message;
        showMessage({
          message: JSON.stringify(msg),
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  // upgrade plan function
  async function upgradePlans() {
    const body: any = new FormData();
    body.append('my_plan_id', upgrade.current_id),
      body.append('plan_id', planData.plan_id),
      body.append('plan_type', planData.plan_type),
      body.append('transaction_number', null),
      body.append('payment_type', 'cash'),
      body.append('payment_status', planData.payment_status);
    body.append('plan_account', upgrade.currentAccount);
    try {
      const response: any = await upgradePlan(body);
      if (response?.data?.status) {
        cod();
      } else if (response?.error !== null) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // showMessage({
      //   message: data?.message,
      //   type: 'danger',
      // });
      console.log('==error==', error);
    }
    setLoading(false);
  }

  // main function trigger on pay through cash
  const _validatePayCash = async () => {
    if (isValidate()) {
      console.log('===validateFunction===>', params?.params?.type);
      setLoading(true);
      upgrade.upgrade
        ? upgradePlans()
        : committeeData.committee_amount
        ? committee()
        : committeeEmiData.committeeAmount
        ? committeeEmi()
        : investData?.type === 'individual_plan' ||
          investData?.type === 'enterprise_plan'
        ? investIndivisual()
        : investmentOfferData?.amount
        ? investIndivisual()
        : purchase();
    }
  };

  // investment function and investment offer purchase
  async function investIndivisual() {
    console.log('investfunction');
    const body: any = new FormData();
    {
      investData?.type === 'individual_plan' ||
      investData?.type === 'enterprise_plan'
        ? body.append('investment_id', investData?.id)
        : body.append('investment_offer_id', investmentOfferData?.id);
      body.append('from', investmentOfferData?.from);
      body.append('to', investmentOfferData?.to);
    }
    body.append(
      'investment_type',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.type
        : investmentOfferData?.type,
    );
    body.append(
      'invest_for',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.for
        : investmentOfferData?.for,
    );
    body.append(
      'invest_amount',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.amount
        : investmentOfferData?.amount,
    );
    body.append(
      'roi',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.roi
        : investmentOfferData?.roi,
    );
    body.append(
      'getting_amount',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.getAmount
        : investmentOfferData?.getAmount,
    );
    body.append(
      'pincode',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData?.pinCode
        : investmentOfferData?.pinCode,
    );
    body.append('transaction_number', null);
    body.append('payment_type', 'cash');
    body.append('payment_status', '2');
    console.log('====investBody====>', body);
    try {
      const response: any =
        investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
          ? await getUserInvest(body)
          : await purchaseInvestmentOffer(body);
      console.log('===response===>', response);
      showMessage({
        message: response?.data?.message,
        type: response?.data?.status ? 'success' : 'danger',
        autoHide: true,
        duration: 1000,
      });
      if (response?.data?.status === true) {
        codInvest();
      } else if (response?.error !== null) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  }

  //cod investment function
  const codInvest = async () => {
    console.log('====codInvest===>', params?.params);
    const body: any = new FormData();
    body.append('address', address),
      body.append(
        'pin_code',
        investData?.type === 'individual_plan' ||
          investData?.type === 'enterprise_plan'
          ? investData.pinCode
          : investmentOfferData?.pinCode,
      ),
      body.append(
        'amount',
        investData?.type === 'individual_plan' ||
          investData?.type === 'enterprise_plan'
          ? investData.amount
          : investmentOfferData?.amount,
      ),
      body.append('date', `${yer}-${mon}-${dat}`),
      body.append('full_name', name),
      body.append('contact_number', contactNumber);
    body.append(
      'investment_id',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? investData.id
        : '',
    );
    body.append(
      'investment_offer_id',
      investData?.type === 'individual_plan' ||
        investData?.type === 'enterprise_plan'
        ? ''
        : investmentOfferData?.id,
    );
    try {
      await getCashCollect(body);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log('==error==', error);
    }
  };

  useEffect(() => {
    if (offerSuccess) {
      setLoading(false);
    }
  }, [offerSuccess]);

  useEffect(() => {
    if (userInvestSuccess) {
      console.log('Purchased Data', userInvestData);
      setLoading(false);
      // showMessage({
      //   message: userInvestData?.message,
      //   type: userInvestData.status ? 'success' : 'danger',
      // });
    }
  }, [userInvestSuccess]);

  useEffect(() => {
    if (purchaseSuccess) {
      console.log('Purchased Data', purchaseData);
      setLoading(false);
      const msg = JSON.stringify(purchaseData?.message);
      showMessage({
        message: purchaseData?.message,
        type: purchaseData.status ? 'success' : 'danger',
      });
    }
  }, [purchaseSuccess]);

  useEffect(() => {
    if (upgradeSuccess) {
      setLoading(false);
      const msg = JSON.stringify(upgradeData?.message);
      console.log('===msg==>', msg);
      console.log('====data?.message====>', upgradeData?.message);
      showMessage({
        message: upgradeData?.message,
        type: upgradeData?.status ? 'success' : 'danger',
      });
    }
  }, [upgradeSuccess]);

  useEffect(() => {
    if (cashInvestSuccess) {
      console.log('======cashInvestSuccess======>');
      setLoading(false);
      cashInvestData?.status ? setVisible(true) : setVisible(false);
      setAddress('');
      setName('');
      setDt('');
      setMon('');
      setYr('');
      setContactNumber('');
      showMessage({
        message: cashInvestData?.message,
        type: cashInvestData?.status ? 'success' : 'danger',
      });
    }
  }, [cashInvestSuccess]);

  useEffect(() => {
    if (isSuccess && data?.data !== null) {
      setLoading(false);
      setVisible(true);
      setAddress('');
      setPinCode('');
      setAmount('');
      setName('');
      setDt('');
      setMon('');
      setYr('');
      setContactNumber('');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (committeePurchaseSuccess) {
      console.log('Purchased Data', committeePurchaseData);
      setLoading(false);
      const msg = JSON.stringify(data?.message);
      showMessage({
        message: committeePurchaseData?.message,
        type: committeePurchaseData.status ? 'success' : 'danger',
      });
    }
  }, [committeePurchaseSuccess]);

  useEffect(() => {
    if (codCommitteeApiSuccess && codCommitteeApiData?.data !== null) {
      setLoading(false);
      setVisible(true);
      setAddress('');
      setPinCode('');
      setAmount('');
      setName('');
      setDt('');
      setMon('');
      setYr('');
      setContactNumber('');
    }
  }, [codCommitteeApiSuccess]);

  useEffect(() => {
    if (committeePurchaseEmiSuccess) {
      console.log('Purchased Emi Data', committeePurchaseEmiData);
      setLoading(false);
      const msg = JSON.stringify(data?.message);
      showMessage({
        message: committeePurchaseEmiData?.message,
        type: committeePurchaseEmiData.status ? 'success' : 'danger',
      });
    }
  }, [committeePurchaseEmiSuccess]);

  // getOtp when payment made for cod
  function getOtp() {
    let otp: any;
    if (data?.data?.otp) {
      otp = data?.data?.otp;
    } else if (codCommitteeApiData?.data?.otp) {
      otp = codCommitteeApiData?.data?.otp;
    } else if (cashInvestData?.data?.otp) {
      otp = cashInvestData?.data?.otp;
    }
    return <Text style={styles.mainOtp}>{otp}</Text>;
  }

  const getMinimumDate = () => {
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() + 2); // Add 2 days to the current date
    return minimumDate;
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={{margin: adjust(20)}}>
            <Text style={styles.labeltxt}>{'Fill Address'}</Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={address}
              setValue={setAddress}
              containerStyle={styles.containerStyle}
              validate={_addressValidate}
            />
            {errorAddress ? (
              <Text style={styles.errorTxt}>{errorAddress}</Text>
            ) : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>
              {'Select Pin Code'}
            </Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={pinCode}
              setValue={setPinCode}
              containerStyle={styles.containerStyle}
              validate={_pinCodeValidate}
              editable={
                investData?.pinCode || investmentOfferData?.pinCode
                  ? false
                  : true
              }
              num
              length={6}
            />
            {errorPinCode ? (
              <Text style={styles.errorTxt}>{errorPinCode}</Text>
            ) : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>
              {'Fill Amount'}
            </Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={amount?.toString()}
              setValue={setAmount}
              containerStyle={styles.containerStyle}
              validate={_investAmountValidate}
              editable={false}
              num
            />
            {errorInvestAmount ? (
              <Text style={styles.errorTxt}>{errorInvestAmount}</Text>
            ) : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Date'}</Text>
            <TouchableOpacity
              style={styles.dob}
              onPress={() => {
                showDatePicker();
              }}>
              {dat && mon && yer ? (
                <Text
                  style={[
                    styles.txt,
                    {
                      color: COLORS.DARK,
                      paddingLeft: 0,
                      fontSize: FONT_SIZES.LABEL,
                    },
                  ]}>
                  {dat} / {mon} / {yer}
                </Text>
              ) : (
                <Text
                  style={[styles.txt, {color: COLORS.GRAY, paddingLeft: 0}]}>
                  {'DD'} / {'MM'} / {'YYYY'}
                </Text>
              )}
              <Image source={Images.calender} />
            </TouchableOpacity>
            {errorDate ? (
              <Text style={[styles.errorTxt, {marginTop: adjust(5)}]}>
                {errorDate}
              </Text>
            ) : null}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={getMinimumDate()}
            />
            <View style={styles.lineView}></View>
            <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
              {'Full Name'}
            </Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={name}
              setValue={setName}
              containerStyle={styles.containerStyle}
              validate={_nameValidate}
            />
            {errorName ? (
              <Text style={styles.errorTxt}>{errorName}</Text>
            ) : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>
              {'Contact Number'}
            </Text>
            <TextBox
              placeholder={'Enter Here'}
              style={styles.textbox}
              value={contactNumber}
              setValue={setContactNumber}
              containerStyle={styles.containerStyle}
              validate={_contactNumberValidate}
              num
              length={10}
            />
            {errorContactNumber ? (
              <Text style={styles.errorTxt}>{errorContactNumber}</Text>
            ) : null}
            {/* <View style={{height: adjust(20)}}></View> */}
          </View>
        </ScrollView>
        <CustomButton
          label="Pay Through Cash"
          press={() => _validatePayCash()}
        />
        <Loader loading={loading} />
      </View>
      <Modal animationType={'slide'} transparent={true} visible={visible}>
        <View style={styles.modalview}>
          <View style={[styles.modal, {}]}>
            <View style={styles.cross}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false), setActive(1);
                }}
                style={styles.crossbtn}>
                <Image style={styles.close} source={Images.cross} />
              </TouchableOpacity>
            </View>
            <View style={styles.cashView}>
              <View style={styles.cashView1}>
                <Image source={Images.tick} style={{tintColor: COLORS.WHITE}} />
              </View>
              <Text style={styles.confirmText}>Cash Pickup Confirmed</Text>
              <Text style={styles.otpText}>OTP</Text>
              {/* {data?.data?.otp ? (
                <Text style={styles.mainOtp}>{data?.data?.otp}</Text>
              ) : (
                <Text style={styles.mainOtp}>
                  {codCommitteeApiData?.data?.otp}
                </Text>
              )} */}
              {getOtp()}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CashForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labeltxt: {
    color: COLORS.DARK,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    // marginTop: adjust(15),
    // marginLeft: adjust(25),
    fontWeight: '400',
  },
  labeltxt1: {
    marginTop: adjust(5),
  },
  labeltxt2: {
    marginTop: adjust(10),
  },
  textbox: {
    // width: adjust(265),
    height: adjust(45),
    fontSize: FONT_SIZES.SUB_HEADING,
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
    backgroundColor: COLORS.WHITE,
  },
  containerStyle: {
    height: adjust(50),
  },
  dob: {
    backgroundColor: COLORS.WHITE,
    height: adjust(40),
    // width: adjust(265),
    borderWidth: 1,
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: adjust(10),
    marginTop: adjust(5),
    // marginLeft: adjust(25),
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    padding: adjust(12),
  },
  lineView: {
    height: adjust(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DARK,
    // width: adjust(280),
    // marginLeft: adjust(20),
  },
  bottomView: {
    height: adjust(40),
    backgroundColor: COLORS.DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labeltxt3: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: adjust(15),
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
    height: adjust(170),
    width: adjust(200),
    borderRadius: 8,
    elevation: 10,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    // top:250,
    // left:77
  },
  cross: {
    height: adjust(25),
    // width: adjust(79),
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor:'orange'
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
    fontSize: adjust(13),
    color: COLORS.BLACK,
    fontWeight: '400',
  },
  otpText: {
    marginTop: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(8),
    color: COLORS.BLACK,
    fontWeight: '400',
  },
  mainOtp: {
    marginTop: adjust(5),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(18),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    marginLeft: adjust(5),
    fontFamily: FONT_FAMILIES.AMERETTO,
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
  textContainer: {
    height: adjust(57),
    justifyContent: 'center',
  },
  input: {
    height: '70%',
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: adjust(5),
    paddingLeft: adjust(8),
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    backgroundColor: COLORS.WHITE,
  },
});
