import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import adjust from './adjust';
import TextBox from './TextBox';
import Upload from './Upload';
import React, {useState, useEffect} from 'react';
import {Images} from '@/Assets';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDown from './DropDown';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import {arrayData} from '@/Types';
import {openCamera, openPicker} from 'react-native-image-crop-picker';
import {useAppSelector} from '@/Redux/hooks/hooks';
// import DocumentPicker from 'react-native-document-picker';

export default function Registration(props: any) {
  const user = useAppSelector(state => state?.auth?.user);
  const {
    nam,
    setNam,
    val,
    erNam,
    namFa,
    setFa,
    valFa,
    erFa,
    namMo,
    setMo,
    valMo,
    erMo,
    com,
    setCom,
    valCom,
    erCom,
    dat,
    mon,
    yer,
    setDt,
    setMon,
    setYr,
    erDob,
    setErDob,
    mar,
    setMar,
    erMar,
    setErMar,
    dis,
    setDis,
    erDis,
    setErDis,
    select,
    setSelect,
    erSelect,
    setErSelect,
    pro,
    setPro,
    aad,
    setAad,
    pan,
    setPan,
    itr,
    setItr,
    passport,
    setPassport,
    errorAadhar,
    errorPan,
    setErrorAadhar,
    setErrorPan,
    mobile,
    setMobile,
    errorMobile,
    email,
    setEmail,
    errorEmail,
    emailVal,
    mobileVal,
  } = props;

  // async function pickDocument() {
  //   // try {
  //   //   const res = await DocumentPicker.pick({
  //   //     type: [DocumentPicker.types.allFiles],
  //   //   });
  //   //   console.log('Selected file:', res);
  //   //   // Handle the selected file
  //   // } catch (err) {
  //   //   if (DocumentPicker.isCancel(err)) {
  //   //     console.log('User cancelled the file picking');
  //   //   } else {
  //   //     console.log('Error while picking the file:', err);
  //   //   }
  //   // }
  // }

  // async function requestPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  //     ]);
  //     console.log('=========granted======>')
  //     if (
  //       granted['android.permission.READ_EXTERNAL_STORAGE'] ===
  //         PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
  //         PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       openPicker({
  //         width: 300,
  //         height: 400,
  //         cropping: true
  //       }).then(image => {
  //         console.log(image);
  //       });
  //     } else {
  //       console.log('===permission not granted===>')
  //     }
  //   } catch (err) {
  //     console.warn('Permission request error:', err);
  //   }
  // }


  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const dob = new Date();
  const year1 = dob.getFullYear();
  const month1 = dob.getMonth();
  const day = dob.getDate();
  // const [visible, setVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<any>({
    aadhar: false,
    pan: false,
    dl: false,
    itr: false,
    profile: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const updateDate = (selectedDate: any) => {
    setDt(moment(selectedDate).format('DD'));
    setMon(moment(selectedDate).format('MM'));
    setYr(moment(selectedDate).format('YYYY'));
  };

  // *********************************DatePicker***********************************************
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    updateDate(date);
    hideDatePicker();
  };

  const SORT = [
    {key: 1, img: Images.camera, name: 'Capture Image'},
    {key: 2, img: Images.upload_img, name: 'From Gallery'},
  ];

  const renderSort = (item: any) => {
    const {key, img, name} = item.item;
    return (
      <TouchableOpacity
        onPress={() =>
          key == 1
            ? openCameraLib(
                visible?.aadhar
                  ? 'aadhar'
                  : visible?.pan
                  ? 'pan'
                  : visible?.dl
                  ? 'dl'
                  : visible?.itr
                  ? 'itr'
                  : 'profile',
              )
            : launchImageLibrary(
                visible?.aadhar
                  ? 'aadhar'
                  : visible?.pan
                  ? 'pan'
                  : visible?.dl
                  ? 'dl'
                  : visible?.itr
                  ? 'itr'
                  : 'profile',
              )
        }>
        <View style={styles.sortcontainer}>
          <View style={styles.left}>
            <Image source={img} style={{}} />
          </View>
          <View style={styles.right}>
            <Text
              style={[
                styles.txt,
                {
                  fontSize: adjust(12),
                  textAlign: 'left',
                  padding: 0,
                  color: COLORS.DARK,
                },
              ]}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const openLib = (set: string) => {
    // checkAndRequestPermission()
    //setVisible(false)
    let SET: any;
    let ER: any;
    if (set == 'aadhar') {
      SET = setAad;
      ER = setErrorAadhar;
    } else if (set == 'pan') {
      SET = setPan;
      ER = setErrorPan;
    } else if (set == 'dl') {
      SET = setPassport;
    } else if (set === 'profile') {
      //setVisible(true)
      SET = setPro;
    } else {
      SET = setItr;
    }
    openPicker({
      cropping: false,
    })
      .then(response => {

        console.log('res', response);
        // console.log("res",res)
        const split = response?.path.split('/');
        const imgName = split[split.length - 1];
        SET({
          name:
            Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
          type: response?.mime,
          uri: response?.path,
        });
        {
          ER ? ER(null) : null;
        }
        setVisible(false);
      })
      .catch(err => {
        setVisible(false);
        console.log('message', err);
      });
  };

  const openCameraLib = (set: string) => {
    // checkAndRequestPermission()
    // setVisible(false)
    let SET: any;
    let ER: any;
    if (set == 'aadhar') {
      SET = setAad;
      ER = setErrorAadhar;
    } else if (set == 'pan') {
      SET = setPan;
      ER = setErrorPan;
    } else if (set == 'dl') {
      SET = setPassport;
    } else if (set === 'profile') {
      SET = setPro;
    } else {
      SET = setItr;
    }
    openCamera({cropping: false, useFrontCamera: true})
      .then(response => {
        setVisible({
          aadhar: false,
          pan: false,
          dl: false,
          itr: false,
          profile: false,
        })
        // console.log("res",resp)
        const split = response?.path.split('/');
        const imgName = split[split.length - 1];
        SET({
          name:
            Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
          type: response?.mime,
          uri: response?.path,
        });
        {
          ER ? ER(null) : null;
        }
      })
      .catch(err => {
        console.log('message', err);
        setVisible({
          aadhar: false,
          pan: false,
          dl: false,
          itr: false,
          profile: false,
        })
      });
  };

  // **********************launchImageLibrary******************************************
  const launchImageLibrary = async (set: string) => {
    let SET: any;
    let ER: any;
    if (set == 'aadhar') {
      SET = setAad;
      ER = setErrorAadhar;
    } else if (set == 'pan') {
      SET = setPan;
      ER = setErrorPan;
    } else if (set == 'dl') {
      SET = setPassport;
    } else if (set === 'profile') {
      SET = setPro;
    } else {
      SET = setItr;
    }
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response: any) => {
      setVisible({
        aadhar: false,
        pan: false,
        dl: false,
        itr: false,
        profile: false,
      })
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('response', JSON.stringify(response));
        SET({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
        {
          ER ? ER(null) : null;
        }
      }
    });
  };

  // **********************launchCamera******************************************
  const launchCamera = () => {
    setVisible(false);
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response: any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setPro({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
      }
    });
  };

  const launchImageLibrary1 = (set: string) => {
    openLib(set);
    return;
    let SET: any;
    let ER: any;
    if (set == 'aadhar') {
      SET = setAad;
      ER = setErrorAadhar;
    } else if (set == 'pan') {
      SET = setPan;
      ER = setErrorPan;
    } else if (set == 'dl') {
      SET = setPassport;
    } else {
      SET = setItr;
    }
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      ImagePicker.launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          console.log('response', JSON.stringify(response));
          SET({
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          });
          {
            ER ? ER(null) : null;
          }
        }
      });
    } catch (error) {
      console.log('==>', error);
      // reacttron
    }
    // ImagePicker.launchImageLibrary(options, (response: any) =>
    // {
    //     if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //         alert(response.customButton);
    //     } else {
    //         const source = { uri: response.assets[0].uri };
    //         console.log('response', JSON.stringify(response));
    //         setImage({
    //             filePath: response,
    //             type: response.data,
    //             uri: response.assets[0].uri,
    //         });
    //     }
    // });
  };

  // **********************launchCamera******************************************
  const launchCamera1 = () => {
    setVisible(false);
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response: any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setAad({
          filePath: response,
          fileData: response.data,
          fileUri: response.assets[0].uri,
        });
      }
    });
  };

  return (
    <>
      <View style={styles.first}>
        <View style={styles.circle}>
          <View
            style={[
              styles.circ,
              {
                borderColor: pro.uri ? COLORS.GRAY : 'red',
              },
            ]}>
            <Image
              source={pro.uri ? {uri: pro.uri} : Images.user}
              style={styles.profileimg}
            />
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <View style={styles.edit}>
                <Image source={Images.edit} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.labeltxt}>{'Full Name *'}</Text>
      <TextBox
        placeholder={'Enter your name'}
        style={styles.textbox}
        value={nam}
        setValue={setNam}
        validate={val}
      />
      {erNam ? <Text style={styles.errorTxt}>{erNam}</Text> : null}
      <Text style={styles.labeltxt}>{"Mother's Name"}</Text>
      <TextBox
        placeholder={"Enter your mother's name"}
        style={styles.textbox}
        value={namMo}
        setValue={setMo}
        validate={valMo}
      />
      {erMo ? <Text style={styles.errorTxt}>{erMo}</Text> : null}
      <Text style={styles.labeltxt}>{"Father's Name"}</Text>
      <TextBox
        placeholder={"Enter your father's name"}
        style={styles.textbox}
        value={namFa}
        setValue={setFa}
        validate={valFa}
      />
      {erFa ? <Text style={styles.errorTxt}>{erFa}</Text> : null}
      <Text style={styles.labeltxt}>{'Date of birth'}</Text>
      <TouchableOpacity
        style={styles.dob}
        onPress={() => {
          showDatePicker(), setErDob(null);
        }}>
        <Text
          style={[
            styles.txt,
            {color: COLORS.DARK, paddingLeft: 0, fontSize: adjust(13)},
          ]}>
          {yer}-{mon}-{dat}
        </Text>
        <Image source={Images.calender} />
      </TouchableOpacity>
      {erDob ? <Text style={[styles.errorTxt, {top: 0}]}>{erDob}</Text> : null}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date(year1 - 18, month1, day)}
      />
      <Text style={[styles.labeltxt, {marginTop: adjust(15)}]}>
        {'Marital Status'}
      </Text>
      <View style={styles.marital}>
        <View style={styles.innerMartial}>
          <TouchableOpacity
            style={styles.maritalBtn}
            onPress={() => {
              setMar('1'), setErMar(null);
            }}>
            <View
              style={[
                styles.round,
                {backgroundColor: mar == '1' ? COLORS.MAIN : COLORS.WHITE},
              ]}
            />
            <Text style={styles.maritalTxt}>{'Single'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.maritalBtn, {width: adjust(65)}]}
            onPress={() => {
              setMar('2'), setErMar(null);
            }}>
            <View
              style={[
                styles.round,
                {
                  backgroundColor: mar == '2' ? COLORS.MAIN : COLORS.WHITE,
                },
              ]}
            />
            <Text style={styles.maritalTxt}>{'Married'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.maritalBtn, {width: adjust(73)}]}
            onPress={() => {
              setMar('3'), setErMar(null);
            }}>
            <View
              style={[
                styles.round,
                {
                  backgroundColor: mar == '3' ? COLORS.MAIN : COLORS.WHITE,
                },
              ]}
            />
            <Text style={styles.maritalTxt}>{'Divorced'}</Text>
          </TouchableOpacity>
        </View>
        {/* error */}
        {erMar ? (
          <Text style={[styles.errorTxt, {top: adjust(-5)}]}>{erMar}</Text>
        ) : null}
      </View>
      <Text style={[styles.labeltxt, {marginTop: 0}]}>
        {'Physically Disabled'}
      </Text>
      <View style={styles.marital}>
        <View style={[styles.innerMartial, {width: adjust(120)}]}>
          <TouchableOpacity
            style={[styles.maritalBtn, {width: adjust(40)}]}
            onPress={() => {
              setDis('1'), setErDis(null);
            }}>
            <View
              style={[
                styles.round,
                {backgroundColor: dis == '1' ? COLORS.MAIN : COLORS.WHITE},
              ]}
            />
            <Text style={styles.maritalTxt}>{'No'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.maritalBtn, {width: adjust(44)}]}
            onPress={() => {
              setDis('2'), setErDis(null);
            }}>
            <View
              style={[
                styles.round,
                {backgroundColor: dis == '2' ? COLORS.MAIN : COLORS.WHITE},
              ]}
            />
            <Text style={styles.maritalTxt}>{'Yes'}</Text>
          </TouchableOpacity>
        </View>
        {/* error */}
        {erDis ? (
          <Text style={[styles.errorTxt, {top: adjust(-5)}]}>{erDis}</Text>
        ) : null}
      </View>
      <Text style={styles.labeltxt}>{'Mobile Number'}</Text>
      <TextBox
        placeholder={'Enter your mobile no.'}
        style={styles.textbox}
        value={mobile}
        setValue={setMobile}
        validate={mobileVal}
        editable={user?.mobile !== null ? false : true}
        num
        length={10}
      />
      {errorMobile ? <Text style={styles.errorTxt}>{errorMobile}</Text> : null}
      <Text style={styles.labeltxt}>{'Email Address'}</Text>
      <TextBox
        placeholder={'Enter your email'}
        style={styles.textbox}
        value={email}
        setValue={setEmail}
        validate={emailVal}
        editable={user?.email !== null ? false : true}
      />
      {errorEmail ? <Text style={styles.errorTxt}>{errorEmail}</Text> : null}
      <Text style={[styles.labeltxt, {marginTop: 0}]}>{'Occupation'}</Text>
      <DropDown select={select} setSelect={setSelect} setError={setErSelect}/>
      {/* error */}
      {erSelect ? (
        <Text style={[styles.errorTxt, {top: 0}]}>{erSelect}</Text>
      ) : null}
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'Upload AADHAAR'}
      </Text>
      {/* <Upload image={aad} setImage={setAad} /> */}
      {/* ************************************************************************** */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() =>
            // launchImageLibrary1('aadhar')
            // launchImageLibrary('aadhar')
            setVisible((prevState: any) => ({
              ...prevState,
              aadhar: true,
            }))
          }>
          <Image
            source={aad?.uri ? {uri: aad.uri} : Images.upload}
            style={aad.uri ? styles.uploadImg : styles.dummy}
          />
        </TouchableOpacity>
      </View>
      {errorAadhar ? (
        <Text style={[styles.errorTxt, {top: 0}]}>{errorAadhar}</Text>
      ) : null}
      {/* ************************************************************************** */}
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'Upload PAN Card'}
      </Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() =>
            // launchImageLibrary('pan')
            setVisible((prevState: any) => ({
              ...prevState,
              pan: true,
            }))
          }>
          <Image
            source={pan?.uri ? {uri: pan.uri} : Images.upload}
            style={pan.uri ? styles.uploadImg : styles.dummy}
          />
        </TouchableOpacity>
      </View>
      {errorPan ? (
        <Text style={[styles.errorTxt, {top: 0}]}>{errorPan}</Text>
      ) : null}
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'DL/PASSPORT'}
        <Text style={[styles.txt, {color: 'grey'}]}>{' (Optional)'}</Text>
      </Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() =>
            // launchImageLibrary('dl')
            setVisible((prevState: any) => ({
              ...prevState,
              dl: true,
            }))
          }>
          <Image
            source={passport?.uri ? {uri: passport.uri} : Images.upload}
            style={passport.uri ? styles.uploadImg : styles.dummy}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'Communication Address'}
      </Text>
      <TextBox
        placeholder={'Enter your address'}
        style={styles.textbox}
        value={com}
        setValue={setCom}
        validate={valCom}
      />
      {erCom ? <Text style={styles.errorTxt}>{erCom}</Text> : null}
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'ITR Document'}
        <Text style={[styles.txt, {color: 'grey'}]}>{' (Optional)'}</Text>
      </Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() =>
            // launchImageLibrary('itr')
            setVisible((prevState: any) => ({
              ...prevState,
              itr: true,
            }))
          }>
          <Image
            source={itr?.uri ? {uri: itr.uri} : Images.upload}
            style={itr.uri ? styles.uploadImg : styles.dummy}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={
          visible?.aadhar
            ? visible.aadhar
            : visible?.pan
            ? visible.pan
            : visible?.dl
            ? visible.dl
            : visible?.itr
            ? visible.itr
            : visible.profile
        }>
        <View style={styles.modalview}>
          <View style={[styles.modal, {}]}>
            <View style={styles.cross}>
              <TouchableOpacity
                onPress={() =>
                  setVisible({
                    aadhar: false,
                    pan: false,
                    dl: false,
                    itr: false,
                    profile: false,
                  })
                }
                style={styles.crossbtn}>
                <Image style={styles.close} source={Images.cross} />
              </TouchableOpacity>
            </View>
            <View style={styles.upload}>
              <Image source={Images.upload} style={{}} />
              <Text
                style={[
                  styles.txt,
                  {fontSize: adjust(12), padding: 0, color: COLORS.DARK},
                ]}>
                {'Upload Photos'}
              </Text>
            </View>
            <View style={[styles.sortflatlist, {justifyContent: 'center'}]}>
              <FlatList
                data={SORT}
                renderItem={renderSort}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  first: {
    height: adjust(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    // backgroundColor:'green',
    height: adjust(10),
    // top: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circ: {
    height: adjust(85),
    width: adjust(85),
    borderRadius: adjust(85 / 2),
    borderWidth: 5,
  },
  edit: {
    backgroundColor: COLORS.MAIN,
    height: adjust(25),
    width: adjust(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(25 / 2),
    top: adjust(-20),
    left: adjust(57),
    position: 'absolute',
  },
  profileimg: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: adjust(85 / 2),
    backgroundColor: 'white',
  },
  labeltxt: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(5),
  },
  textbox: {
    marginBottom: adjust(7),
    // backgroundColor:'green'
  },
  dob: {
    backgroundColor: COLORS.WHITE,
    height: adjust(40),
    borderWidth: 1,
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: adjust(10),
    marginTop: adjust(5),
  },
  marital: {
    height: adjust(50),
  },
  round: {
    backgroundColor: COLORS.WHITE,
    height: adjust(15),
    width: adjust(15),
    borderRadius: adjust(15 / 2),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
  maritalTxt: {
    fontSize: adjust(11),
    fontFamily: FONT_FAMILIES.REGULAR,
    color: COLORS.DARK,
  },
  maritalBtn: {
    flexDirection: 'row',
    height: adjust(15),
    width: adjust(57),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerMartial: {
    height: adjust(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    padding: adjust(12),
  },
  sortcontainer: {
    height: adjust(35),
    width: adjust(200),
    marginVertical: adjust(3),
    borderRadius: 8,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    flexDirection: 'row',
    // backgroundColor:'orange'
  },
  left: {
    width: adjust(37),
    // height: adjust(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    // height: adjust(20),
    width: adjust(90),
    justifyContent: 'center',
    // backgroundColor:'yellow'
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
    // height: adjust(180),
    width: adjust(220),
    borderRadius: 8,
    elevation: 10,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    // top:250,
    // left:77
  },
  cross: {
    height: adjust(25),
    // width: adjust(79),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  crossbtn: {
    height: adjust(25),
    width: adjust(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    tintColor: 'black',
  },
  sortflatlist: {
    alignItems: 'center',
    // backgroundColor:'pink'
  },
  upload: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: COLORS.MAIN,
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    top: adjust(-10),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  uploadContainer: {
    height: adjust(104),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    height: adjust(90),
    // width: adjust(280),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: COLORS.WHITE,
  },
  uploadImg: {
    flex: 1,
    // height: adjust(90),
    // width: adjust(250),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dummy: {},
});
