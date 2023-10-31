import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import adjust from '@/Component/adjust';
import Header from '@/ReusableComponent/Header';
import CashForm from './CashForm';
import CashStatus from './CashStatus';
import {Images} from '@/Assets';

const Cash = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const {route} = props;
  const {params} = route;
  return (
    <View style={styles.container}>
      <Header title={'Pay Through Cash'} isBack />
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
              {'Pay Through Cash'}
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
              {'Cash Pickup Status'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {!active ? (
            <CashForm params={params} setActive={setActive} />
          ) : (
            <CashStatus params={params} />
          )}
        </View>
        {/* {active ? null : (
          <CustomButton
            label={'PAy Through Cash'}
            // style={{backgroundColor: btn ? COLORS.MAIN : COLORS.GRAY}}
            // press={_submit}
            // disabled={!btn}
          />
        )} */}
      </ImageBackground>
    </View>
  );
};

export default Cash;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
    flex: 1,
  },
  header: {
    height: adjust(30),
    flexDirection: 'row',
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: COLORS.BORDER_COLOR,
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
    // margin: adjust(20),
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
