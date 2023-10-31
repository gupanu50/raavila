import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import TextBox from './TextBox';
import React, {useState} from 'react';
import adjust from './adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import * as ImagePicker from 'react-native-image-picker';
import {Images} from '@/Assets';
import {openCamera, openPicker} from 'react-native-image-crop-picker';
export default function BankDetails(props: any) {
  const {
    acName,
    setAcName,
    erAc,
    setErAc,
    acNum,
    setAcNum,
    erNum,
    setErNum,
    ifCode,
    setIfCode,
    erIfCode,
    setErIfCode,
    cheque,
    setCheque,
    erCheque,
    setErCheque,
    upi,
    setUpi,
    erUpi,
    setErUpi,
    valUpi,
  } = props;

  // **********************launchImageLibrary******************************************
  // const launchImageLibrary = () => {
  //   let options: any = {
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //       cameraRoll: true,
  //     },
  //   };
  //   openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   })
  //     .then(response => {
  //       const split = response?.path.split('/');
  //       const imgName = split[split.length - 1];

  //       setCheque({
  //         name:
  //           Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
  //         type: response?.mime,
  //         uri: response?.path,
  //       });
  //       setErCheque(null);
  //     })
  //     .catch(err => {});
  //   // ImagePicker.launchImageLibrary(options, (response: any) => {
  //   //   if (response.didCancel) {
  //   //     console.log('User cancelled image picker');
  //   //   } else if (response.error) {
  //   //     console.log('ImagePicker Error: ', response.error);
  //   //   } else if (response.customButton) {
  //   //     console.log('User tapped custom button: ', response.customButton);
  //   //     alert(response.customButton);
  //   //   } else {
  //   //    // const source = { uri: response.assets[0].uri };
  //   //      console.log('Datat', JSON.stringify(response));
  //   //     // setCheque({
  //   //     //   filePath: response,
  //   //     //   fileData: response.data,
  //   //     //   fileUri: response.assets[0].uri,
  //   //     // });
  //   //     setErCheque(null);
  //   //   }
  //   // });
  // };

  const SORT = [
    {key: 1, img: Images.camera, name: 'Capture Image'},
    {key: 2, img: Images.upload_img, name: 'From Gallery'},
  ];

  const renderSort = (item: any) => {
    const {key, img, name} = item.item;
    return (
      <TouchableOpacity
        onPress={() => (key == 1 ? openCameraLib() : launchImageLibrary())}>
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

  const openCameraLib = () => {
    openCamera({cropping: false, useFrontCamera: true})
      .then(response => {
        setVisible(false);
        // console.log("res",resp)
        const split = response?.path.split('/');
        const imgName = split[split.length - 1];
        setCheque({
          name:
            Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
          type: response?.mime,
          uri: response?.path,
        });
        {
          setErCheque(null);
        }
        setVisible(false);
      })
      .catch((err: any) => {
        console.log('message', err);
        setVisible(false);
      });
  };

  const launchImageLibrary = async () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response: any) => {
      setVisible(false);
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
        setCheque({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
        {
          setErCheque(null);
        }
      }
    });
  };

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Text style={styles.labeltxt}>{'Account holder Name'}</Text>
      <TextBox
        placeholder={'Enter your name'}
        style={styles.textbox}
        value={acName}
        setValue={setAcName}
        error={setErAc}
      />
      {erAc ? <Text style={styles.errorTxt}>{erAc}</Text> : null}
      <Text style={styles.labeltxt}>{'Account Number'}</Text>
      <TextBox
        placeholder={'Enter your account number'}
        style={styles.textbox}
        value={acNum}
        setValue={setAcNum}
        error={setErNum}
      />
      {erNum ? <Text style={styles.errorTxt}>{erNum}</Text> : null}
      <Text style={styles.labeltxt}>{'IFSC Code'}</Text>
      <TextBox
        placeholder={'Enter your IFSC Code'}
        style={styles.textbox}
        value={ifCode}
        setValue={setIfCode}
        error={setErIfCode}
      />
      {erIfCode ? <Text style={styles.errorTxt}>{erIfCode}</Text> : null}
      <Text style={[styles.labeltxt, {marginTop: adjust(10)}]}>
        {'Upload Cancel Cheque'}
      </Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => setVisible(true)}>
          <Image
            source={cheque?.uri ? {uri: cheque.uri} : Images.upload}
            style={cheque.uri ? styles.uploadImg : styles.dummy}
          />
        </TouchableOpacity>
      </View>
      {erCheque ? (
        <Text style={[styles.errorTxt, {top: 0}]}>{erCheque}</Text>
      ) : null}
      <Image source={Images.line} style={styles.line} />
      <Text style={[styles.labeltxt, {marginTop: adjust(15)}]}>{'UPI ID'}</Text>
      <TextBox
        placeholder={'Enter your UPI ID'}
        style={styles.textbox}
        value={upi}
        setValue={setUpi}
        error={setErUpi}
        validate={valUpi}
      />
      {erUpi ? <Text style={styles.errorTxt}>{erUpi}</Text> : null}
      <Modal animationType={'slide'} transparent={true} visible={visible}>
        <View style={styles.modalview}>
          <View style={[styles.modal, {}]}>
            <View style={styles.cross}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
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
  labeltxt: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(5),
  },
  textbox: {
    marginBottom: adjust(7),
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
    // backgroundColor:'green'
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
  line: {
    // marginTop:adjust(20),
    width: '100%',
    marginTop: adjust(9),
  },
});
