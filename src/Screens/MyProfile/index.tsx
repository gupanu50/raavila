import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {myProfile} from '@/Types';
import {SCREENS} from '@/Constant';
import {useIsFocused} from '@react-navigation/native';
import {
  useGetProfileQuery,
  useLazyGetProfileQuery,
} from '@/Redux/services/profile/profile';
const {EDITPROFILE, EDITBANK, BANKACCOUNTDETAILS} = SCREENS;
import Loader from '@/ReusableComponent/Loader';
import KYCStatus from '@/ReusableComponent/KYC';
import {useAppSelector} from '@/Redux/hooks/hooks';
export default function MyProfile(props: any) {
  const {navigation} = props;
  const isFoc = useIsFocused();
  const token = useAppSelector(state => state?.auth?.token);
  const [data, setData] = useState<any>();
  const userInfo = (user?: any): myProfile[] => [
    {name: 'Full Name', value: user.name},
    {name: "Mother's Name", value: user.mother_name},
    {name: "Father's Name", value: user.father_name},
    // {name: 'Date of Birth', value: user.dob},
    {name: 'Date of Birth', value: new Date(user.dob).toISOString().slice(0, 10)},
    {
      name: 'Maritial Status',
      value:
        user.marital_status === '1'
          ? 'Single'
          : user.marital_status === '2'
          ? 'Married'
          : 'Divorced',
    },
    {
      name: 'Physically Disabled',
      value: user.physically_disable === '1' ? 'No' : 'Yes',
    },
    {name: 'Occupation', value: user.occupation},
  ];
  const [getProfile, result] = useLazyGetProfileQuery<any>();
  // var ref = useRef(Date.now()).current
  const {data:data1,refetch} = useGetProfileQuery('');
  const getProfileInfo = async () => {
    const refetch = Date.now();
    console.log('====refetch===>',refetch);
    const data = await getProfile(refetch, false).unwrap();
    setData(data);
    console.log('Data caching', data);
  };
  useEffect(() => {
    getProfileInfo();
  }, [isFoc]);

  const profile = result.currentData?.data;
  console.log('proppp', data);

  function renderData(item: any) {
    const {name, value} = item.item;

    return (
      <View style={styles.slide}>
        <Text
          style={[
            styles.txt,
            {textAlign: 'left', color: COLORS.DARK, paddingTop: 0},
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.txt,
            {textAlign: 'left', color: COLORS.MAIN, paddingTop: 0},
          ]}>
          {value}
        </Text>
      </View>
    );
  }

  const addBank = () => {
    if (!profile?.kyc_status) {
      return;
    }
    navigation.navigate(EDITBANK, {bank: profile?.bank,isBank:true});
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  }, []);
  if (result?.isLoading)
    return (
      <View style={styles.container}>
        <Loader loading={result?.isLoading} />
      </View>
    );
  if (!profile)
    return (
      <View style={styles.container}>
        <Loader loading={result?.isLoading} />
      </View>
    );
  const DATA = userInfo(profile);
  return (
    <View style={styles.container}>
      <Header
        title={'My Profile'}
        isBack
        isRightAction={'edit'}
        screen={EDITPROFILE}
        data={profile}
      />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <ImageBackground source={Images.bgcurve} style={styles.curve} />
          <View style={styles.inside}>
            <View style={styles.first}>
              <View style={styles.circle}>
                <View style={styles.circ}>
                  <Image
                    source={{uri: profile.profile_pic}}
                    style={styles.profileimg}
                  />
                </View>
              </View>
            </View>
            <View style={styles.flatView}>
              <FlatList
                data={DATA}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderData}
              />
            </View>
            <Text style={[styles.txt, {color: COLORS.DARK, textAlign: 'left'}]}>
              {'AADHAR'}
            </Text>
            <Image source={{uri: profile.aadhar}} style={styles.dummy} />
            <Text style={[styles.txt, {color: COLORS.DARK, textAlign: 'left'}]}>
              {'PAN Card'}
            </Text>
            <Image
              source={{uri: profile.pan_card}}
              style={[styles.dummy, {width: adjust(250), height: adjust(150)}]}
            />
            <Text style={[styles.txt, {color: COLORS.DARK, textAlign: 'left'}]}>
              {'Communication Address'}
            </Text>
            <Text
              style={[
                styles.txt,
                {color: COLORS.MAIN, textAlign: 'left', paddingTop: adjust(2)},
              ]}>
              {profile.comm_address}
            </Text>
            <Image source={Images.line} style={styles.line} />
            <View style={styles.account}>
              <View>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: COLORS.DARK,
                      textAlign: 'left',
                      paddingTop: 0,
                    },
                  ]}>
                  {'Account Holder Name'}
                </Text>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: COLORS.MAIN,
                      textAlign: 'left',
                      paddingTop: adjust(2),
                    },
                  ]}>
                  {profile?.bank[0]?.account_holder_name}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={styles.addBtn} onPress={addBank}>
                  <Image source={Images.add} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={[
                styles.txt,
                {
                  color: COLORS.DARK,
                  textAlign: 'left',
                  paddingTop: adjust(2),
                  marginTop: adjust(5),
                },
              ]}>
              {'Account Number'}
            </Text>
            <Text
              style={[
                styles.txt,
                {color: COLORS.MAIN, textAlign: 'left', paddingTop: adjust(2)},
              ]}>
              {profile?.bank[0]?.account_number}
            </Text>
            <Text
              style={[
                styles.txt,
                {
                  color: COLORS.DARK,
                  textAlign: 'left',
                  paddingTop: adjust(2),
                  marginTop: adjust(9),
                },
              ]}>
              {'IFSC Code'}
            </Text>
            <Text
              style={[
                styles.txt,
                {color: COLORS.MAIN, textAlign: 'left', paddingTop: adjust(2)},
              ]}>
              {profile?.bank[0]?.ifsc_code}
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate(BANKACCOUNTDETAILS)}>
            <Text
              style={[
                styles.txt,
                {
                  color: COLORS.DARK,
                  textAlign: 'left',
                  paddingTop: adjust(2),
                  marginTop: adjust(9),
                  textDecorationLine: 'underline'
                },
              ]}>
              {'View More'}
            </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  curve: {
    // width: adjust(350),
    width: '100%',
    // height:adjust(110),
    height: '35%',
    // backgroundColor:"green"
    // resizeMode: 'stretch',
  },
  bgImg: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  inside: {
    flex: 1,
    margin: adjust(20),
    // top: adjust(-100),
    top: adjust(-330),
    marginBottom: adjust(30),
    // backgroundColor:'orange'
  },
  bottom: {
    backgroundColor: COLORS.MAIN,
    height: adjust(45),
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    textAlign: 'center',
    paddingTop: adjust(10),
  },
  first: {
    height: adjust(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: adjust(10),
    // top: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circ: {
    height: adjust(85),
    width: adjust(85),
    borderRadius: adjust(85 / 2),
  },
  profileimg: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: adjust(85 / 2),
  },
  flatView: {
    height: adjust(250),
  },
  slide: {
    height: adjust(50),
    width: adjust(120),
    marginVertical: adjust(5),
    marginHorizontal: adjust(10),
  },
  dummy: {
    height: adjust(120),
    width: adjust(250),
    marginTop: adjust(7),
  },
  line: {
    // marginTop:adjust(20),
    width: '100%',
    marginVertical: adjust(20),
  },
  account: {
    height: adjust(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addBtn: {
    height: adjust(22),
    width: adjust(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
