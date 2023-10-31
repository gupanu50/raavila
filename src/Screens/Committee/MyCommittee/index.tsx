import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLazyGetMyCommitteeListingQuery} from '@/Redux/services/committee';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import adjust from '@/Component/adjust';
import RenderHTML from 'react-native-render-html';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import Loader from '@/ReusableComponent/Loader';
import {SCREENS} from '@/Constant';
import CustomTabBar from '@/Component/CustomTabBar';
const {COMMITTEEDETAILS} = SCREENS;
const MyCommittee = () => {
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [getMyCommitteeListing, {isLoading}] =
    useLazyGetMyCommitteeListingQuery<any>();
  const [data, setData] = useState();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const getMyCommittee = async () => {
    try {
      const refetch = Date.now();
      const response: any = await getMyCommitteeListing(refetch, false);
      console.log('responseGetMyCommittee', response?.data?.data);
      setData(response?.data?.data);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
    }
  };
  const onRefresh = () => {
    setIsRefresh(true);
    getMyCommittee();
  };
  const tagStyles = {
    ul: {
      fontSize: adjust(10),
      fontFamily: FONT_FAMILIES.AMERETTO,
      color: COLORS.DARK,
      paddingLeft: adjust(21),
    },
    li: {
      fontSize: adjust(10),
      fontFamily: FONT_FAMILIES.AMERETTO,
      color: COLORS.DARK,
    },
  };
  useEffect(() => {
    getMyCommittee();
  }, [isFocused, isRefresh]);
  const renderItem = (item: any) => {
    const {
      committee,
      committee_installments,
      month,
      committee_id,
      cash_collect_otp,
    } = item.item;
    const {name, amount, duration, description} = committee[0];
    const HTML: any = {
      html: description,
    };
    return (
      <View style={styles.boxView}>
        <Text style={styles.txt}>{name}</Text>
        <View style={styles.rowView}>
          <Text style={styles.valueText}>{`${'\u20B9'} ${amount}/month`}</Text>
          <Text
            style={[
              styles.valueText,
              {marginRight: adjust(10)},
            ]}>{`${duration} months`}</Text>
        </View>
        <RenderHTML
          source={HTML}
          contentWidth={adjust(100)}
          tagsStyles={tagStyles}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(COMMITTEEDETAILS, {
              committeeName: name,
              committeeAmount: amount,
              committeeDuration: duration,
              committeeMonth: month,
              committeeInstallment: committee_installments,
              committeeId: committee_id,
              otp: cash_collect_otp,
            })
          }>
          <View style={styles.bottomView}>
            <Text style={styles.investNowText}>View Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {data !== null ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            data={data}
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
              No Committee Available
            </Text>
          </View>
        )}
      </View>
      <CustomTabBar />
      <Loader loading={isLoading} />
    </View>
  );
};

export default MyCommittee;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: adjust(15),
  },
  boxView: {
    // height: adjust(160),
    marginBottom: adjust(10),
    borderRadius: 10,
    // width: adjust(260),
    backgroundColor: COLORS.WHITE,
    // marginLeft: adjust(30),
    // marginTop: adjust(20)
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: adjust(25),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.DARK,
  },
  valueText: {
    color: COLORS.DARK,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    // marginTop: adjust(10),
    fontWeight: '400',
  },
  bottomView: {
    backgroundColor: COLORS.MAIN,
    height: adjust(35),
    marginTop: adjust(9),
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  investNowText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    // marginTop: adjust(10),
    fontWeight: '400',
  },
  txt: {
    color: COLORS.DARK,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    marginTop: adjust(10),
  },
});
