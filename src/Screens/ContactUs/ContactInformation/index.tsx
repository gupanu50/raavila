import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {arrayData} from '@/Types';
import {Images} from '@/Assets';
import {FlatList} from 'react-native-gesture-handler';
import adjust from 'components/adjust';
import {COLORS} from '@/Configration';
import {FONT_FAMILIES} from '@/Configration';
import {useLazyContactInformationQuery} from '@/Redux/services/contactUs';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@/ReusableComponent/Loader';

export default function ContactInformation() {
  const [contactInformation, {isLoading, data}] =
    useLazyContactInformationQuery();

  const isFocused = useIsFocused();
  const getInfo = async () => {
    try {
      const date = new Date();
      const refetch = date.getSeconds();
      await contactInformation(refetch);
    } catch (error) {
      console.log('=====error Occured====>', error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [isFocused]);

  const DATA: arrayData[] = [
    {img: Images.mail, name: data?.data?.email},
    {img: Images.phn, name: data?.data?.phone},
    {img: Images.mobile, name: data?.data?.mobile},
    {img: Images.whatsapp, name: data?.data?.whats_app_number},
  ];

  function renderItem(item: any) {
    const {img, name} = item.item;
    return (
      <View style={styles.slide}>
        <Image source={img} />
        <Text style={styles.txt}>{name}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <Loader loading={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    height: adjust(80),
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
  },
  txt: {
    fontSize: adjust(13),
    color: '#464646',
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginTop: adjust(6),
  },
});
