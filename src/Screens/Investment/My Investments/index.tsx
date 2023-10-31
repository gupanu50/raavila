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
import LinearGradient from 'react-native-linear-gradient';
import {SCREENS} from '@/Constant';
import RenderHtml from 'react-native-render-html';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';
import {showMessage} from 'react-native-flash-message';
import {useLazyGetMyInvestmentsQuery} from '@/Redux/services/investments';
const {PAYMENTOTP, INVESTMENTOFFERS, NEWINVESTMENT} = SCREENS;

export default function MyInvestments(props: any) {
  const isFocused = useIsFocused();
  const [getMyInvestments, {isLoading}] = useLazyGetMyInvestmentsQuery();
  const [data, setData] = useState();
  const {navigation} = props;
  const [click, setClick] = useState<boolean>(false);
  const [Id, setId] = useState<string>('');
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [data1, setData1] = useState();

  useEffect(() => {
    getInvestments();
  }, [isFocused, isRefresh]);

  const getInvestments = async () => {
    try {
      const refetch = Date.now();
      const response = await getMyInvestments(refetch, false);
      console.log('Myplans', response);
      setData(response?.data?.data?.myInvest_plans);
      setData1(response?.data?.data?.myInvest_offerPlans);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
      console.log('===error==>', error);
    }
  };

  console.log('===data1===>', data1);

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
    getInvestments();
  };

  function renderItem(item: any) {
    const {
      id,
      invest_transaction,
      cash_collect_otp,
      investment,
      invest_amount,
      invest_account,
    } = item.item;
    const {plan_name, description} = investment[0];
    const {investment_id, investment_offer_id, payment_status} =
      invest_transaction;

    const HTML: any = {
      html: `${description}`,
    };

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
          colors={payment_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
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
                  {invest_amount}
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
          {invest_transaction.payment_status == 2 ? (
            <View style={styles.otpView}>
              <View style={styles.otpV}>
                <Text
                  style={styles.txt}>{`Your Otp : ${cash_collect_otp}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={() =>
                  navigation.navigate(PAYMENTOTP, {
                    invest_id: investment_id,
                    invest_offer_id: investment_offer_id,
                    investAccount: invest_account,
                    investOtp: cash_collect_otp,
                  })
                }>
                <Text style={[styles.txt, {color: 'white'}]}>{'Verify'}</Text>
              </TouchableOpacity>
            </View>
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
          colors={payment_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
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
                {invest_amount}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function renderItem1(item: any) {
    const {
      id,
      offer_invest_transaction,
      cash_collect_otp,
      investment_offer,
      invest_amount,
      invest_account,
    } = item.item;
    const {title, description} = investment_offer[0];
    const {investment_id, investment_offer_id, payment_status} =
      offer_invest_transaction;

    const HTML: any = {
      html: `${description}`,
    };

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
          colors={payment_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
          <View style={styles.up}>
            <View style={[styles.left, {}]}>
              <Image source={Images.gradientLogo} style={styles.img} />
            </View>
            <View style={[styles.right]}>
              <Text style={[styles.txt, {fontSize: adjust(20)}]}>{title}</Text>
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
                  {invest_amount}
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.txt, {margin: adjust(10)}]}>{description}</Text>
          {/* <RenderHtml
              source={HTML}
              contentWidth={adjust(100)}
              tagsStyles={tagStyles}
            /> */}
          {offer_invest_transaction.payment_status == 2 ? (
            <View style={styles.otpView}>
              <View style={styles.otpV}>
                <Text
                  style={styles.txt}>{`Your Otp : ${cash_collect_otp}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={() =>
                  navigation.navigate(PAYMENTOTP, {
                    invest_id: investment_id,
                    invest_offer_id: investment_offer_id,
                    investAccount: invest_account,
                    investOtp: cash_collect_otp,
                  })
                }>
                <Text style={[styles.txt, {color: 'white'}]}>{'Verify'}</Text>
              </TouchableOpacity>
            </View>
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
          colors={payment_status !== '1' ? COLORS.RED_GRAD : COLORS.GRAD}>
          <View style={styles.left}>
            <Image source={Images.gradientLogo} style={styles.img} />
          </View>
          <View style={styles.right}>
            <Text style={[styles.txt, {fontSize: adjust(20)}]}>{title}</Text>
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
                {invest_amount}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'My Investments'} isRightAction isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.WHITE : COLORS.MAIN},
            ]}
            onPress={() => setActive(false)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.MAIN : COLORS.WHITE},
              ]}>
              {'Individual/Enterprise'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.MAIN : COLORS.WHITE},
            ]}
            onPress={() => setActive(true)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.WHITE : COLORS.MAIN},
              ]}>
              {'Offers'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {active && data1 == undefined ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={[
                  styles.txt,
                  {
                    textAlign: 'center',
                    fontSize: FONT_SIZES.TITLE,
                  },
                ]}>
                No Investments Available
              </Text>
            </View>
          ) : data !== undefined ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
              }
              data={active ? data1 : data}
              renderItem={active ? renderItem1 : renderItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={[
                  styles.txt,
                  {
                    textAlign: 'center',
                    fontSize: FONT_SIZES.TITLE,
                  },
                ]}>
                No Investments Available
              </Text>
            </View>
          )}
          {/* <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            data={active ? data1 : data}
            renderItem={active ? renderItem1 : renderItem}
            showsVerticalScrollIndicator={false}
          /> */}
          {/* <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={[
              styles.txt,
              {
                textAlign: 'center',
                fontSize: FONT_SIZES.TITLE,
              },
            ]}>
            {'No Loan available'}
          </Text>
        </View> */}
        </View>
      </ImageBackground>
      <CustomButton
        label={active ? 'Check Loan Offers' : 'Check Investment Plans'}
        press={() =>
          navigation.navigate(active ? INVESTMENTOFFERS : NEWINVESTMENT)
        }
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
