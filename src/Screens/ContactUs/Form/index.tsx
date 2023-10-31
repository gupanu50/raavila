import {COLORS, FONT_FAMILIES, REGEX} from '@/Configration';
import {VALIDATE_FORM} from '@/Constant';
import {Formik, Field} from 'formik';
import {KeyboardAvoidingView, View, StyleSheet, Text} from 'react-native';
import * as yup from 'yup';
import React, {useRef, useEffect} from 'react'
import {valid} from '@/Types';
import CustomInput from '@/Component/CustomInput';
import adjust from '@/Component/adjust';

const CreateRequest = (props: any) => {
  const {
    setName,
    setEmail,
    setDescription,
    name,
    email,
    description,
    active,
    mobile,
    setMobile,
  } = props;


  // ********************************* validation Schema ***************************************
  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required(VALIDATE_FORM.NAME),
    email: yup
      .string()
      .matches(REGEX.EMAIL, VALIDATE_FORM.EMAIL_VALID)
      .required(VALIDATE_FORM.EMAIL),
    mobile: yup
      .string()
      .matches(REGEX.MOBILE, VALIDATE_FORM.MOBILE_VALID)
      .required(VALIDATE_FORM.MOBILE),
    description: yup.string().required(VALIDATE_FORM.QUERRY),
  });

  // *********************************** formik ref *******************************************
  const formikRef: any = useRef(null);

  // *********************************** useEffect ********************************************
  useEffect(() => {
    validateForm();
  }, [name, email, description, mobile]);

  // *********************************** validateForm *****************************************
  const validateForm = () => {
    if (formikRef.current) {
      formikRef.current.validateForm().then((errors: valid) => {
        console.log('==errors==>',errors);
        if (Object.keys(errors).length === 0) {
          active(true);
        } else {
          active(false);
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={100}>
        <Formik
          innerRef={formikRef}
          validationSchema={signUpValidationSchema}
          initialValues={{
            fullName: name,
            email: email,
            description: description,
            mobile: mobile,
          }}
          onSubmit={(val: any) => console.log('===>')}>
          {({handleChange}) => (
            <>
              <Text style={styles.label}>{'Full Name'}</Text>
              <Field
                component={CustomInput}
                setValue={setName}
                handleChange={handleChange}
                name={'fullName'}
                value={name}
                placeholder="Full Name"
              />
              <Text style={[styles.label, {marginTop: adjust(6)}]}>
                {'Email Address'}
              </Text>
              <Field
                component={CustomInput}
                autoCapitalize="none"
                setValue={setEmail}
                handleChange={handleChange}
                name={'email'}
                value={email}
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Text style={[styles.label, {marginTop: adjust(6)}]}>
                {'Mobile Number'}
              </Text>
              <Field
                component={CustomInput}
                autoCapitalize="none"
                setValue={setMobile}
                handleChange={handleChange}
                name={'mobile'}
                value={mobile}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                maxLength={10}
              />
              <Text style={[styles.label, {marginTop: adjust(6)}]}>
                {'Short Description'}
              </Text>
              <Field
                component={CustomInput}
                name={'description'}
                setValue={setDescription}
                value={description}
                handleChange={handleChange}
                placeholder="Tell us your querry"
                multiline
                numberOfLines={3}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
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
});
