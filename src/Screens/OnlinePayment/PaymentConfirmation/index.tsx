import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform
} from 'react-native';
import React, {useState} from 'react';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {Images} from '@/Assets';
import Header from '@/ReusableComponent/Header';
import CustomButton from '@/Component/CustomButton';
import {openCamera} from 'react-native-image-crop-picker';
import * as ImagePicker from 'react-native-image-picker';

export default function PaymentConfirmation() {
  const [visible, setVisible] = useState<boolean>(false);
  const [receipt, setReceipt] = useState({
    name: '',
    type: '',
    uri: '',
  });
  const [errorReceipt, setErrorReceipt] = useState<string | null>(null);

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
        setReceipt({
          name:
            Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
          type: response?.mime,
          uri: response?.path,
        });
        {
          setErrorReceipt(null);
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
        setReceipt({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
        {
          setErrorReceipt(null);
        }
      }
    });
  };

  function _validate(){
    let flag:boolean = true;
    if(receipt.name === ''){
      setErrorReceipt('*Please Upload Reciept');
      flag = false;
    }
    return flag;
  }

  const _submit = () => {
    if(_validate()){

    }
  }

  return (
    <View style={styles.container}>
      <Header title={'Payment Confirmation'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          <Text style={styles.txt}>{'Upload Receipt'}</Text>
          <View style={styles.uploadContainer}>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => setVisible(true)}>
              <Image
                source={receipt?.uri ? {uri: receipt.uri} : Images.upload}
                style={receipt.uri ? styles.uploadImg : styles.dummy}
              />
            </TouchableOpacity>
          </View>
          {errorReceipt ? (
            <Text style={[styles.errorTxt]}>{errorReceipt}</Text>
          ) : null}
          <View style={styles.maritalBtn}>
            <Image source={Images.info1} style={{tintColor: COLORS.MAIN}} />
            <Text style={styles.maritalTxt}>
              {
                'Please upload a receipt of the transaction in order to the security of the transfer.'
              }
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* <Loader loading={isLoading} /> */}
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
      <CustomButton label={'Submit'} press={_submit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
  uploadContainer: {
    height: adjust(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    height: '95%',
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
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    top: adjust(-4),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  round: {
    backgroundColor: COLORS.WHITE,
    height: adjust(15),
    width: adjust(15),
    borderRadius: 5,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
  maritalTxt: {
    fontSize: adjust(11),
    fontFamily: FONT_FAMILIES.REGULAR,
    color: COLORS.DARK,
    paddingLeft: adjust(8),
  },
  maritalBtn: {
    flexDirection: 'row',
    marginTop: adjust(10)
  },
});
