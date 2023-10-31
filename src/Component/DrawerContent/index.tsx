import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import {Divider, Image, ListItem} from 'react-native-elements';
import {COLORS, FONT_FAMILIES, FONT_SIZES, METRICS} from '@/Configration';
import {Images} from '@/Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from '@/Constant';
import {drawerMenu, drawerSelect} from '@/Types';
import adjust from 'components/adjust';
import {useDrawerStatus} from '@react-navigation/drawer';
import CustomButton from '../CustomButton';
import {purgeStore} from '@/Redux/store/store';
import {useAuth} from '@/Redux/hooks/auth';
import {useAppDispatch, useAppSelector} from '@/Redux/hooks/hooks';
import {
  useGetProfileQuery,
  useLazyGetProfileQuery,
} from '@/Redux/services/profile/profile';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {setCredentials} from '@/Redux/services/auth/authSlice';
import {useSignInViaSocialHook} from '@/Screens/Auth/Login/useLoginHook';
const {
  MAIN,
  LOGIN,
  TOTALINVESTMENT,
  COMMITTEE,
  SUPPORT,
  ABOUT,
  CONTACT,
  MYPROFILE,
  LOANOFFER,
  AMOUNT_ENTER,
  INVESTMENTOFFERS,
  NEWINVESTMENT,
  MYPLANS,
  MYLOAN,
  RAAVILAPLANS,
  PRIVACY,
  TERMS,
  CASHSTATUSMENU,
  MYINVESTMENTS,
  WITHDRAWAL
} = Constant.SCREENS;

// ********************** Data Source for drawer **************************************
const menuArray: drawerMenu[] = [
  // {
  //   name: 'Dashboard',
  //   isActive: true,
  //   screen: MAIN,
  // },
  {
    name: `My Plans`,
    isActive: true,
    screen: MYPLANS,
  },
  {
    name: `Raavila Accounts`,
    isActive: true,
    screen: RAAVILAPLANS,
  },
  {
    name: `Make New investment`,
    isActive: true,
    screen: NEWINVESTMENT,
  },
  {
    name: 'Cash Status',
    isActive: true,
    screen: CASHSTATUSMENU,
  },
  {
    name: 'Investment Offers',
    isActive: true,
    screen: INVESTMENTOFFERS,
  },
  {
    name: 'My Total investment',
    isActive: true,
    screen: TOTALINVESTMENT,
  },
  {
    name: 'Loan Offers',
    isActive: true,
    screen: LOANOFFER,
  },
  {
    name: 'My Loans',
    isActive: true,
    screen: MYLOAN,
  },
  {
    name: 'Raavila Committee',
    isActive: true,
    screen: COMMITTEE,
  },
  {
    name: 'My Investments',
    isActive: true,
    screen: MYINVESTMENTS,
  },
  {
    name: 'Withdrawals',
    isActive: true,
    screen: WITHDRAWAL,
  },
  {
    name: 'Support',
    isActive: true,
    screen: SUPPORT,
  },
  {
    name: 'About Us',
    isActive: true,
    screen: ABOUT,
  },
  {
    name: 'Contact Us',
    isActive: true,
    screen: CONTACT,
  },
  {
    name: 'Logout',
    isActive: true,
    screen: LOGIN,
  },
];

