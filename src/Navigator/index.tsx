import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Alert, BackHandler, Platform, StyleSheet} from 'react-native';
import Splash from 'screens/Splash';
import Login from '@/Screens/Auth/Login';
import Register from 'screens/Auth/Register';
import DrawerContent from 'components/DrawerContent';
import * as constant from '@/Constant';
import {FONT_FAMILIES} from '@/Configration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import adjust from '@/Component/adjust';
import Login1 from '@/Screens/Auth/Login1';
import Otp from '@/Screens/Auth/OTP';
import MyProfile from '@/Screens/MyProfile';
import EditProfile from '@/Screens/EditProfile';
import Support from '@/Screens/Support';
import Contact from '@/Screens/ContactUs';
import NewInvestment from '@/Screens/Investment/NewInvestment';
import Indivisual from '@/Screens/Investment/Indivisual';
import IndivisualDetails from '@/Screens/Investment/IndivisualDetails';
import Business from '@/Screens/Investment/Business';
import EnterpriseValidate from '@/Screens/Investment/EnterpriseValidate';
import EnterpriseDetails from '@/Screens/Investment/EnterpriseDetails';
import Cash from '@/Screens/Cash';
import Committee from '@/Screens/Committee';
import TotalInvestment from '@/Screens/TotalInvestment';
import LoanOffer from '@/Screens/Loan/LoanOffer';
import ApplyLoan from '@/Screens/Loan/ApplyLoan';
import MyInvestments from 'screens/Investment/My Investments';
import OnlinePayment from 'screens/OnlinePayment';
import PaymentConfirmation from 'screens/OnlinePayment/PaymentConfirmation';
import Withdrawal from 'screens/WithDrawal';
const navigationRef: any = React.createRef();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const {
  SPLASH,
  LOGIN,
  REGISTER,
  DASHBOARD,
  MAIN,
  TABS,
  LOGIN1,
  OTP,
  EDITPROFILE,
  MYPROFILE,
  SUPPORT,
  INDIVISUAL,
  BUSINESS,
  INDIVISUALDETAILS,
  CONTACT,
  ENTERPRISEVALIDATE,
  ENTERPRISEDETAILS,
  PAYCASH,
  COMMITTEE,
  TOTALINVESTMENT,
  LOANOFFER,
  APPLYLOAN,
  MYLOAN,
  ABOUT,
  DASHBOARDGUEST,
  PAYMENT,
  PRIVACY,
  GUESTDASHBOARD,
  TERMS,
  NEWINVESTMENT,
  EDITBANK,
  MYPLANS,
  RAAVILAPLANS,
  AMOUNT_ENTER,
  INVESTMENTOFFERS,
  NOTIFICATIONS,
  PAYMENTOTP,
  CASHSTATUSMENU,
  BANKACCOUNTDETAILS,
  COMMITTEEDETAILS,
  SUPPORTCHAT,
  MYINVESTMENTS,
  ONLINEPAYMENT,
  PAYMENTCONFIRMATION,
  WITHDRAWAL,
} = constant.SCREENS;
import MyLoan from 'screens/Loan/MyLoan';
import About from 'screens/AboutUs';
import Privacy from 'screens/Privacy';
import AmountEnter from 'screens/WithDrawal/AmountEntered';
import Terms from 'screens/Terms';
import Offers from 'screens/Investment/Offers';
import Notifications from 'screens/Notifications';
import GuestUser from 'screens/Dashboard/GuestUser';
import EditBank from 'screens/EditBankDetails';
import MyPlans from 'screens/MyPlans';
import RaavilaPlans from 'screens/RaavilaPlans';
import MainUser from 'screens/Dashboard/MainUser';
import DrawerContentGuest from '@/Component/DrawerContentGuest';
import Payment from 'screens/payment/payment';
import PaymentOtp from 'screens/PaymentOtp';
import KYCStatus from '@/ReusableComponent/KYC';
import {useLazyGetProfileQuery} from '@/Redux/services/profile/profile';
import {useAuth} from '@/Redux/hooks/auth';
import {useAppSelector} from '@/Redux/hooks/hooks';
import CashMenu from 'screens/Cash/CashMenu';
import BankAccountDetails from 'screens/BankAccountDetails';
import ViewDetails from 'screens/Committee/ViewDetails';
import SupportChat from 'screens/Support/SupportChat';

