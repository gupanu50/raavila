import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import ReadMore from '@fawazahmed/react-native-read-more';
import {arrayData} from '@/Types';
import {SCREENS} from '@/Constant';
import CustomTabBar from 'components/CustomTabBar';
import {useLazyGetLoanOffersQuery} from '@/Redux/services/loans';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';
const {APPLYLOAN} = SCREENS;

export default function LoanOffer(props: any) {
  const {navigation} = props;
  const [isRefresh, setIsRefresh] = useState(false);
  const [getLoanOffers, {isLoading, data}] = useLazyGetLoanOffersQuery();
  const isFocus = useIsFocused();

  useEffect(() => {
    getLoans();
  }, [isFocus]);

  const getLoans = async () => {
    var currentTime = new Date();
    var refetch = currentTime.getSeconds();
    try {
      await getLoanOffers(refetch);
      setIsRefresh(false);
    } catch (error) {
      setIsRefresh(false);
      console.log('error', error);
    }
  };

  console.log('===loanOffers===>', data);

  const onRefresh = () => {
    setIsRefresh(true);
    getLoans();
  };

  function renderItem(item: any) {
    const {title, description, amount,monthly_roi} = item.item;
    return (
      <View style={styles.slide}>
        <Text style={styles.txt}>{title}</Text>
        <ReadMore
          numberOfLines={3}
          seeMoreText={'Read More'}
          seeMoreStyle={styles.seeMore}
          style={[styles.txt, {top: adjust(-8), padding: adjust(5)}]}>
          {description}
        </ReadMore>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(APPLYLOAN, {amount: amount,roi:monthly_roi})}>
          <Text
            style={[
              styles.txt,
              {paddingTop: 0, paddingLeft: 0, color: COLORS.WHITE},
            ]}>
            {'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'Loan Offers'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          <FlatList
            data={data?.data}
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Loader loading={isLoading} />
      </ImageBackground>
      <CustomTabBar />
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
  slide: {
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: COLORS.WHITE,
  },
  txt: {
    fontSize: adjust(15),
    fontFamily: FONT_FAMILIES.AMERETTO,
    paddingTop: adjust(12),
    paddingLeft: adjust(8),
    color: COLORS.MAIN,
  },
  btn: {
    backgroundColor: COLORS.MAIN,
    height: adjust(40),
    borderBottomLeftRadius: adjust(5),
    borderBottomRightRadius: adjust(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMore: {
    textDecorationLine: 'underline',
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(14),
  },
});
