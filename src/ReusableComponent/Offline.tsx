import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function OfflineModal(props: any) {
  const {visible, retry, setVisible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Image source={Images.connectionLost} style={styles.gif} />
          <Text style={styles.txt}>{'Check your internet connection'}</Text>
          <TouchableOpacity style={styles.button} onPress={retry}>
            <Image source={Images.retry} style={styles.img} />
            <Text style={styles.txt}>{'Tap to retry'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000097',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '60%',
    width: '100%',
  },
  gif: {
    width: '100%',
    height:'40%',
    resizeMode: 'contain',
    tintColor:COLORS.MAIN
  },
  img: {
    height: '40%',
    width: '10%',
    tintColor: COLORS.DARK,
  },
  button: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  txt: {
    fontSize: FONT_SIZES.MEDIUM,
    fontFamily: FONT_FAMILIES.AMERETTO,
    paddingLeft: adjust(8),
    color: COLORS.DARK,
  },
});
