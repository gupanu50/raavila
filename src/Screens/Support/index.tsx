import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from 'header';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import CreateRequest from 'components/Support/CreateRequest';
import {showMessage} from 'react-native-flash-message';
import RequestStatus from 'components/Support/RequestStatus';
import {Images} from '@/Assets';
import CustomButton from 'components/CustomButton';
import {VALIDATE_FORM} from '@/Constant';
import {useSupportRaiseTicketMutation} from '@/Redux/services/support/raiseTicket';
import {arrayData} from '@/Types';
import Loader from '@/ReusableComponent/Loader';

export default function Support() {
  const [active, setActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [btn, setBtn] = useState<boolean>(true);
  const [select, setSelect] = useState<string>('');
  const [errorType, setErrorType] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<any>({
    name: '',
    type: '',
    uri: '',
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [supportRaiseTicket, {isSuccess, isLoading, data}] =
    useSupportRaiseTicketMutation<any>();
  useEffect(() => {
    if (isSuccess) {
      showMessage({
        message: data?.message,
        type: data?.status ? 'success' : 'danger',
      });
      setTitle('');
      setDescription('');
      setSelect(''),
        setAttachment({
          name: '',
          type: '',
          uri: '',
        });
      setActive(true);
    }
  }, [isSuccess]);
  const raiseQuery = async () => {
    const body = new FormData();
    body.append('type', select);
    body.append('title', title);
    body.append('description', description);
    {
      attachment.name ? body.append('support_file', attachment) : null;
    }
    try {
      await supportRaiseTicket(body);
      console.log('bodyofraisesupport', body);
    } catch (error: any) {
      showMessage({
        message: error.toString(),
        type: 'danger',
      });
      console.log('==error==', error);
    }
  };
  const _submit = () => {
    if (btn) {
      if (select === '') {
        setErrorType(VALIDATE_FORM.TYPE);
      } else {
        raiseQuery();
      }
    }
  };
  const dropDownData: arrayData[] = [
    {label: 'Payment', value: 'Payment'},
    {label: 'Profile', value: 'Profile'},
  ];
  return (
    <View style={styles.container}>
      <Header title={'Support'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
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
              {'Create a Request'}
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
              {'Request Status'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {active ? (
            <RequestStatus />
          ) : (
            <CreateRequest
              setTitle={setTitle}
              select={select}
              setSelect={setSelect}
              setDescription={setDescription}
              title={title}
              description={description}
              active={setBtn}
              errorType={errorType}
              setErrorType={setErrorType}
              attachment={attachment}
              setAttachment={setAttachment}
              visible={visible}
              setVisible={setVisible}
              data2={dropDownData}
            />
          )}
        </View>
        {active ? null : (
          <CustomButton
            label={'Submit'}
            style={{backgroundColor: btn ? COLORS.MAIN : COLORS.GRAY}}
            press={_submit}
            disabled={!btn}
          />
        )}
      </ImageBackground>
      <Loader loading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
    flex: 1,
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
  main: {
    flex: 1,
    margin: adjust(20),
  },
  label: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  bgImg: {
    flex: 1,
  },
});
