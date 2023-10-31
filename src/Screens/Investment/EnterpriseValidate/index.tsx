import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import React, { useState,useEffect } from 'react'
import Header from '@/ReusableComponent/Header'
import TextBox from '@/Component/TextBox'
import { COLORS, FONT_FAMILIES } from '@/Configration'
import adjust from '@/Component/adjust'
import { Images } from '@/Assets'
import * as ImagePicker from 'react-native-image-picker';
import { SCREENS, VALIDATE_FORM } from '@/Constant'
import CustomTabBar from '@/Component/CustomTabBar'
import { image } from '@/Types'
import CustomButton from '@/Component/CustomButton'
import { useValidateInterpriseMutation } from '@/Redux/services/investments'
import Loader from '@/ReusableComponent/Loader'
import { showMessage } from 'react-native-flash-message'
import { openCamera } from 'react-native-image-crop-picker'
const { BUSINESS } = SCREENS
const EnterpriseValidate = (props: any) => {
  const { navigation,route } = props;
  const{params} = route;
  const [validateEnterprise,{data,isLoading,isSuccess}] = useValidateInterpriseMutation();
  const [enterprise, setEnterprise] = useState<string>('');
  const [errorValidateEnterprise, setErrorValidateEnterprise] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [gstNumber, setGstNumber] = useState<string>('');
  const [errorAddress, setErrorAddress] = useState<string | null>(null);
  const [errorGstNumber, setErrorGstNumber] = useState<string | null>(null);
  const [errorCertificates, setErrorCertificates] = useState<string | null>(null);
  const [errorPan, setErrorPan] = useState<string>('');
  const [visible, setVisible] = useState<any>({
    certificate:false,
    pan:false
  });
  const [pro, setPro] = useState<object>({});
  const [certificates, setCertificates] = useState<any>({
    name: '',
    type: '',
    uri: '',
  })
  const [pan, setPan] = useState<any>({
    name: '',
    type: '',
    uri: '',
  })
  const SORT = [
    { key: 1, img: Images.camera, name: 'Capture Image' },
    { key: 2, img: Images.upload_img, name: 'From Gallery' },
  ];

  // open camera function
  const openCameraLib = (set: string) => {
    // checkAndRequestPermission()
    // setVisible(false)
    let SET: any;
    let ER: any;
    if (set == 'certificates') {
      SET = setCertificates;
      ER = setErrorCertificates;
    } else {
      SET = setPan;
      ER = setErrorPan;
    }
    openCamera({cropping: false, useFrontCamera: true})
      .then(response => {
        setVisible({
          certificate: false,
          pan: false
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
        setVisible(false);
      })
      .catch(err => {
        console.log('message', err);
        setVisible({
          certificate: false,
          pan: false
        })
      });
  };

  // **********************launchImageLibrary******************************************
  const launchImageLibrary = async (set: string) => {
    let SET: any;
    let ER: any;
    if (set == 'certificates') {
      SET = setCertificates;
      ER = setErrorCertificates;
    } else {
      SET = setPan;
      ER = setErrorPan;
    }
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response: any) => {
      setVisible({
        certificate: false,
        pan: false
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

  const renderSort = (item: any) => {
    const { key, img, name } = item.item;
    return (
      <TouchableOpacity
        onPress={() => (key == 1) ? openCameraLib(visible.certificate?'certificates':'pan') : launchImageLibrary(visible.certificate?'certificates':'pan')}
      >
        <View style={styles.sortcontainer}>
          <View style={styles.left}>
            <Image source={img} style={{}} />
          </View>
          <View style={styles.right}>
            <Text style={[styles.txt, { fontSize: adjust(12), textAlign: 'left', padding: 0, color: COLORS.DARK }]}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // *********************************** Address validation ********************************
  const _addressValidate = (mail: string) => {
    if (mail === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
    } else {
      setErrorAddress(null);
    }
  };
  const _enterpriseValidate = (mail: string) => {
    if (mail === '') {
      setErrorValidateEnterprise(VALIDATE_FORM.ENTERPRISE);
    } else {
      setErrorValidateEnterprise(null);
    }
  };
  const _gstValidate = (mail: string) => {
    if (mail === '') {
      setErrorGstNumber(VALIDATE_FORM.GSTNUMBER);
    } else {
      setErrorGstNumber(null);
    }
  };
  const isValidate = () => {
    let flag: boolean = true;
    if (enterprise === '') {
      setErrorValidateEnterprise(VALIDATE_FORM.ENTERPRISE);
      flag = false;
    }
    if (address === '') {
      setErrorAddress(VALIDATE_FORM.ADDRESS);
      flag = false;
    }
    if (certificates.uri == '') {
      setErrorCertificates(VALIDATE_FORM.CERTIFICATES);
      flag = false;
    }
    if (gstNumber === '') {
      setErrorGstNumber(VALIDATE_FORM.GSTNUMBER);
      flag = false;
    }
    if (pan.uri == '') {
      setErrorPan(VALIDATE_FORM.PAN);
      flag = false;
    }
    else {
      return flag;
    }
  }
  const _validateEnterprise = async () => {
    if (isValidate()) {
      const body:FormData = new FormData();
      body.append('enterprise',enterprise);
      body.append('address',address);
      body.append('certificates',certificates);
      body.append('gst_number',gstNumber);
      body.append('pancard',pan);
      try {
        await validateEnterprise(body)
      } catch (error) {
       console.log('===error===>',error); 
      }
    }
  }

  useEffect(() => {
    if(isSuccess){
      showMessage({
        message:data?.message,
        type:'success',
        autoHide:true,
        duration:1000
      })
      setEnterprise('');
      setAddress('');
      setCertificates({
        name:'',
        type:'',
        uri:''
      });
      setGstNumber('');
      setPan({
        name:'',
        type:'',
        uri:''
      });
      navigation.navigate(BUSINESS,[params,enterprise])
    }
  }, [isSuccess])

  return (
    <>
      <View style={styles.container}>
        <Header title={'Enterprise Investment'} isBack />
        <View style={{flex:1,margin:adjust(15)}}>
          <ScrollView style={{ flex: 1 }} scrollEnabled showsVerticalScrollIndicator={false}>
            <Text style={styles.labeltxt}>{'Validate Enterprise'}</Text>
            <TextBox placeholder={'Enter Here'} style={styles.textbox} value={enterprise} setValue={setEnterprise} containerStyle={styles.containerStyle} validate={_enterpriseValidate} />
            {errorValidateEnterprise ? <Text style={styles.errorTxt}>{errorValidateEnterprise}</Text> : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Address'}</Text>
            <TextBox placeholder={'Enter Here'} style={styles.textbox} value={address} setValue={setAddress} containerStyle={styles.containerStyle} validate={_addressValidate} />
            {errorAddress ? <Text style={styles.errorTxt}>{errorAddress}</Text> : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Upload Certificates'}</Text>
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadBtn} onPress={() => setVisible((prevState:any)=>({
                ...prevState,certificate:true
              }))}>
                <Image source={certificates?.uri ? { uri: certificates.uri } : Images.upload} style={certificates.uri ? styles.uploadImg : styles.dummy} />
              </TouchableOpacity>
            </View>
            {errorCertificates ? <Text style={[styles.errorTxt, { top: 0 }]}>{errorCertificates}</Text> : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>{'GST Number'}</Text>
            <TextBox placeholder={'Enter Here'} style={styles.textbox} value={gstNumber} setValue={setGstNumber} containerStyle={styles.containerStyle} validate={_gstValidate} length={15}/>
            {errorGstNumber ? <Text style={styles.errorTxt}>{errorGstNumber}</Text> : null}
            <Text style={[styles.labeltxt, styles.labeltxt1]}>{'Upload Pan'}</Text>
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadBtn} onPress={() => setVisible((prevState:any)=>({
                ...prevState,pan:true
              }))}>
                <Image source={pan?.uri ? { uri: pan.uri } : Images.upload} style={pan.uri ? styles.uploadImg : styles.dummy} />
              </TouchableOpacity>
            </View>
            {errorPan ? <Text style={[styles.errorTxt, { top: 0 }]}>{errorPan}</Text> : null}
          </ScrollView>
          </View>
        <CustomButton label='Validate' press={()=> _validateEnterprise()} />
      </View>
      <Loader loading={isLoading} />
      <Modal animationType={'slide'} transparent={true} visible={visible.certificate?visible.certificate:visible.pan}>
        <View style={styles.modalview}
        // onPress={() => setVisible(false)}
        >
          <View style={[styles.modal, {}]}>
            <View style={styles.cross}>
              <TouchableOpacity onPress={() => setVisible({certificate:false,pan:false})} style={styles.crossbtn}>
                <Image style={styles.close} source={Images.cross} />
              </TouchableOpacity>
            </View>
            <View style={styles.upload}>
              <Image source={Images.upload} style={{}} />
              <Text style={[styles.txt, { fontSize: adjust(12), padding: 0, color: COLORS.DARK }]}>{'Upload Photos'}</Text>
            </View>
            <View style={[styles.sortflatlist, { justifyContent: 'center' }]}>
              <FlatList
                data={SORT}
                renderItem={renderSort}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </Modal>
      <CustomTabBar />
    </>
  )
}

export default EnterpriseValidate

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labeltxt: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    // marginTop: adjust(15),
    fontWeight: '400',
    // marginLeft: adjust(20)
  },
  labeltxt1: {
    marginTop: adjust(6),
  },
  labeltxt2: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: adjust(15),
  },
  textbox: {
    // width: adjust(275),
    height: adjust(40),
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY,
    backgroundColor: COLORS.WHITE,
    // marginLeft: adjust(20)
  },
  uploadContainer: {
    height: adjust(104),
    justifyContent: 'center',
    // marginLeft: adjust(20)
  },
  uploadBtn: {
    height: adjust(90),
    // width: adjust(275),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: COLORS.WHITE
  },
  uploadImg: {
    flex: 1,
    // height: adjust(90),
    // width: adjust(250),
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dummy: {

  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    padding: adjust(12)
  },
  sortcontainer: {
    height: adjust(35),
    width: adjust(190),
    marginVertical: adjust(3),
    borderRadius: 8,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    flexDirection: 'row',
  },
  left: {
    width: adjust(37),
    // height: adjust(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    // height: adjust(20),
    width: adjust(90),
    justifyContent: 'center',
    // backgroundColor:'yellow'
  },
  modalview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor:'green',
    // height:adjust(1500),
    // width:adjust(1100)
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    height: adjust(170),
    width: adjust(200),
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
    // backgroundColor:'orange'
  },
  crossbtn: {
    height: adjust(25),
    width: adjust(27),
    justifyContent: 'center',
    alignItems: 'center'
  },
  close: {
    tintColor: 'black',
  },
  sortflatlist: {
    flex: 1,
    alignItems: 'center'
  },
  upload: {
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  containerStyle: {
    height: adjust(45),
  },
  bottomView: {
    height: adjust(40),
    backgroundColor: COLORS.DARK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    // marginLeft: adjust(20),
    fontFamily: FONT_FAMILIES.AMERETTO
  },
  mainView: {
    flex: 1, alignItems: 'center'
  }
})