import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '@/Assets';
import CustomButton from '@/Component/CustomButton';
import Header from '@/ReusableComponent/Header';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {FlatList} from 'react-native-gesture-handler';
import {arrayData} from '@/Types';
import LinearGradient from 'react-native-linear-gradient';
import SocialButton from '@/Component/SocialButton';
import TextTicker from 'react-native-text-ticker';
import {SCREENS, VALIDATE_FORM} from '@/Constant';
import {usePayment} from '../payment/usePayment';
import {useLazyGetRaavilaPlanQuery} from '@/Redux/services/raavilaPlans';
import RenderHtml from 'react-native-render-html';
// import {useIsFocused} from '@react-navigation/native';
import {useLazyUpgradeListQuery} from '@/Redux/services/upgradePlan/list';
import Loader from '@/ReusableComponent/Loader';
const {LOANOFFER, PAYMENT, PAYCASH, RAAVILAPLANS,ONLINEPAYMENT} = SCREENS;

export default function RaavilaPlans(props: any) {
  const {route} = props;
  const {params} = route;
  // const isFocused = useIsFocused();
  const [getRaavilaPlan, {isLoading}] = useLazyGetRaavilaPlanQuery();
  const [upgradeList, {isLoading: loadingUpgrade}] = useLazyUpgradeListQuery();
  const {navigation} = props;
  const [data, setData] = useState();
  const [click, setClick] = useState<boolean>(false);
  const [Id, setId] = useState<string>('');
  const [radio, setRadio] = useState<string | null>(null);
  const [errorRadio, setErrorRadio] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);
  const {startPayment} = usePayment();
  const [planId, setPlanId] = useState<string | null>('');
  const [planAmount, setPlanAmount] = useState<string | null>('');
  const [isRefresh, setIsRefresh] = useState(false);

  const apiCall = async () => {
    try {
      const refetch = Date.now();
      const response: any = await getRaavilaPlan(refetch, false);
      setData(response?.data?.data);
      // if (data !== null) {
      setIsRefresh(false);
      // }
    } catch (error) {
      setIsRefresh(false);
      console.log('Error fetching data:', error);
    }
  };

  const upgradePlan = async () => {
    try {
      const response: any = await upgradeList('');
      setData(response?.data?.data);
      // if (data !== null) {
      setIsRefresh(false);
      // }
    } catch (error) {
      setIsRefresh(false);
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    {
      params?.data ? upgradePlan() : apiCall();
    }
  }, [params]);

  const START_COORDS = {
    x: 0.9,
    y: 0.79,
  };
  const END_COORDS = {
    x: 0.2,
    y: 0.78,
  };

  const goToPayment = () => {
    if (_validate()) {
      payment == '1'
        ? navigation.navigate(ONLINEPAYMENT,{amount:planAmount})
        : navigation.navigate(PAYCASH, {
            type: radio,
            paymentOption: payment,
            id: planId,
            amount: planAmount,
            upgrade: params?.data,
            current_id: params?.id,
            current_amount: params?.amount,
            current_account: params?.account,
            naviName: 'raavilaPlans',
          });
    }
  };

  const onRefresh = () => {
    setIsRefresh(true);
    {
      params?.data ? upgradePlan() : apiCall();
    }
  };

  const _validate = () => {
    let flag: boolean = true;
    if (radio === null) {
      setErrorRadio('*Please select any period');
      flag = false;
    }
    if (payment === null) {
      setErrorPayment('*Please select any payment mode');
      flag = false;
    } else {
      return flag;
    }
  };

  function renderItem(item: any) {
    const {id, plan_name, plan_amount, description, return_amount} = item.item;

    const HTML: any = {
      html: `${description}`,
    };

    const tagStyles = {
      ul: {
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        color: COLORS.WHITE,
        paddingLeft: adjust(21),
      },
      li: {
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        color: COLORS.WHITE,
      },
    };

    return click == true && Id === id ? (
      <TouchableOpacity
        onPress={() => {
          setClick(false), setId(id);
        }}>
        <LinearGradient
          style={[
            styles.slide,
            {
              flexDirection: 'column',
              justifyContent: 'flex-start',
            },
          ]}
          start={START_COORDS}
          end={END_COORDS}
          colors={COLORS.GRAD1}>
          <View style={styles.up}>
            <View style={[styles.left, {}]}>
              <Image source={Images.gradientLogo} style={styles.img} />
            </View>
            <View style={[styles.right]}>
              <Text style={[styles.txt, {fontSize: adjust(20)}]}>
                {plan_name}
              </Text>
              <View style={styles.insideLeft}>
                <Image source={Images.rupee} style={styles.rupee} />
                <Text
                  style={[
                    styles.txt,
                    {
                      paddingTop: 0,
                      fontSize: adjust(22),
                      paddingLeft: adjust(3),
                      fontWeight: 'bold',
                    },
                  ]}>
                  {plan_amount}
                </Text>
              </View>
            </View>
          </View>
          <RenderHtml
            source={HTML}
            contentWidth={adjust(100)}
            tagsStyles={tagStyles}
          />
          <View style={styles.monthBox}>
            <Text style={[styles.txt, {padding: adjust(10)}]}>
              {`.with just ₹${return_amount.yearly_amount} and get ₹999 as a return a year.`}
            </Text>
            <Text
              style={[
                styles.txt,
                {padding: adjust(10), paddingTop: adjust(0)},
              ]}>
              {`. Else, Take ₹${return_amount.monthly_amount} per month for next 10 years`}
            </Text>
          </View>
          <View style={[styles.instantView, {}]}>
            <TouchableOpacity
              style={[styles.instantBtn, {}]}
              onPress={() => {
                setRadio('2'), setErrorRadio(null);
              }}>
              <View
                style={[
                  styles.radioInstant,
                  {
                    borderWidth: radio == '2' ? 8 : 0,
                    borderColor: COLORS.DARK,
                  },
                ]}
              />
              <Text style={[styles.txt, {paddingLeft: adjust(5)}]}>
                {'Instantly'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.instantBtn,
                {
                  marginLeft: adjust(26),
                },
              ]}
              onPress={() => {
                setRadio('1'), setErrorRadio(null);
              }}>
              <View
                style={[
                  styles.radioInstant,
                  {
                    borderWidth: radio == '1' ? 8 : 0,
                  },
                ]}
              />
              <Text style={[styles.txt, {paddingLeft: adjust(5)}]}>
                {'Monthly'}
              </Text>
            </TouchableOpacity>
          </View>
          {errorRadio ? (
            <Text style={styles.errorTxt}>{errorRadio}</Text>
          ) : null}
          <View style={[styles.instantView, {marginTop: adjust(-5)}]}>
            <TouchableOpacity
              style={styles.instantBtn}
              onPress={() => {
                setPayment('1'), setErrorPayment(null);
              }}>
              <View
                style={[
                  styles.radioInstant,
                  {
                    borderWidth: payment == '1' ? 8 : 0,
                    borderColor: COLORS.DARK,
                  },
                ]}
              />
              <Text style={[styles.txt, {paddingLeft: adjust(5)}]}>
                {'Pay Online'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.instantBtn,
                {
                  marginLeft: adjust(15),
                },
              ]}
              onPress={() => {
                setPayment('2'), setErrorPayment(null);
              }}>
              <View
                style={[
                  styles.radioInstant,
                  {
                    borderWidth: payment == '2' ? 8 : 0,
                  },
                ]}
              />
              <Text style={[styles.txt, {paddingLeft: adjust(5)}]}>
                {'Pay Through Cash'}
              </Text>
            </TouchableOpacity>
          </View>
          {errorPayment ? (
            <Text style={styles.errorTxt}>{errorPayment}</Text>
          ) : null}
          <SocialButton
            press={goToPayment}
            style={styles.btn}
            label={'Pay Now'}
            txtStyle={{color: COLORS.MAIN}}
          />
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setClick(true),
            setId(id),
            setPlanId(return_amount?.plan_id),
            setPlanAmount(plan_amount.toString());
        }}>
        <LinearGradient
          style={styles.slide}
          start={START_COORDS}
          end={END_COORDS}
          colors={COLORS.GRAD1}>
          <View style={styles.left}>
            <Image source={Images.gradientLogo} style={styles.img} />
          </View>
          <View style={styles.right}>
            <Text style={[styles.txt, {fontSize: adjust(20)}]}>
              {plan_name}
            </Text>
            <View style={styles.insideLeft}>
              <Image source={Images.rupee} style={styles.rupee} />
              <Text
                style={[
                  styles.txt,
                  {
                    paddingTop: 0,
                    fontSize: adjust(22),
                    paddingLeft: adjust(3),
                    fontWeight: 'bold',
                  },
                ]}>
                {plan_amount}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'Raavila Plans'} isRightAction isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          <Text style={[styles.txt, {color: COLORS.DARK}]}>
            {'Open Account with any below Plan'}
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
      <View style={styles.marqueView}>
        <TextTicker
          style={styles.marqueTxt}
          duration={5000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={2000}>
          Super long piece of text is long. The quick brown fox jumps over the
          lazy dog.
        </TextTicker>
      </View>
      <CustomButton
        label={params?.data ? 'Check Raavila Plans' : 'Check Loans Offers'}
        press={() =>
          navigation.navigate(params?.data ? RAAVILAPLANS : LOANOFFER)
        }
      />
      <Loader loading={params?.data ? loadingUpgrade : isLoading} />
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
    color: COLORS.WHITE,
  },
  slide: {
    // height: adjust(80),
    // marginVertical: adjust(2),
    borderRadius: adjust(5),
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
    justifyContent: 'space-between',
    marginTop: adjust(10),
    // marginVertical: adjust(7),
  },
  left: {
    backgroundColor: COLORS.WHITE,
    width: adjust(95),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: adjust(5),
  },
  img: {
    height: adjust(65),
    width: adjust(70),
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: adjust(12),
  },
  rupee: {
    height: adjust(19),
    width: adjust(10),
    // marginLeft: adjust(12),
    tintColor: COLORS.WHITE,
  },
  insideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,
    // backgroundColor: COLORS.GRAY,
    marginTop: '2%',
    height: 60,
    width: 250,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  up: {
    height: adjust(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthBox: {
    // margin: adjust(10),
    // backgroundColor:'green',
    marginTop: adjust(-10),
  },
  btn: {
    margin: adjust(12),
    height: adjust(30),
    // marginTop: adjust(24),
    backgroundColor: 'white',
    marginBottom: adjust(25),
  },
  instantView: {
    flexDirection: 'row',
    // height: adjust(50),
    margin: adjust(12),
    alignItems: 'center',
    marginTop: adjust(2),
  },
  instantBtn: {
    flexDirection: 'row',
    // width: adjust(80),
    alignItems: 'center',
  },
  radioInstant: {
    backgroundColor: COLORS.WHITE,
    height: adjust(20),
    width: adjust(20),
    borderRadius: adjust(20 / 2),
    borderColor: COLORS.MAIN,
  },
  marqueView: {
    backgroundColor: '#FF8989',
    height: adjust(25),
    justifyContent: 'center',
  },
  marqueTxt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    top: adjust(-10),
    paddingLeft: adjust(13),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  // html:{
  //   h1: { color: 'red', fontSize: 24 },
  //   p: { color: 'blue', marginBottom: 10 },
  //   a: { color: 'green', textDecorationLine: 'underline' }
  // }
});
