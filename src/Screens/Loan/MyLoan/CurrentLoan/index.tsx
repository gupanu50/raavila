import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {arrayData} from '@/Types';
import {FlatList} from 'react-native-gesture-handler';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {SCREENS} from '@/Constant';
import {Images} from '@/Assets';
import {useLazyGetMyLoansQuery} from '@/Redux/services/loans';
import Loader from '@/ReusableComponent/Loader';
import {useIsFocused} from '@react-navigation/native';

export default function CurrentLoan(props: any) {
  const {navigation} = props;
  const isFocus: any = useIsFocused();
  const [getMyLoans, {data, isLoading}] = useLazyGetMyLoansQuery();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    getLoans();
  }, [isFocus, isRefresh]);

  const getLoans = async () => {
    var currentTime = new Date();
    var refetch = currentTime.getSeconds();
    try {
      await getMyLoans(refetch);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
      console.log('error', error);
    }
  };


  function renderItem(item: any) {
    const {loan_request_name, amount, roi, status} = item.item;
    let COLOR: string;
    let STATUS: string;
    if (status == 0) {
      COLOR = '#FEC514';
      STATUS = 'Inactive';
    } else if (status == 1) {
      COLOR = '#00BFB3';
      STATUS = 'Active';
    } else {
      COLOR = '#BD271E';
      STATUS = 'Rejected';
    }

    return (
      <View style={styles.slide}>
        <View style={styles.first}>
          <View style={styles.up}>
            <Text style={styles.txt}>{'Loan Account'}</Text>
            <Text
              style={[
                styles.txt,
                {paddingTop: adjust(3), fontSize: adjust(17)},
              ]}>
              {loan_request_name}
            </Text>
          </View>
          <View
            style={[
              styles.up,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={styles.left}>
              <Text style={styles.txt}>{'Loan Amount'}</Text>
              <View style={styles.insideLeft}>
                <Image source={Images.rupee} style={styles.rupee} />
                <Text
                  style={[
                    styles.txt,
                    {
                      paddingTop: 0,
                      fontSize: adjust(17),
                      paddingLeft: adjust(3),
                    },
                  ]}>
                  {amount}
                </Text>
              </View>
            </View>
            <View style={styles.left}>
              <Text style={[styles.txt, {paddingLeft: 0}]}>{'ROI'}</Text>
              <Text style={[styles.txt, {paddingLeft: 0, paddingTop: 0}]}>
                {roi} %
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.btn, {backgroundColor: COLOR}]}>
          <Text
            style={[
              styles.txt,
              {paddingTop: 0, paddingLeft: 0, color: COLORS.WHITE},
            ]}>
            {STATUS}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      {data?.data.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => setIsRefresh(true)}
            />
          }
          data={data?.data}
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
            {'No Loan available'}
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
    height: adjust(180),
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
  },
  btn: {
    backgroundColor: COLORS.MAIN,
    borderBottomLeftRadius: adjust(5),
    borderBottomRightRadius: adjust(5),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    paddingTop: adjust(12),
    paddingLeft: adjust(13),
    color: COLORS.MAIN,
  },
  first: {
    height: adjust(140),
  },
  up: {
    height: adjust(60),
  },
  left: {
    width: adjust(100),
  },
  rupee: {
    height: adjust(15),
    width: adjust(10),
    marginLeft: adjust(12),
    tintColor: COLORS.MAIN,
  },
  insideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
