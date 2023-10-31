import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@/ReusableComponent/Header';
import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '@/Component/CustomTabBar';
import {useLazyInvestmentOfferQuery} from '@/Redux/services/investments';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '@/ReusableComponent/Loader';
import {SCREENS} from '@/Constant';
const {INDIVISUALDETAILS} = SCREENS;

const Offers = (props: any) => {
  const {navigation} = props;
  const [investmentOffer, {isLoading, data}] = useLazyInvestmentOfferQuery();
  const isFocus = useIsFocused();

  useEffect(() => {
    var currentTime = new Date();
    var refetch = currentTime.getSeconds();
    investmentOffer(refetch);
  }, [isFocus]);


  const PickupData = [
    {
      key: 1,
      text: `Invest ${'\u20B9'}7,387 and get 25% ROI for 6 Months`,
      bottomText: 'Valid from 7th Aug. 2023 to 2nd Feb. 2024',
      image: Images.offer,
    },
    {
      key: 2,
      text: `Invest ${'\u20B9'}7,387 and get 25% ROI for 6 Months`,
      bottomText: 'Valid from 7th Aug. 2023 to 2nd Feb. 2024',
      image: Images.offer,
    },
    {
      key: 3,
      text: `Invest ${'\u20B9'}7,387 and get 25% ROI for 6 Months`,
      bottomText: 'Valid from 7th Aug. 2023 to 2nd Feb. 2024',
      image: Images.offer,
    },
    {
      key: 4,
      text: `Invest ${'\u20B9'}7,387 and get 25% ROI for 6 Months`,
      bottomText: 'Valid from 7th Aug. 2023 to 2nd Feb. 2024',
      image: Images.offer,
    },
  ];
  const renderDisplay = (item: any) => {
    const {
      id,
      start_date,
      end_date,
      roi,
      amount,
      tenure,
      daily_roi,
      monthly_roi,
      yearly_roi,
      package_plan_name
    } = item.item;

    let investFor:string;
    let ROI:string;
    let gettingAmount: any = 0;
    if (roi == 'Daily ROI') {
      ROI = daily_roi;
      gettingAmount = ((amount * (daily_roi / 100)) / 30).toFixed(2);
      investFor = '1';
    } else if (roi == 'Monthly ROI') {
      ROI = monthly_roi;
      gettingAmount = (amount * (monthly_roi / 100)).toFixed(2);
      investFor = '2';
    } else {
      ROI = yearly_roi;
      gettingAmount = (amount * (yearly_roi / 100) * 12).toFixed(2);
      investFor = '3';
    }

    function getDaySuffix(day: any) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    function dateConverter(date: any) {
      var dateObj = new Date(date);
      var options: any = {day: 'numeric', month: 'short', year: 'numeric'};

      var formattedDate = dateObj.toLocaleDateString('en-US', options);
      var day = dateObj.getDate();
      // Add suffix to day
      var dayWithSuffix = day + getDaySuffix(day);
      formattedDate = formattedDate.replace(String(day), dayWithSuffix);
      return formattedDate;
    }

    return (
      <View style={styles.renderMainView}>
        <TouchableOpacity onPress={() => navigation.navigate(INDIVISUALDETAILS, {
          offerId:id,
          offerType:package_plan_name+'_plan',
          offerFor:investFor,
          offerAmount:amount,
          offerRoi:ROI,
          offerGetAmount:gettingAmount,
          offerFrom:start_date,
          offerTo:end_date
        })}>
          <LinearGradient
            colors={['#DADADA', '#FFFFFF', '#DADADA']}
            style={styles.renderMainView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={styles.renderView}>
              <View style={styles.renderView2}>
                <Image source={Images.offer} />
              </View>
              <View style={styles.renderView3}>
                <Text
                  style={
                    styles.textMain
                  }>{`Invest ${'\u20B9'}${amount} and get ${ROI}% ${roi} for ${tenure} Months`}</Text>
              </View>
            </View>
            <LinearGradient
              colors={['#604536', '#EBAA8A', '#604536']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.renderView1}>
              <Text style={styles.bottomText}>{`Valid from ${dateConverter(
                start_date,
              )} to ${dateConverter(end_date)}`}</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <Header title="Investment Offers" isBack />
        <View style={{flex: 1, margin: adjust(15)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.data}
            renderItem={renderDisplay}
          />
        </View>
      </View>
      <Loader loading={isLoading} />
      <CustomTabBar />
    </>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  renderMainView: {
    height: adjust(100),
    // width: adjust(270),
    borderRadius: 10,
    marginVertical: adjust(5),
  },
  renderView: {
    flexDirection: 'row',
    height: adjust(70),
  },
  renderView1: {
    height: adjust(29),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderView2: {
    width: adjust(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderView3: {
    width: adjust(175),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: adjust(15),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.BLACK,
    fontWeight: '400',
  },
  bottomText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
  },
});
function getDaySuffix(day: number) {
  throw new Error('Function not implemented.');
}
