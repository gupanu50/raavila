import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React from 'react';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import {Images} from '@/Assets';
import { downloadPdf } from '@/Component/DownloadPdf';

const ReturnReports = (props: any) => {
  const {data, isRefresh, setRefresh} = props;

  const renderDisplay = (item: any) => {
    const {invest_account, created_at} = item.item;

    const date = new Date(created_at);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return (
      <View style={styles.renderMainView}>
        <View style={styles.renderView}>
          <View style={styles.renderView1}>
            <Text style={styles.text}>{invest_account}</Text>
            <Text style={[styles.text, {marginTop: adjust(4)}]}>
              {formattedDate}
            </Text>
          </View>
          <View style={styles.renderView2}>
            <TouchableOpacity onPress={()=> downloadPdf('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','dummy')}>
              <Image source={Images.download} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderDisplay}
          // style={{ marginTop: adjust(10) }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={[
              styles.txt,
              {
                textAlign: 'center',
                fontSize: FONT_SIZES.TITLE,
              },
            ]}>
            No Return Reports Yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default ReturnReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: adjust(15),
  },
  renderMainView: {
    // height: adjust(70),
    // width: adjust(280),
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    // marginLeft: adjust(25),
    marginVertical: adjust(5),
  },
  renderView: {
    flexDirection: 'row',
    padding: adjust(10),
  },
  renderView1: {
    // height: adjust(70),
    justifyContent: 'center',
    width: adjust(190),
  },
  renderView2: {
    // height: adjust(70),
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: adjust(70),
  },
  text: {
    fontSize: adjust(13),
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    // marginLeft: adjust(10),
    color: COLORS.DARK,
  },
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    paddingTop: adjust(12),
    paddingLeft: adjust(13),
    color: COLORS.MAIN,
  },
});
