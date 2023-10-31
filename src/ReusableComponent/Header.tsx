import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform } from 'react-native';
import { Header as HeaderElement } from 'react-native-elements';
import { Images } from "@/Assets";
import { COLORS, FONT_FAMILIES } from "@/Configration";
import { useNavigation } from "@react-navigation/native";
import adjust from "components/adjust";
import { SCREENS } from "@/Constant";
const {NOTIFICATIONS} = SCREENS
const Header = (props: any) => {
  const {bc, isBack, data, isBackHide, title, isRightAction, screen, titleLogo} =
    props;
  const navigation: any = useNavigation();

  // ************************** drawer function *****************************************
  const openDrawer = () => {
    if (isBack) {
      navigation.goBack();
      return;
    }
    navigation.openDrawer();
  };
    // ************************** go to screen *****************************************
    const goToScreen = (screen: any) => {
      console.log("datat",data.kyc_status)
      if (!data?.kyc_status){
        alert("KYC Verification is under process.")
        return;
      }
      navigation.navigate(screen,{data});
    };
    // ********************** left component of header ***********************************
    const leftComponent = () => {
        if (isBack && !isBackHide) {
            return (
                <TouchableOpacity onPress={openDrawer} style={styles.leftComponent}>
                    <Image source={Images.leftArrow} style={[styles.menubar, ]} />
                </TouchableOpacity>
            );
        } else if (isBackHide) {
            return null
        }
        else {
            return (
                <TouchableOpacity onPress={openDrawer} style={styles.leftComponent}>
                    <Image source={Images.menu} style={styles.menubar} />
                </TouchableOpacity>
            );
        }
    };

    // ******************* right component of header ***********************************
    const rightComponent = () => {
        if (isRightAction === undefined) {
            return (
                <View style={styles.rightComponent}>
                    <TouchableOpacity />
                </View>
            );
        }
        if (isRightAction == 'edit') {
            return (
                <View style={styles.rightComponent}>
                    <TouchableOpacity  onPress={() => goToScreen(screen)}>
                        <Image source={Images.edit} />
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.rightComponent}>
                <TouchableOpacity onPress={()=> navigation.navigate(NOTIFICATIONS)}>
                    <Image source={Images.notification} style={styles.menubar} />
                </TouchableOpacity>

            </View>
        );
    };

    // *************** center component where title appear in header *******************
    const centerComponent = () => {
        if (titleLogo) {
            return (<View style={styles.centercomponent}>
                <Image source={Images.headerLogo} />
            </View>)
        } else {
            return (<View style={styles.centercomponent}><Text style={[styles.text]}>{title}</Text>
            </View>)
        }
      }

  return (
    <View style={styles.mainView}>
      {/* @ts-ignore */}
      <HeaderElement
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'transparent',
        }}
        containerStyle={styles.container}
        placement={'center'}
        centerComponent={title || titleLogo ? centerComponent : null}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        backgroundColor={bc ? 'transparent' : COLORS.DARK}
      />
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  mainView: {marginTop: Platform.OS === 'ios' ? adjust(-15) : adjust(0)},
  container: {
    borderBottomColor: 'transparent',
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  menubar: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  text: {
    fontSize: adjust(18),
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  rightComponent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  centercomponent: {height: 50, justifyContent: 'center'},
});
