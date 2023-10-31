import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import adjust from '@/Component/adjust';
import {useLazyWithdrawalStatusQuery} from '@/Redux/services/withdrawal';
import Loader from '@/ReusableComponent/Loader';
import {Images} from '@/Assets';
export default function WithdrawalStatus() {
  const isFocused = useIsFocused();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [requestAmount, setRequestAmount] = useState<string | number>(0);
  const [amountDeduct, setAmountDeduct] = useState<string | number>(0);
  const [creditAmount, setCreditAmount] = useState<string | number>(0);
  const [withdrawalStatus, {data, isLoading}] = useLazyWithdrawalStatusQuery();
  const withDrawal = async () => {
    try {
      const date = new Date();
      const refetch = date.getSeconds();
      await withdrawalStatus(refetch);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
      console.log('=====error Occured====>', error);
    }
  };

  useEffect(() => {
    withDrawal();
  }, [isFocused, isRefresh]);

  function renderItem(item: any) {
    const {
      amount,
      created_at,
      status,
      bank_account,
      admin_deduction_amount,
      transfered_amount,
    } = item.item;
    let colorValue: string;
    let statusMsg: string;
    if (status == 1) {
      colorValue = '#FEC514';
      statusMsg = 'Pending';
    } else if (status == 2) {
      colorValue = '#00BFB3';
      statusMsg = 'Success';
    } else {
      colorValue = '#BD271E';
      statusMsg = 'Rejected';
    }

    return (
      <View style={styles.slide}>
        <View style={styles.left}>
          <View>
            <Text style={[styles.txt, {fontSize: FONT_SIZES.LABEL}]}>
              {bank_account}
            </Text>
            <Text style={[styles.txt, {color: COLORS.MAIN}]}>
              {status == '2' ? transfered_amount : amount}
            </Text>
            <Text
              style={[
                styles.txt,
                {marginTop: adjust(0), fontSize: FONT_SIZES.LABEL},
              ]}>
              {moment(created_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          {status == '2' ? (
            <View style={styles.recieptView}>
              <TouchableOpacity
                style={styles.recieptBtn}
                onPress={() => {
                  setVisible(true);
                  setRequestAmount(amount);
                  setAmountDeduct(admin_deduction_amount);
                  setCreditAmount(transfered_amount);
                }}>
                <Image source={Images.reciept} style={styles.recieptImg} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View
          style={[
            styles.right,
            {
              backgroundColor: colorValue,
            },
          ]}>
          <Text
            style={[
              styles.txt,
              {
                paddingLeft: 0,
                fontSize: FONT_SIZES.PRIMARY,
                color: COLORS.WHITE,
              },
            ]}>
            {statusMsg}
          </Text>
        </View>
        <Modal animationType={'slide'} transparent={true} visible={visible}>
          <View style={styles.modalview}>
            <View style={[styles.modal, {}]}>
              <View style={styles.cross}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}
                  style={styles.crossbtn}>
                  <Image style={styles.close} source={Images.cross} />
                </TouchableOpacity>
              </View>
              <View style={styles.cashView}>
                <View style={styles.cashView1}>
                  <Image
                    source={Images.reciept}
                    style={{
                      tintColor: COLORS.WHITE,
                      resizeMode: 'contain',
                      height: '100%',
                      width: '70%',
                    }}
                  />
                </View>
                <Text style={styles.confirmText}>
                  {'Withdraw Success Reciept'}
                </Text>
                <Text style={styles.otpText}>
                  {`Amount Requested : ₹${requestAmount}`}
                </Text>
                <Text style={styles.otpText}>
                  {`Admin Deduction : ₹${amountDeduct}`}
                </Text>
                <Text style={styles.otpText}>
                  {`Amount Credited : ₹${creditAmount}`}
                </Text>
                <Text style={[styles.confirmText, {padding: adjust(10)}]}>
                  {
                    'If you have any querry then raise a ticket in support section'
                  }
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  function onRefresh() {
    setIsRefresh(true);
  }

  return (
    <>
      {data?.data?.length > 0 ? (
        <FlatList
          data={[...(data?.data ?? [])].reverse()}
          // inverted={true}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
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
            No WithDrawals Yet
          </Text>
        </View>
      )}
      <Loader loading={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: COLORS.WHITE,
    // height: adjust(50),
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    flexDirection: 'row',
  },
  left: {
    width: adjust(200),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderTopLeftRadius: adjust(5),
    // borderBottomLeftRadius: adjust(5),
    // borderRightWidth: 0,
    // borderColor: COLORS.BORDER_COLOR,
    // justifyContent: 'center',
    padding: adjust(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: adjust(13),
    color: COLORS.DARK,
    paddingLeft: adjust(8),
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
  recieptView: {width: adjust(30)},
  recieptBtn: {
    width: '100%',
    height: adjust(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  recieptImg: {
    width: '70%',
    height: '100%',
    resizeMode: 'contain',
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
    height: adjust(40),
    width: adjust(40),
    backgroundColor: COLORS.DARK,
    borderRadius: adjust(40 / 2),
    justifyContent: 'center',
  },
});
