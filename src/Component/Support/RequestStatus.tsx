import { RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { requestStatus, statusColor } from '@/Types';
import { FlatList } from 'react-native-gesture-handler';
import adjust from '../adjust';
import { COLORS, FONT_FAMILIES, FONT_SIZES } from '@/Configration';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SCREENS } from '@/Constant';
import { useLazyRequestStatusSupportQuery } from '@/Redux/services/support/ticketStatus';
import moment from 'moment';
const { SUPPORTCHAT } = SCREENS
export default function RequestStatus() {
  const navigation: any = useNavigation();
  const [requestStatusSupport] = useLazyRequestStatusSupportQuery();
  const isFocused = useIsFocused();
  const [Data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const getSupportData = async () => {
    setLoading(true);
    const response: any = await requestStatusSupport('');
    console.log('====>', response);
    if (!response?.data?.data) {
      setData('');
      setLoading(false);
    } else {
      setData(response?.data?.data);
      setLoading(false);
    }
  }
  const onRefresh = () => {
    setIsRefresh(true);
    getSupportData();
    setIsRefresh(false);
  };
  useEffect(() => {
    getSupportData()
  }, [isFocused])

  let COLOR: statusColor = {
    3: '#FEC514',
    1: '#BD271E',
    2: '#00BFB3',
  };

  function renderItem(item: any) {
    const { request_number, date, status, type } = item.item;
    let colorValue;
    if (COLOR.hasOwnProperty(status)) {
      colorValue = COLOR[status];
    }

    return (
      <TouchableOpacity onPress={() => navigation.navigate(SUPPORTCHAT, { requestNumber: request_number, status: status })}>
        <View style={styles.slide}>
          <View style={styles.left}>
            <Text style={[styles.txt, { fontSize: adjust(10) }]}>{`Type - ${type}`}</Text>
            <Text
              style={[
                styles.txt,
                { color: COLORS.MAIN },
              ]}>{`Request ID - ${request_number}`}</Text>
            <Text style={[styles.txt, { marginTop: adjust(0), fontSize: adjust(10) }]}>{moment(date).format('DD/MM/YYYY')}</Text>
          </View>
          <View
            style={[
              styles.right,
              {
                backgroundColor: colorValue
              },
            ]}>
            {status === 1 ?
              <Text
                style={[
                  styles.txt,
                  { paddingLeft: 0, fontSize: adjust(10), color: COLORS.WHITE },
                ]}>
                {'Open'}
              </Text> :
              status === 2 ?
                <Text
                  style={[
                    styles.txt,
                    { paddingLeft: 0, fontSize: adjust(10), color: COLORS.WHITE },
                  ]}>
                  {'Close'}
                </Text> :
                <Text
                  style={[
                    styles.txt,
                    { paddingLeft: 0, fontSize: adjust(10), color: COLORS.WHITE },
                  ]}>
                  {'Under Process'}
                </Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {Data?<FlatList
        data={Data}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />:<View style={{flex: 1, justifyContent: 'center'}}>
      <Text
        style={[
          styles.txt,
          {
            textAlign: 'center',
            fontSize: FONT_SIZES.TITLE,
          },
        ]}>
        No Requests Yet
      </Text>
    </View>}
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: COLORS.WHITE,
    height: adjust(50),
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    flexDirection: 'row',
  },
  left: {
    width: adjust(200),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: adjust(5),
    borderBottomLeftRadius: adjust(5),
    borderRightWidth: 0,
    borderColor: COLORS.BORDER_COLOR,
    justifyContent: 'center'
  },
  txt: {
    fontSize: adjust(13),
    color: COLORS.DARK,
    paddingLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  right: {
    flex: 1,
    borderRadius: adjust(5),
    borderTopRightRadius: adjust(5),
    borderBottomRightRadius: adjust(5),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
