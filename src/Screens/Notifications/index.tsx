import { FlatList, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import Header from '@/ReusableComponent/Header';
import adjust from '@/Component/adjust';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import { Images } from '@/Assets';

const Notifications = () => {
  const PickupData = [
    {
      key: 1,
      image: Images.committeeNotification,
      title: 'MY COMMITTEE',
      description: 'Dummy text here as notification dummy text here so on to be declared',
      time: '2:21 PM',
    },
    {
      key: 2,
      description: 'Dummy text here as notification dummy text here so on to be declared',
      title: 'MY INVESTMENT',
      image: Images.investmentNotification,
      time: '2:21 PM',
    },
    {
      key: 3,
      description: 'Dummy text here as notification dummy text here so on to be declared',
      title: 'MY COMMITTEE',
      image: Images.committeeNotification,
      time: '2:21 PM',
    },
    {
      key: 4,
      description: 'Dummy text here as notification dummy text here so on to be declared',
      image: Images.committeeNotification,
      title: 'MY COMMITTEE',
      time: '2:21 PM',
    },
    {
      key: 5,
      description: 'Dummy text here as notification dummy text here so on to be declared',
      title: 'MY ACCOUNT',
      image: Images.accountNotification,
      time: '2:21 PM',
    },
    {
      key: 6,
      description: 'Dummy text here as notification dummy text here so on to be declared',
      title: 'MY ACCOUNT',
      image: Images.accountNotification,
      time: '2:21 PM',
    },
  ];
  const renderDisplay = (item: any) => {
    const { description, time, image, title } = item.item;
    return (
      <View style={styles.renderMainView}>
        <View style={styles.flexView}>
          <View style={styles.flexView2}>
            <Image source={image} style={styles.flatImage} />
            <View style={styles.flexView3}>
              <Text style={styles.renderTextMain}>{title}</Text>
              <Text style={styles.renderTextDescription}>{description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.flexView1}>
          <Text style={styles.renderTextTime}>{time}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Notifications" isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <View style={styles.main}>
          <FlatList data={PickupData} renderItem={renderDisplay} showsVerticalScrollIndicator={false} />
        </View>
      </ImageBackground>
      {/* <Loader loading={isLoading} /> */}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderMainView: {
    height: adjust(85),
    // width: adjust(280),
    borderRadius: 10,
    marginVertical: adjust(5),
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
  },
  renderTextMain: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: adjust(12),
    color: COLORS.DARK,
    paddingTop: adjust(10),
    paddingLeft: adjust(10),
  },
  renderTextDescription: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: adjust(12),
    marginLeft: adjust(10),
    paddingTop: adjust(5),
    color: COLORS.DARK,
    // padding:adjust(10)
  },
  renderTextTime: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: adjust(11),
    color: COLORS.DARK,
    padding: adjust(10)
    // marginTop: adjust(5),
    // marginLeft: adjust(10),
    // paddingLeft: adjust(5)
  },
  bgImg: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: adjust(15),
  },
  flexView: {
    width: '75%'
  },
  flexView1: {
    width: '25%'
  },
  flatImage: {
    marginTop: adjust(10),
    marginLeft: adjust(15)
  },
  flexView2: {
    flexDirection: 'row'
  },
  flexView3: {
    flexDirection: 'column', width: '80%'
  }
});
