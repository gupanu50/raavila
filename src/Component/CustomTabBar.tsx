import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {Images} from '@/Assets';
import adjust from './adjust';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@/Constant';
const{MAIN,SUPPORT,MYPROFILE} = SCREENS;

export default function CustomTabBar() {
    const navigation:any = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(MAIN)}>
        <Image source={Images.home1} style={styles.img} />
        <Text style={styles.txt}>{'Home'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(SUPPORT)}>
        <Image
          source={Images.support}
          style={[styles.img, {width: adjust(15)}]}
        />
        <Text style={styles.txt}>{'Support'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(MYPROFILE)}>
        <Image
          source={Images.account}
          style={[styles.img, {height: adjust(15.4)}]}
        />
        <Text style={styles.txt}>{'Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK,
    flex: 0.1,
    flexDirection: 'row'

  },
  btn: {
    height: '100%',
    // width: adjust(110),
    justifyContent: 'center',
    alignItems: 'center',
    width:'33.34%'
  },
  txt: {
    color: COLORS.WHITE,
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
    paddingVertical: adjust(4),
  },
  img: {
    height: adjust(15),
    width: adjust(14),
  },
});
