import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {Images} from '@/Assets';
import CustomTabBar from '@/Component/CustomTabBar';
import {
  useLazyCodStatusQuery,
  useLazyCommitteeCodStatusQuery,
} from '@/Redux/services/codStatus';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';
import {useLazyCodInvestmentStatusQuery} from '@/Redux/services/codStatus/codInvestment';

const CashStatus = (props: any) => {
  const {params} = props;
  console.log('=====statusParams===>', params);
  // @ts-ignore
  const [codStatus] = useLazyCodStatusQuery();
  // @ts-ignore
  const [committeeCodStatus] = useLazyCommitteeCodStatusQuery();
  // @ts-ignore
  const [codInvestmentStatus] = useLazyCodInvestmentStatusQuery();
  const isFocused = useIsFocused();
  const [Data, setData] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const onRefresh = () => {
    setIsRefresh(true);
    // {
    //   params?.naviName === 'committee'
    //     ? getCommitteeCodStatus()
    //     : params?.previousData?.naviName === 'investment' || 'investmentOffer'
    //     ? getInvestmentCodStatus()
    //     : getCodStatus();
    // }
    // setIsRefresh(false);
  };
  const getCodStatus = async () => {
    setLoading(true);
    const response: any = await codStatus('');
    console.log('==responseeee==>', response);
    if (!response?.data?.data) {
      setData('');
      setLoading(false);
      setIsRefresh(false);
    } else {
      setData(response?.data?.data);
      setLoading(false);
      setIsRefresh(false);
    }
  };
  const getCommitteeCodStatus = async () => {
    setLoading(true);
    const response: any = await committeeCodStatus('');
    console.log('committeecodstatus', response);
    if (!response?.data?.data) {
      setData('');
      setLoading(false);
      setIsRefresh(false);
    } else {
      setData(response?.data?.data);
      setLoading(false);
      setIsRefresh(false);
    }
  };
  const getInvestmentCodStatus = async () => {
    console.log('investmentcodcalled');
    setLoading(true);
    const response: any = await codInvestmentStatus('');
    console.log('investmentcodstatus', response?.data?.data);
    if (!response?.data?.data) {
      setData('');
      setLoading(false);
      setIsRefresh(false);
    } else {
      {
        params?.previousData?.naviName === 'investment'
          ? setData(response?.data?.data?.investment_cash_collect_status)
          : setData(response?.data?.data?.investment_offer_cash_collect_status);
      }
      setLoading(false);
      setIsRefresh(false);
    }
  };

  useEffect(() => {
    // {
    //   params?.committeEmiData?.naviName === 'committee' ||
    //   params?.committeData?.naviName === 'committee'
    //     ? getCommitteeCodStatus()
    //     : params?.previousData?.naviName === 'investment' || 'investmentOffer'
    //     ? getInvestmentCodStatus()
    //     : getCodStatus();
    // }
    {
      params?.committeEmiData?.naviName === 'committee' ||
      params?.committeData?.naviName === 'committee'
        ? getCommitteeCodStatus()
        : params?.previousData?.naviName === 'investment' ||
          params?.previousData?.naviName === 'investmentOffer'
        ? getInvestmentCodStatus()
        : getCodStatus();
    }
  }, [isFocused, isRefresh]);
  const renderDisplay = (item: any) => {
    const {otp, date, amount, cash_colleted} = item.item;
    return (
      <View style={styles.slide}>
        <View
          style={[
            styles.left,
            {width: cash_colleted !== 0 ? adjust(200) : adjust(180)},
          ]}>
          <Text style={[styles.txt, {color: COLORS.MAIN}]}>
            {'\u20B9'} {amount}
          </Text>
          <Text
            style={[styles.txt, {marginTop: adjust(0), fontSize: adjust(10)}]}>
            {moment(date).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={[
            styles.right,
            {
              backgroundColor:
                cash_colleted === 0 ? COLORS.GOLDYELLOW : COLORS.BLUE,
            },
          ]}>
          {cash_colleted === 0 ? (
            <>
              <Text
                style={[
                  styles.txt,
                  {color: COLORS.WHITE, paddingLeft: 0, fontSize: adjust(15)},
                ]}>
                {'OTP'}
              </Text>
              <Text
                style={[
                  styles.txt,
                  {paddingLeft: 0, fontSize: adjust(20), color: COLORS.WHITE},
                ]}>
                {otp}
              </Text>
            </>
          ) : (
            <Image source={Images.tick} style={styles.cashTickImage} />
          )}
        </View>
      </View>
      // <View style={styles.renderMainView}>
      //   <View style={styles.renderView}>
      //     <View
      //       style={[
      //         styles.renderView1,
      //         // { width: cash_colleted === 0 ? adjust(180) : adjust(220) },
      //       ]}>
      //       <Text style={styles.amountText}>
      //         {'\u20B9'} {amount}
      //       </Text>
      //       <Text style={styles.dateText}>
      //         {moment(date).format('DD/MM/YYYY')}
      //       </Text>
      //     </View>
      //     {cash_colleted === 0 ? (
      //       <View style={styles.otpView}>
      //         <Text style={styles.otpText}>OTP</Text>
      //         <Text style={styles.otpNumber}>{otp}</Text>
      //       </View>
      //     ) : (
      //       <View style={styles.cashTrueView}>
      //         <Image source={Images.tick} style={styles.cashTickImage} />
      //       </View>
      //     )}
      //   </View>
      // </View>
    );
  };

  console.log('===Data====>', Data);

  return (
    <>
      <View style={styles.container}>
        {Data?.length !== 0 ? (
          <FlatList
            data={Data}
            renderItem={renderDisplay}
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
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
              Please Make a Payment first
            </Text>
          </View>
        )}
      </View>
      <CustomTabBar />
      <Loader loading={loading} />
    </>
  );
};

export default CashStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: adjust(20),
  },
  renderMainView: {
    // height: adjust(70),
    // width: adjust(250),
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginVertical: adjust(5),
  },
  renderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  renderView1: {
    // height: adjust(70),
    justifyContent: 'center',
  },
  amountText: {
    marginLeft: adjust(10),
    color: COLORS.MAIN,
    fontSize: adjust(12),
  },
  dateText: {
    color: COLORS.MAIN,
    marginLeft: adjust(10),
    fontSize: adjust(8),
    marginTop: adjust(6),
  },
  otpView: {
    backgroundColor: COLORS.GOLDYELLOW,
    width: adjust(110),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: adjust(8),
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  otpNumber: {
    fontSize: adjust(20),
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  cashTrueView: {
    backgroundColor: COLORS.BLUE,
    width: adjust(70),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashTickImage: {
    tintColor: COLORS.WHITE,
    height: adjust(15),
    width: adjust(22),
  },
  notAvailabeText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(15),
    fontWeight: '400',
  },
  notAvailabeView: {
    justifyContent: 'center',
    flex: 1,
  },
  slide: {
    backgroundColor: COLORS.WHITE,
    height: adjust(50),
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    flexDirection: 'row',
  },
  left: {
    width: adjust(200),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: adjust(5),
    borderBottomLeftRadius: adjust(5),
    borderRightWidth: 0,
    borderColor: COLORS.BORDER_COLOR,
    justifyContent: 'center',
  },
  txt: {
    fontSize: adjust(13),
    color: COLORS.DARK,
    paddingLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  right: {
    flex: 1,
    borderRadius: adjust(5),
    borderTopRightRadius: adjust(5),
    borderBottomRightRadius: adjust(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
