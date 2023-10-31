import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/ReusableComponent/Header';
import CustomTabBar from '@/Component/CustomTabBar';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import CustomButton from '@/Component/CustomButton';
import moment from 'moment';
import {SCREENS} from '@/Constant';
import {useLazyGetMyCommitteeListingQuery} from '@/Redux/services/committee';
import {useIsFocused} from '@react-navigation/native';
const {PAYCASH, INDIVISUALDETAILS, PAYMENTOTP} = SCREENS;
const ViewDetails = (props: any) => {
  const {route, navigation} = props;
  const {params} = route;
  const data = params?.committeeInstallment;
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [getMyCommitteeListing, {isLoading, data: committeeData}] =
    useLazyGetMyCommitteeListingQuery<any>();
  const isFocus: any = useIsFocused();
  useEffect(() => {
    getMyCommittee();
  }, [isFocus, isRefresh]);

  const getMyCommittee = async () => {
    try {
      const refetch = Date.now();
      await getMyCommitteeListing(refetch, false);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
    }
  };

  const selectedCommitteeInstallment = committeeData?.data.find(
    (obj: any) => obj.committee_id === params?.committeeId,
  ).committee_installments;
  const cashCollectOtp = committeeData?.data.find(
    (obj: any) => obj.committee_id === params?.committeeId,
  ).cash_collect_otp;

  const renderDisplay = (item: any) => {
    const {
      committee_account,
      installment_amount,
      date,
      payment_status,
      committee_id,
    } = item?.item;
    return (
      <View style={[styles.renderView,{}]}>
        <View style={[styles.rowView1,{}]}>
          <Text style={styles.renderCommitteeAccount}>{committee_account}</Text>
          <Text
            style={[
              styles.renderCommitteeAccount,
              {marginRight: adjust(20)},
            ]}>{`${'\u20B9'}${installment_amount}`}</Text>
        </View>
        <Text style={styles.renderCommitteeDate}>
          {moment(date).format('DD/MM/YY')}
        </Text>
        {payment_status == 2 ? (
          <View style={styles.otpView}>
            <View style={styles.otpV}>
              <Text style={styles.txt}>{`Your Otp : ${cashCollectOtp}`}</Text>
            </View>
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={() =>
                navigation.navigate(PAYMENTOTP, {
                  otp: cashCollectOtp,
                  committeeAccount: committee_account,
                  committeeId: committee_id,
                })
              }>
              <Text style={[styles.txt, {color: 'white'}]}>{'Verify'}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  const payCommitteeCash = () => {
    navigation.navigate(INDIVISUALDETAILS, {
      committeeMonth: params?.committeeMonth,
      committeeAccount: params?.committeeInstallment[0]?.committee_account,
      committeeId: params?.committeeId,
      committeeAmount: params?.committeeInstallment[0]?.installment_amount,
      naviName: 'committee',
    });
    // navigation.navigate(PAYCASH,
    //     {
    //         committeeMonth: params?.committeeMonth,
    //         committeeAccount: params?.committeeInstallment[0]?.committee_account,
    //         committeeId: params?.committeeId,
    //         committeeAmount: params?.committeeInstallment[0]?.installment_amount,
    //         naviName: 'committee'
    //     }
    //     )
    console.log(
      'SendingData',
      params?.committeeMonth,
      params?.committeeInstallment[0]?.committee_account,
      params?.committeeId,
      params?.committeeInstallment[0]?.installment_amount,
    );
  };
  return (
    <>
      <View style={styles.main}>
        <Header title="Committee Details" isBack />
        <View style={styles.main1}>
          <View style={styles.container}>
            <View style={styles.rowView}>
              <Text style={styles.headingText}>Committee Name</Text>
              <Text style={styles.valueText}>{params?.committeeName}</Text>
              <Text style={[styles.headingText, styles.spaceBetween]}>
                Amount
              </Text>
              <Text style={styles.valueText}>{params?.committeeAmount}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.headingText}>Duration</Text>
              <Text style={styles.valueText}>{params?.committeeDuration}</Text>
              <Text style={[styles.headingText, styles.spaceBetween]}>
                Installments Paid
              </Text>
              <Text
                style={
                  styles.valueText
                }>{`${params?.committeeMonth}/${params?.committeeDuration} months`}</Text>
            </View>
          </View>
          <Text style={styles.previousText}>Previous Installments</Text>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefresh}
                onRefresh={() => setIsRefresh(true)}
              />
            }
            data={selectedCommitteeInstallment}
            renderItem={renderDisplay}
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
          />
        </View>
        <View style={styles.bottomButtonView}>
          <CustomButton
            label="Pay Now"
            containerStyle={{width: '50%'}}
            style={{
              backgroundColor: cashCollectOtp ? COLORS.GRAY : COLORS.MAIN,
            }}
            txtStyle={{color: cashCollectOtp ? COLORS.DARK : COLORS.WHITE}}
            disabled={cashCollectOtp ? true : false}
            press={() => payCommitteeCash()}
          />
          <CustomButton
            label="Export"
            containerStyle={{width: '50%', marginLeft: '1%'}}
          />
        </View>
      </View>
      <CustomTabBar />
    </>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headingText: {
    fontSize: FONT_SIZES.LABEL,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '500',
    color: COLORS.DARK,
  },
  valueText: {
    fontSize: FONT_SIZES.SUB_HEADING,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '500',
    color: COLORS.DARK,
  },
  rowView: {
    width: '50%',
  },
  container: {
    flexDirection: 'row',
    height: adjust(90),
  },
  main1: {
    flex: 1,
    margin: adjust(15),
  },
  spaceBetween: {
    marginTop: adjust(20),
  },
  previousText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '500',
    color: COLORS.DARK,
    marginTop: adjust(10),
  },
  renderView: {
    // height: adjust(70),
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    marginVertical: adjust(5),
    justifyContent: 'center',
    padding: adjust(8),
  },
  flatListStyle: {
    marginTop: adjust(5),
  },
  bottomButtonView: {
    flexDirection: 'row',
  },
  renderCommitteeAccount: {
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '500',
    color: COLORS.DARK,
    marginLeft: adjust(10),
  },
  renderCommitteeDate: {
    fontSize: FONT_SIZES.LABEL,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '500',
    color: COLORS.MAIN,
    marginLeft: adjust(10),
    marginTop: adjust(7),
  },
  rowView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpView: {
    flexDirection: 'row',
    height: '35%',
    margin: adjust(5),
    justifyContent: 'space-between',
  },
  otpV: {
    backgroundColor: 'white',
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
    borderColor: COLORS.DARK,
    borderWidth: 1,
  },
  verifyBtn: {
    backgroundColor: COLORS.MAIN,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
  },
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
});
