import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useGetCommitteeListingQuery} from '@/Redux/services/committee';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {SCREENS} from '@/Constant';
import RenderHTML from 'react-native-render-html';
import Loader from '@/ReusableComponent/Loader';
import CustomTabBar from '@/Component/CustomTabBar';
import {useNavigation} from '@react-navigation/native';
const {PAYCASH, INDIVISUALDETAILS} = SCREENS;
const NewCommittee = () => {
  const navigation: any = useNavigation();
  const {data, isLoading} = useGetCommitteeListingQuery<any>('');
  type CommitteeType = {
    id: number;
    description: string;
    amount: number;
    duration: number;
    name: string;
  };
  const listing: [CommitteeType] = data?.data;
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
  const purchaseCommittee = async (itemData: any) => {
    navigation.navigate(INDIVISUALDETAILS, {
      committee_id: itemData.id,
      committee_amount: itemData.amount,
      naviName: 'committee',
    });
    // navigation.navigate(PAYCASH, {
    //     committee_id: itemData.id,
    //     committee_amount: itemData.amount, naviName: 'committee'
    // })
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, margin: adjust(15)}}>
            {listing?.map((committee: CommitteeType) => {
              const HTML: any = {
                html: committee?.description,
              };
              return (
                <View key={committee.id} style={styles.boxView}>
                  <Text style={styles.txt}>{committee.name}</Text>
                  <View style={styles.rowView}>
                    <Text style={styles.valueText}>{`${'\u20B9'} ${
                      committee.amount
                    }/month`}</Text>
                    <Text
                      style={[
                        styles.valueText,
                        {marginRight: adjust(10)},
                      ]}>{`${committee.duration} months`}</Text>
                  </View>
                  <RenderHTML
                    source={HTML}
                    contentWidth={adjust(100)}
                    tagsStyles={tagStyles}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      purchaseCommittee(committee);
                    }}>
                    <View style={styles.bottomView}>
                      <Text style={styles.investNowText}>Invest Now</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <Loader loading={isLoading} />
      </View>
      <CustomTabBar />
    </>
  );
};

export default NewCommittee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  txt: {
    color: COLORS.DARK,
    fontSize: FONT_SIZES.PRIMARY,
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(12),
    marginTop: adjust(10),
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
});