const AppNavigator = (props: any) => {
  const [getProfile, {data, isLoading}] = useLazyGetProfileQuery<any>();

  const getProfileData = async () => {
    const refetch = Date.now();
    const data = await getProfile(refetch, false).unwrap();
    console.log('profile get', data);
  };
  //=======================================Use Effect =======================//
  React.useEffect(() => {
    getProfileData();
    function handleBackButton() {
      const routeInfo = navigationRef.current.getCurrentRoute();
      if (
        routeInfo.name.toLowerCase() === LOGIN ||
        routeInfo.name.toLowerCase() === DASHBOARD
      ) {
        exitApp();
      } else {
        if (navigationRef.current.canGoBack()) {
          navigationRef.current.goBack();
        }
      }
      return true;
    }

    // Handle when back button pressed
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  // ****************************** exit function ***********************************
  const exitApp = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  //========================Drawer Navigator ====================================//
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={TABS}
        drawerContent={(props: any) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name={DASHBOARD}
          component={MainUser}
          options={{
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };

  const DrawerNavigatorGuest = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={TABS}
        drawerContent={(props: any) => <DrawerContentGuest {...props} />}>
        <Drawer.Screen
          name={DASHBOARDGUEST}
          component={GuestUser}
          options={{
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };
  const showKyc = data?.data?.kyc_status;

  return (
    <View style={{flex: 1}}>
      {!isLoading && <KYCStatus status={data?.data?.kyc_status} />}
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={MAIN}>
          <MainStack.Screen name={INDIVISUAL} component={Indivisual} />
          <MainStack.Screen name={BUSINESS} component={Business} />
          <MainStack.Screen
            name={INDIVISUALDETAILS}
            component={IndivisualDetails}
          />
          <MainStack.Screen name={MAIN} component={DrawerNavigator} />
          <MainStack.Screen name={EDITPROFILE} component={EditProfile} />
          <MainStack.Screen name={MYPROFILE} component={MyProfile} />
          <MainStack.Screen name={CONTACT} component={Contact} />
          <MainStack.Screen name={PAYCASH} component={Cash} />
          <MainStack.Screen
            name={TOTALINVESTMENT}
            component={TotalInvestment}
          />
          <MainStack.Screen name={COMMITTEE} component={Committee} />
          <MainStack.Screen
            name={ENTERPRISEVALIDATE}
            component={EnterpriseValidate}
          />
          <MainStack.Screen
            name={ENTERPRISEDETAILS}
            component={EnterpriseDetails}
          />
          <MainStack.Screen name={SUPPORT} component={Support} />
          <MainStack.Screen name={INVESTMENTOFFERS} component={Offers} />
          <MainStack.Screen name={LOANOFFER} component={LoanOffer} />
          <MainStack.Screen name={APPLYLOAN} component={ApplyLoan} />
          <MainStack.Screen name={SUPPORTCHAT} component={SupportChat} />
          <MainStack.Screen name={MYLOAN} component={MyLoan} />
          <MainStack.Screen name={ABOUT} component={About} />
          <MainStack.Screen name={TERMS} component={Terms} />
          <MainStack.Screen name={PRIVACY} component={Privacy} />
          <MainStack.Screen name={AMOUNT_ENTER} component={AmountEnter} />
          <MainStack.Screen name={EDITBANK} component={EditBank} />
          <MainStack.Screen name={MYPLANS} component={MyPlans} />
          <MainStack.Screen name={RAAVILAPLANS} component={RaavilaPlans} />
          <MainStack.Screen name={NOTIFICATIONS} component={Notifications} />
          <MainStack.Screen name={NEWINVESTMENT} component={NewInvestment} />
          <MainStack.Screen name={CASHSTATUSMENU} component={CashMenu} />
          <MainStack.Screen name={COMMITTEEDETAILS} component={ViewDetails} />
          <MainStack.Screen
            name={BANKACCOUNTDETAILS}
            component={BankAccountDetails}
          />
          <MainStack.Screen
            name={GUESTDASHBOARD}
            component={DrawerNavigatorGuest}
          />
          <MainStack.Screen name={PAYMENT} component={Payment} />
          <MainStack.Screen name={PAYMENTOTP} component={PaymentOtp} />
          <MainStack.Screen name={MYINVESTMENTS} component={MyInvestments} />
          <MainStack.Screen name={ONLINEPAYMENT} component={OnlinePayment} />
          <MainStack.Screen
            name={PAYMENTCONFIRMATION}
            component={PaymentConfirmation}
          />
          <MainStack.Screen name={WITHDRAWAL} component={Withdrawal} />
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const Navigator = () => {
  const userData: any = useAuth();
  // useEffect(()=>{},[useAuth])
  return userData?.user?.complete_profile == 1 ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  );
};
export default Navigator;

const AuthNavigator = () => {
  const userData = useAppSelector(state => state);
  console.log('User Data app state :', userData.auth);
  const DrawerNavigatorGuest = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={TABS}
        drawerContent={(props: any) => <DrawerContentGuest {...props} />}>
        <Drawer.Screen
          name={DASHBOARDGUEST}
          component={GuestUser}
          options={{
            swipeEnabled: true,
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={SPLASH}>
        <MainStack.Screen name={SPLASH} component={Splash} />
        <MainStack.Screen name={LOGIN} component={Login} />
        <MainStack.Screen name={LOGIN1} component={Login1} />
        <MainStack.Screen name={OTP} component={Otp} />
        <MainStack.Screen name={REGISTER} component={Register} />
        <MainStack.Screen
          name={GUESTDASHBOARD}
          component={DrawerNavigatorGuest}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? '10%' : '8%',
    backgroundColor: 'black',
    borderColor: 'transparent',
  },
  tabView: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  img: {
    height: 30,
    width: 30,
  },
  txt: {
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.BOLD,
  },
});
