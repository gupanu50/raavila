import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Image } from 'react-native-elements';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import { Images } from '@/Assets';
import adjust from 'components/adjust';
import { useDrawerStatus } from '@react-navigation/drawer';
import SocialButton from '../SocialButton';
import { SCREENS } from '@/Constant';
const { LOGIN } = SCREENS

const DrawerContentGuest = (props: any) => {
  const { navigation } = props;
  const isDrawerOpen = useDrawerStatus() === 'open';
  // ****************** Profile view in upper of drawer of Guest user Drawer*************************
  const renderProfile1 = () => {
    return (
      <View style={styles.profile}>
        <Image source={Images.dummy} style={styles.profileImage} />
        <Text style={styles.title}>{'Guest User'}</Text>
      </View>
    );
  };

  return (
    /*  For Guest User */
    <View style={styles.container}>
      {isDrawerOpen && <TouchableOpacity onPress={() => navigation.closeDrawer()}
        style={styles.closeButtonTouchView}>
        <View style={styles.closeButtonView}>
          <Image source={Images.cross} style={styles.closeButtonImage} />
        </View>
      </TouchableOpacity>}
      {renderProfile1()}
      <View style={[styles.txtContainer, styles.txtContainer1]}>
        <Image source={Images.line}
          style={styles.lineImage} />
      </View>
      <View style={styles.tabsView}>
        <SocialButton img={Images.logo}
          label={'Login with Email or Mobile'}
          style={styles.loginEmailButton}
          imgStyle={styles.emailImgStyle}
          txtStyle={styles.emailTextStyle}
          press={() => navigation.navigate(LOGIN)}
        />
        <SocialButton img={Images.fb}
          label={'Login with Facebook '}
          imgStyle={styles.fb}
          style={styles.btn}
          txtStyle={styles.facebookTextStyle}
        />

        <SocialButton img={Images.google}
          label={'Login with Google      '}
          imgStyle={styles.google}
          style={styles.googleButtonStyle}
          txtStyle={styles.googleTextStyle} />
      </View>
    </View>
  );
};
export default DrawerContentGuest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: adjust(30),
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
    fontSize: adjust(15),
    fontWeight: '400',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  title1: {
    fontSize: adjust(11),
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
    height: adjust(50),
  },
  txt: {
    color: 'white',
    fontSize: adjust(11),
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
    fontSize: adjust(11),
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
    fontSize: adjust(11),
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
    alignItems: 'flex-end',
    width: Platform.OS === 'ios' ? adjust(255.5) : adjust(259.5),
  }
});
