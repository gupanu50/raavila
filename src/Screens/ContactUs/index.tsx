import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import CreateRequest from 'components/Support/CreateRequest';
import {showMessage} from 'react-native-flash-message';
import {Images} from '@/Assets';
import ContactInformation from './ContactInformation';
import CustomButton from 'components/CustomButton';
import Form from './Form';
import {useContactformMutation} from '@/Redux/services/contactUs';
import Loader from '@/ReusableComponent/Loader';

export default function Contact(props: any) {
  const [contactForm, {isLoading, isSuccess, data}] = useContactformMutation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string | number>('');
  const [description, setDescription] = useState<string>('');
  const [btn, setBtn] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        message: data?.message,
        type: data?.status ? 'success' : 'danger',
      });
      setName('');
      setMobile('');
      setEmail('');
      setDescription('');
      setActive(!active);
    }
  }, [isSuccess]);

  const _submit = async () => {
    if (btn) {
      const body: FormData = new FormData();
      body.append('name', name);
      body.append('email', email);
      body.append('mobile', mobile as string);
      body.append('description', description);
      console.log('===body==>', body);
      try {
        await contactForm(body);
      } catch (error) {
        console.log('===errorOccured==>', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Contact Us'} isBack />
      <ImageBackground source={Images.background} style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.WHITE : COLORS.MAIN},
            ]}
            onPress={() => setActive(false)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.MAIN : COLORS.WHITE},
              ]}>
              {'Contact Information'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerBtn,
              {backgroundColor: active ? COLORS.MAIN : COLORS.WHITE},
            ]}
            onPress={() => setActive(true)}>
            <Text
              style={[
                styles.txt,
                {color: active ? COLORS.WHITE : COLORS.MAIN},
              ]}>
              {'Contact Form'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {active ? (
            <Form
              setName={setName}
              setEmail={setEmail}
              setMobile={setMobile}
              setDescription={setDescription}
              name={name}
              email={email}
              mobile={mobile}
              description={description}
              active={setBtn}
            />
          ) : (
            <ContactInformation />
          )}
        </View>
        <Loader loading={isLoading} />
      </ImageBackground>
      {active ? (
        <CustomButton
          label={'Submit'}
          style={{backgroundColor: btn ? COLORS.MAIN : COLORS.GRAY}}
          disabled={!btn}
          press={_submit}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
  },
  headerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: adjust(157),
    width: '50%',
  },
  txt: {
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
});