const DrawerContent = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {logoutFromGoogle} = useSignInViaSocialHook();
  const isFoc = useIsFocused();
  const {navigation} = props;
  // const navigation = useNavigation()
  //const data = useAppSelector(state=>state)
  const [getProfile, {data}] = useLazyGetProfileQuery<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getProfileData();
  }, [isFoc]);

  const getProfileData = async () => {
    const refetch = Date.now();
    const newData = await getProfile(refetch, false).unwrap();
  };

  const isDrawerOpen = useDrawerStatus() === 'open';
  // **************************** logOut function *****************************
  const logoutApi = async () => {
    setVisible(false);
    // remove data from asyncStorage also
    await purgeStore();
    // @ts-ignore
    dispatch(setCredentials({user: null, token: null, isSplash: false}));
    AsyncStorage.removeItem('user');
    logoutFromGoogle();
    navigation.navigate(LOGIN);
  };

  // ************************* function to move the screen selected ***********
  const onSelectMenu = (data: drawerSelect) => {
    const {screen, name} = data;
    // when select any option then the drawer close
    navigation.closeDrawer();
    if (name === 'Logout') {
      setVisible(true);
    } else {
      navigation.navigate(screen);
    }
  };

  // ****************** Profile view in upper of drawer *************************
  const renderProfile = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(MYPROFILE)}
        style={styles.profile}>
        <Image
          source={{uri: data?.data?.profile_pic}}
          style={styles.profileImage}
        />
        <Text style={styles.title}>{data?.data?.name}</Text>
        <Text
          style={[
            styles.title,
            styles.title1,
          ]}>{`(${data?.data?.occupation})`}</Text>
      </TouchableOpacity>
    );
  };
  // ******************** rendering drawerMenu ***********************************
  const renderMenu = (item: any) => {
    const {name, screen} = item.item;
    return (
      <TouchableOpacity
        key={name}
        onPress={() => onSelectMenu({name, screen})}
        style={styles.menuItem}>
        <ListItem containerStyle={styles.drawerContainer}>
          <Text style={{color: COLORS.WHITE}}>o</Text>
          <ListItem.Title style={styles.txt}> {name}</ListItem.Title>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const renderSeprator = () => {
    return <Divider orientation={'horizontal'} color={'white'} />;
  };
  return (
    /*  For Normal User */
    <View style={styles.container}>
      {isDrawerOpen && (
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={styles.closeButtonTouchView}>
          <View style={styles.closeButtonView}>
            <Image source={Images.cross} style={styles.closeButtonImage} />
          </View>
        </TouchableOpacity>
      )}
      {renderProfile()}
      <Divider orientation={'horizontal'} color={'white'} />
      <FlatList
        data={menuArray}
        renderItem={renderMenu}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeprator}
      />
      <View style={styles.footerView}>
        <CustomButton
          label="Privacy Policy"
          style={styles.policyButtonView}
          txtStyle={styles.policyButtonText}
          press={() => navigation.navigate(PRIVACY)}
        />
        <CustomButton
          label="Terms & Condition"
          style={styles.termsButtonView}
          txtStyle={styles.termsButtonText}
          press={() => navigation.navigate(TERMS)}
        />
      </View>
      <Modal animationType={'slide'} transparent={true} visible={visible}>
        <View
          style={styles.modalview}
          // onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.logoutView}>
              <Image source={Images.logout} style={styles.logoutImg} />
            </View>
            <Text
              style={[
                styles.txt,
                {color: COLORS.MAIN, textAlign: 'center', fontSize: adjust(16)},
              ]}>
              {'Are you sure for logout?'}
            </Text>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.yesBtn} onPress={logoutApi}>
                <Text
                  style={[
                    styles.txt,
                    {color: COLORS.DARK, fontSize: adjust(20)},
                  ]}>
                  {'Yes'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => setVisible(false)}>
                <Text
                  style={[
                    styles.txt,
                    {color: COLORS.DARK, fontSize: adjust(20)},
                  ]}>
                  {'No'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default DrawerContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: adjust(40),
  },
  profileImage: {
    height: adjust(65),
    borderRadius: 80,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    width: adjust(65),
    resizeMode: 'cover',
  },
  title: {
    top: adjust(10),
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.TITLE,
    fontWeight: '400',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  title1: {
    fontSize: FONT_SIZES.LABEL,
    marginTop: adjust(2),
    marginBottom: adjust(20),
  },
  profile: {
    backgroundColor: COLORS.MAIN,
    alignItems: 'center',
    marginTop: adjust(-30),
  },
  drawerContainer: {
    backgroundColor: 'transparent',
    height: adjust(55),
  },
  txt: {
    color: 'white',
    fontSize: FONT_SIZES.SUB_HEADING,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: Platform.OS === 'ios' ? adjust(40) : adjust(25),
  },
  policyButtonView: {
    backgroundColor: COLORS.MAIN,
    height: adjust(30),
    borderRadius: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyButtonText: {
    color: 'white',
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  termsButtonView: {
    backgroundColor: COLORS.MAIN,
    height: adjust(30),
    borderRadius: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsButtonText: {
    color: 'white',
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  closeButtonView: {
    backgroundColor: '#2C231F',
    // marginLeft: Platform.OS === 'android' ? adjust(223) : adjust(220),
    marginTop: adjust(30),
    height: adjust(40),
    width: adjust(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonImage: {
    height: adjust(10),
    width: adjust(10),
  },
  txtContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContainer1: {
    justifyContent: 'center',
  },
  fb: {
    height: adjust(18),
    width: adjust(10),
  },
  btn: {
    backgroundColor: '#1877F2',
    justifyContent: 'space-evenly',
    height: adjust(30),
    width: adjust(190),
    marginTop: adjust(80),
  },
  google: {
    width: adjust(18),
    height: adjust(19),
  },
  lineImage: {
    tintColor: '#DADADA',
    width: adjust(50),
    height: adjust(1),
  },
  loginEmailButton: {
    backgroundColor: '#2C231F',
    height: adjust(30),
    width: adjust(190),
    justifyContent: 'space-evenly',
  },
  emailImgStyle: {
    height: adjust(20),
    width: adjust(15),
  },
  emailTextStyle: {
    fontSize: adjust(12),
  },
  facebookTextStyle: {
    fontSize: adjust(13),
  },
  googleButtonStyle: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    height: adjust(30),
    width: adjust(190),
    alignItems: 'center',
    marginTop: adjust(170),
  },
  googleTextStyle: {
    color: 'black',
    fontSize: adjust(13),
  },
  tabsView: {
    alignItems: 'center',
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
    height: adjust(150),
    width: adjust(260),
    borderRadius: adjust(8),
    elevation: 10,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    // top:250,
    // left:77
  },
  logoutView: {
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'100%',
  },
  logoutImg: {
    // backgroundColor:'green',
    // height:'70%',
    // width:'100%',
    // marginVertical: adjust(10),
    height: 50,
    width: 50,
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesBtn: {
    width: adjust(40),
    alignItems: 'center',
    marginHorizontal: adjust(12),
  },
  closeButtonTouchView: {
    // marginHorizontal: Platform.OS === 'ios' ? adjust(220) : adjust(225),
    left: '100%',
    // backgroundColor:'green'
    // alignItems: 'flex-end',
    // width: Platform.OS === 'ios' ? adjust(255.5) : adjust(259.5),
  },
});
