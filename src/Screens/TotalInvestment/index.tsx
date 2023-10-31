import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/ReusableComponent/Header';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import adjust from 'components/adjust';
import {Images} from '@/Assets';
import InvestmentReports from './InvestmentReports';
import ReturnReports from './Return Reports';
import {useLazyTotalInvestmentQuery} from '@/Redux/services/investments';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';

const TotalInvestment = () => {
  const isFocus = useIsFocused();
  const [totalInvestment, {data, isLoading}] = useLazyTotalInvestmentQuery();
  const [active, setActive] = useState<number>(0);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    getInvestment();
  }, [isFocus,isRefresh]);

  const getInvestment = async () => {
    try {
      const date = new Date();
      const refetch = date.getSeconds();
      await totalInvestment(refetch);
      setIsRefresh(false);
    } catch (error) {
      console.log('==error==>', error);
      setIsRefresh(false);
    }
  };

  console.log('====data==>', data);

  return (
    <View style={styles.container}>
      <Header title="My Total Investment" isBack />
      <View style={{margin: adjust(15)}}>
        <View style={styles.boxView}>
          <View style={styles.boxInnerView}>
            <View style={styles.boxInnerView1}>
              <Text style={styles.text}>My Investment</Text>
              <Text style={[styles.text, styles.text1]}>
                {'\u20B9'} {data?.total_investment?data?.total_investment:0}
              </Text>
            </View>
            <Image source={Images.line2} style={styles.lineImage} />
            <View style={styles.boxInnerView2}>
              <Text style={styles.text}>Gain in %</Text>
              <Text style={[styles.text, styles.text1]}>
                {data?.gain_roi?data?.gain_roi:0} %
              </Text>
            </View>
          </View>
          <View style={styles.boxInnerBottomView2}>
            <View style={styles.boxInnerView}>
              <Text style={[styles.text, styles.text2]}>Gain in Rupee</Text>
              <Image source={Images.polygon} style={styles.polygonImage} />
              <Text style={[styles.text, styles.text2]}>
                {' '}
                {'\u20B9'} {data?.gain_rupees?data?.gain_rupees:0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ImageBackground source={Images.background}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={[
              styles.headerTextButtonTextView,
              {backgroundColor: active === 0 ? COLORS.MAIN : COLORS.WHITE},
            ]}
            onPress={() => setActive(0)}>
            <View>
              <Text
                style={[
                  styles.headerTextButtonText,
                  {color: active === 0 ? COLORS.WHITE : COLORS.MAIN},
                ]}>
                Investment Reports
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerTextButtonTextView,
              {backgroundColor: active === 1 ? COLORS.MAIN : COLORS.WHITE},
            ]}
            onPress={() => setActive(1)}>
            <View>
              <Text
                style={[
                  styles.headerTextButtonText,
                  {color: active === 1 ? COLORS.WHITE : COLORS.MAIN},
                ]}>
                Return Reports
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {active === 0 ? (
        <InvestmentReports data={data?.data} isRefresh={isRefresh} setRefresh={setIsRefresh}/>
      ) : (
        <ReturnReports data={data?.data} isRefresh={isRefresh} setRefresh={setIsRefresh}/>
      )}
      <Loader loading={isLoading} />
    </View>
  );
};

export default TotalInvestment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(14),
    fontWeight: '400',
    color: COLORS.DARK,
  },
  text1: {
    marginTop: adjust(4),
    fontSize: adjust(16),
  },
  text2: {
    color: COLORS.WHITE,
  },
  boxView: {
    backgroundColor: COLORS.WHITE,
    height: adjust(110),
    // width: adjust(280),
    // marginTop: adjust(10),
    borderRadius: 5,
  },
  boxInnerView: {
    flexDirection: 'row',
  },
  boxInnerView1: {
    width: '50%',
    height: adjust(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineImage: {
    marginTop: adjust(23),
  },
  boxInnerView2: {
    width: '50%',
    height: adjust(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInnerBottomView2: {
    backgroundColor: COLORS.BLUE,
    // width: adjust(280),
    height: adjust(30),
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygonImage: {
    marginLeft: adjust(15),
    marginTop: adjust(4),
  },
  headerView: {
    height: adjust(30),
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
  },
  headerTextButtonTextView: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextButtonText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
    fontWeight: '400',
  },
});
