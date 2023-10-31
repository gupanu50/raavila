import { GoogleSignin, statusCodes, User, NativeModuleError } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
// import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken, Profile } from "react-native-fbsdk-next";
// import { AppleButton,AndroidResponseType } from "@invertase/react-native-apple-authentication";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "@/Constant";
import { useLoginMutation } from "@/Redux/services/auth/authService";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Redux/services/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { REGISTER } = SCREENS
export const useSignInViaSocialHook = () => {
  const navigation: any = useNavigation();
  const [userInfo, setUserInfo] = useState<User | undefined>()
  const [error, setError] = useState<NativeModuleError | any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [login, { isError, isSuccess, data }] = useLoginMutation<any>();
  const dispatch = useDispatch();
  // const  onAppleButtonPress = async () =>{
  //     // Start the sign-in request
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     // Ensure Apple returned a user identityToken
  //     if (!appleAuthRequestResponse.identityToken) {
  //       throw new Error('Apple Sign-In failed - no identify token returned');
  //     }

  //     // Create a Firebase credential from the response
  //     const { identityToken, nonce } = appleAuthRequestResponse;
  //     console.log("identy token");
  //    // call api here for server register

  //     // Sign the user in with the credential
  //     return identityToken
  //   }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS === 'android' ? "217197863381-l3cthto5tgquip3h92nc6aj4oe3t5nkd.apps.googleusercontent.com" :
          '217197863381-0fnkj5s39gq6puvon1dj7v49hardc4sg.apps.googleusercontent.com',
      offlineAccess: false,
      hostedDomain: "",
    });
  }, [])
  useEffect(() => {
    if (isSuccess && data?.data !== null) {
      setIsLoading(false);
      if (data?.data?.complete_profile === 1) {
        dispatch(setCredentials({ user: data?.data, token: data?.data.token, isSplash: true }));
      } else {
        navigation.navigate(REGISTER);
        setIsLoading(false)
      }
    } else {
      setIsLoading(false);
    }
  }, [isSuccess]);
  /**
   * @method loginWithGoogle
   */
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userinfo = await GoogleSignin.signIn();
      setUserInfo(userinfo);
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      const body = { google_id: userinfo?.user?.id, name: userinfo?.user?.name, email: userinfo?.user?.email, type: 2, device_token: fcmToken}
      try {
        const user: any = await login(body).unwrap();
        return user;
      } catch (error: any) {
        const err = JSON.stringify(error?.error);
        alert(err);
        setIsLoading(false)
      }
    }
    catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError(error)
        Alert.alert("User Cancelled the Login Flow");
      }
      else if (error.code === statusCodes.IN_PROGRESS) {
        setError(error)
      }
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services Not Available or Outdated");
        setError(error)
      }
      else {
        Alert.alert(error.toString());
        console.log('error', error)
        setError(error)
      }
    }
  }
  /**
   * @method loginWithFaceBook
   */
  const loginWithFaceBook = async () => {

    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log('facebook',data)
    const profileData = await Profile.getCurrentProfile();
    console.log('facebookProfileData',profileData)
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const body = {facebook_id: profileData?.userID, name: profileData?.name, type: 3, device_token: fcmToken}
    try {
      const user: any = await login(body).unwrap();
      return user;
    } catch (error: any) {
      const err = JSON.stringify(error?.error);
      alert(err);
      setIsLoading(false)
    }
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    //Call apis here 

    // Sign-in the user with the credential
    return 'facebook'

  }

  /**
   * @method loginWithApple
   */
  // const loginWithApple  = () =>{
  //  onAppleButtonPress()
  // }
  /**
   * @method logoutFromGoogle
   */
  const logoutFromGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      //setUserInfo(null);
    }
    catch (error) {
      console.error(error);
    }
  }

  return {
    userInfo,
    error,
    // loginWithApple, 
    loginWithGoogle,
    loginWithFaceBook,
    logoutFromGoogle,
    isLoading
  };
};








