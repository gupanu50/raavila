import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {Images} from '@/Assets';
import Header from '@/ReusableComponent/Header';
import PaymentDropDown from 'components/PaymentDropDown';
import QrCode from './QrCode';
import Bank from './Bank';
import CustomButton from '@/Component/CustomButton';
import {
  usePaymentModeMutation,
} from '@/Redux/services/onlinePayment';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';
import { ScrollView } from 'react-native-gesture-handler';
export default function OnlinePayment(props: any) {
  const [paymentMode, {isLoading, data,isSuccess}] = usePaymentModeMutation();
  const isFocus = useIsFocused();
  const {route} = props;
  const {params} = route;
  const [selected, setSelected] = useState<string|Number>('');
  const [upi, setUpi] = useState<string>('raavila@oksbi');

  useEffect(() => {
    getPaymentMode();
  }, [selected]);

  const getPaymentMode = async () => {
    const body = {id:selected}
    try {
      await paymentMode(body);
    } catch (error) {
      console.log('===some error occured==>', error);
    }
  };

  console.log('==selected==>', selected);

  return (
    <View style={styles.container}>
      <Header title={'Online Pay'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          <Text style={styles.txt}>{'Select Payment Mode'}</Text>
          <PaymentDropDown select={selected} setSelect={setSelected} />
          <ScrollView showsVerticalScrollIndicator={false}>
          {selected == 1 || selected == 2 || selected == 3  ? (
            <QrCode data={data?.data} amount={params?.amount} />
          ) : selected == 4 || selected == 5 ? (
            <Bank data={data?.data} amount={params?.amount}/>
          ) : null}
          </ScrollView>
        </View>
        <Loader loading={isLoading} />
      </ImageBackground>
      {selected === 'cards' && <CustomButton label={'Proceed to Payment'} />}
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
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
  line: {
    marginTop: adjust(15),
    width: '100%',
  },
  payment: {
    height: adjust(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrView: {
    alignItems: 'center',
  },
  copyBtn: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
