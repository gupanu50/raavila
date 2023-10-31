import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import CurrentLoan from './CurrentLoan';
import Requested from './Requested';
import CustomTabBar from 'components/CustomTabBar';

export default function MyLoan(props:any) {
  const{route} = props;
  const{params} = route; 
  const [active, setActive] = useState<boolean>(params?.active?params?.active:false);

  return (
    <View style={styles.container}>
      <Header title={'My Loan'} isBack />
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
              {'Current Loan'}
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
              {'Requested'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {active ?<Requested />: <CurrentLoan /> }
        </View>
      </ImageBackground>
      <CustomTabBar/>
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
    width: adjust(157),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  txt: {
    fontSize: adjust(13),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
});
