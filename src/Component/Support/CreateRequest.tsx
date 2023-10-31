import { COLORS, FONT_FAMILIES, REGEX } from '@/Configration';
import { VALIDATE_FORM } from '@/Constant';
import { Formik, Field } from 'formik';
import { KeyboardAvoidingView, View, StyleSheet, Text, TouchableOpacity, Image, Modal, FlatList, Platform } from 'react-native';
import * as yup from 'yup'
import adjust from '../adjust'
import React, { useRef, useEffect, useState } from 'react'
import CustomInput from '../CustomInput'
import { valid } from '@/Types';
import DropDown from '../DropDown';
import { Images } from '@/Assets';
import * as ImagePicker from 'react-native-image-picker';
import { openCamera } from 'react-native-image-crop-picker';
const CreateRequest = (props: any) => {
  const {
    setTitle,
    select,
    setSelect,
    title,
    setDescription,
    description,
    active,
    errorType,
    setErrorType,
    attachment,
    setAttachment,
    visible,
    setVisible,
    data2
  } = props;
  // ********************************* validation Schema ***************************************
  const signUpValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required(VALIDATE_FORM.TITLE),
    description: yup.string().required(VALIDATE_FORM.QUERRY),
  });

  // *********************************** formik ref *******************************************
  const formikRef: any = useRef(null);

  // *********************************** useEffect ********************************************
  useEffect(() => {
    validateForm();
  }, [title, description]);

  // *********************************** validateForm *****************************************
  const validateForm = () => {
    if (formikRef.current) {
      formikRef.current.validateForm().then((errors: valid) => {
        if (Object.keys(errors).length === 0) {
          active(true);
        } else {
          active(false);
        }
      });
    }
  };
  const SORT = [
    { key: 1, img: Images.camera, name: 'Capture Image' },
    { key: 2, img: Images.upload_img, name: 'From Gallery' },
  ];
  const openCameraLib = () => {
    let SET: any;
    SET = setAttachment;
    openCamera({ cropping: false, useFrontCamera: true })
      .then(response => {
        // console.log("res",resp)
        const split = response?.path.split('/');
        const imgName = split[split.length - 1];
        SET({
          name:
            Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
          type: response?.mime,
          uri: response?.path,
        });
        setVisible(false);
      })
      .catch(err => {
        console.log('message', err);
        setVisible(false);
      });
  };

  // **********************launchImageLibrary******************************************
  const launchImageLibrary = async () => {
    let SET: any;
    SET = setAttachment
    setVisible(false);
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log('response', JSON.stringify(response));
        SET({
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
      }
    });
  };
  const renderSort = (item: any) => {
    const { key, img, name } = item.item;
    return (
      <TouchableOpacity
        onPress={() =>
          key == 1 ? openCameraLib() : launchImageLibrary()
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
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}>
        <Formik
          innerRef={formikRef}
          validationSchema={signUpValidationSchema}
          initialValues={{
            title: title,
            description: description,
          }}
          onSubmit={(val: any) => alert('===>')}>
          {({ handleChange, handleBlur, handleSubmit }) => (
            <>
              <Text style={styles.label}>{'Type'}</Text>
              <DropDown select={select} setSelect={setSelect} setError={setErrorType} data2={data2}/>
              {errorType ? (
                <Text style={[styles.errorTxt, { top: 0 }]}>{errorType}</Text>
              ) : null}
              <Text style={[styles.label, { marginTop: adjust(6) }]}>
                {'Title'}
              </Text>
              <Field
                component={CustomInput}
                autoCapitalize="none"
                setValue={setTitle}
                handleChange={handleChange}
                name={'title'}
                value={title}
                placeholder="Enter Title"
                keyboardType="email-address"
              />
              <Text style={[styles.label, { marginTop: adjust(6) }]}>
                {'Description'}
              </Text>
              <Field
                component={CustomInput}
                name={'description'}
                setValue={setDescription}
                value={description}
                handleChange={handleChange}
                placeholder="Enter querry"
                multiline
                numberOfLines={6}
              />
              <Text style={[styles.label, { marginTop: adjust(6) }]}>
                {'Attachment'}
                <Text style={[styles.label, { marginTop: adjust(6), color: COLORS.GRAY }]}>{' (Optional)'}</Text>
              </Text>
              <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.uploadBtn} onPress={() => setVisible(true)}>
                  <Image
                    source={attachment?.uri ? { uri: attachment?.uri } : Images.upload}
                    style={attachment?.uri ? styles.uploadImg : styles.dummy}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <Modal animationType={'slide'} transparent={true} visible={visible}>
        <View
          style={styles.modalview}
        // onPress={() => setVisible(false)}
        >
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
                  { fontSize: adjust(12), padding: 0, color: COLORS.DARK },
                ]}>
                {'Upload Photos'}
              </Text>
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
    </View>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({
  input: {
    height: '10%',
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: adjust(5),
    paddingLeft: adjust(8),
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    backgroundColor: COLORS.WHITE,
  },
  label: {
    color: COLORS.DARK,
    fontSize: adjust(14),
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
    alignItems: 'center'
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
  errorTxt: {
    color: 'red',
    fontSize: adjust(10),
    top: adjust(-10),
    fontFamily: FONT_FAMILIES.AMERETTO,
  }
});
