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
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {FlatList} from 'react-native-gesture-handler';
import {arrayData} from '@/Types';
import LinearGradient from 'react-native-linear-gradient';
import SocialButton from '@/Component/SocialButton';
import {SCREENS} from '@/Constant';
import {useLazyGetMyPlanQuery} from '@/Redux/services/myPlans';
import RenderHtml from 'react-native-render-html';
import {useIsFocused} from '@react-navigation/native';
import {useUpgradePlanMutation} from '@/Redux/services/upgradePlan';
import Loader from '@/ReusableComponent/Loader';
import {showMessage} from 'react-native-flash-message';
const {RAAVILAPLANS, PAYMENTOTP} = SCREENS;

export default function MyPlans(props: any) {
  // const [upgradePlan,{data:data1,isLoading}] = useUpgradePlanMutation();
  const isFocused = useIsFocused();
  // @ts-ignore
  const [getMyPlan, {isLoading}] = useLazyGetMyPlanQuery();
  //const {isLoading,data:plans, refetch} = useGetMyPlanQuery(false)
  // console.log('pLANS',plans?.data);
  const [data, setData] = useState();
  const {navigation} = props;
  const [click, setClick] = useState<boolean>(false);
  const [Id, setId] = useState<string>('');
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    getPlans();
  }, [isFocused, isRefresh]);

  const getPlans = async () => {
    try {
      const refetch = Date.now();
      const response = await getMyPlan(refetch, false);
      console.log('Myplans', response);
      setData(response?.data?.data);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
      console.log('===error==>', error);
    }
  };

  const getOldData = () => {
    // const getPlans = async () => {
    //   const response = await getMyPlan('');
    //   setData(response?.data?.data);
    // };
    // getPlans();
  };

  const START_COORDS = {
    x: 0.1,
    y: 0.2,
  };
  const END_COORDS = {
    x: 0.55,
    y: 0.2,
  };

  const onRefresh = () => {
    setIsRefresh(true);
    // getPlans();
  };

  function renderItem(item: any) {
    const {
      id,
      plans,
      plan_transaction,
      plan_id,
      cash_collect_otp,
      plan_status,
      plan_account,
    } = item.item;
    const {plan_name, plan_amount, description} = plans[0];
    const HTML: any = {
      html: `${description}`,
    };

    function _upgrade() {
      navigation.navigate(RAAVILAPLANS, {
        data: true,
        id: plan_id,
        amount: plan_amount,
        account: plan_account,
      });
    }

    const tagStyles = {
      ul: {
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        color: COLORS.DARK,
        paddingLeft: adjust(21),
      },
      li: {
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        color: COLORS.DARK,
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
              // height: adjust(330),
              flexDirection: 'column',
              justifyContent: 'flex-start',
            },
          ]}
          start={START_COORDS}
          end={END_COORDS}
          colors={plan_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
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
          {/* <Text style={[styles.txt, {margin: adjust(10)}]}>{description}</Text> */}
          <RenderHtml
            source={HTML}
            contentWidth={adjust(100)}
            tagsStyles={tagStyles}
          />
          <View style={styles.monthBox}>
            <Text
              style={[
                styles.txt,
                {
                  // padding: adjust(8),
                  paddingTop: adjust(3),
                  paddingLeft: adjust(8),
                  fontSize: adjust(17),
                  color: COLORS.DARK,
                },
              ]}>
              {'Monthly'}
            </Text>
            <Text
              style={[
                styles.txt,
                {
                  top: adjust(-14),
                  // padding: adjust(8),
                  paddingLeft: adjust(8),
                  paddingTop: adjust(15),
                },
              ]}>
              {'You will be getting 100 per month for next 10 years.'}
            </Text>
          </View>
          {plan_transaction.payment_status == 2 ? (
            <View style={styles.otpView}>
              <View style={styles.otpV}>
                <Text
                  style={styles.txt}>{`Your Otp : ${cash_collect_otp}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={() =>
                  navigation.navigate(PAYMENTOTP, {
                    plan_id: plan_id,
                    plan_otp: cash_collect_otp,
                    currentAccount: plan_account,
                  })
                }>
                <Text style={[styles.txt, {color: 'white'}]}>{'Verify'}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {plan_transaction.payment_status == 1 && plan_status == 1 ? (
            <SocialButton
              style={styles.btn}
              containerStyle={styles.containerBtn}
              label={'Upgrade Plan'}
              press={_upgrade}
            />
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setClick(true), setId(id);
        }}>
        <LinearGradient
          style={styles.slide}
          start={START_COORDS}
          end={END_COORDS}
          colors={plan_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
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
      <Header title={'My Plans'} isRightAction isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          {data !== null  ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
              }
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{flex:1,justifyContent:'center'}}>
            <Text
              style={[
                styles.txt,
                {
                  textAlign: 'center',
                  fontSize: FONT_SIZES.TITLE,
                },
              ]}>
              {'No Plans yet'}
            </Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <CustomButton
        label={'Check Raavila Plans'}
        press={() => navigation.navigate(RAAVILAPLANS)}
      />
      <Loader loading={isLoading} />
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
  slide: {
    // height: adjust(80),
    // marginVertical: adjust(2),
    borderRadius: adjust(5),
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
    justifyContent: 'space-between',
    // marginTop: adjust(19),
    marginVertical: adjust(6),
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
    height: adjust(60),
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
    tintColor: COLORS.DARK,
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
    // height: adjust(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthBox: {
    backgroundColor: 'lightgrey',
    margin: adjust(10),
    borderRadius: adjust(8),
    marginTop: adjust(-1),
  },
  btn: {
    margin: adjust(12),
    height: adjust(35),
  },
  otpView: {
    flexDirection: 'row',
    height: '10%',
    marginTop: adjust(-2),
    margin: adjust(12),
    justifyContent: 'space-between',
  },
  otpV: {
    backgroundColor: 'white',
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
  },
  verifyBtn: {
    backgroundColor: COLORS.MAIN,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
  },
  containerBtn: {
    // backgroundColor:'green',
    height: adjust(50),
  },
});
