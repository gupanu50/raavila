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
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES, FONT_SIZES} from '@/Configration';
import { downloadPdf } from '@/Component/DownloadPdf';
import { useGetInvestReportMutation } from '@/Redux/services/investments';
import { showMessage } from 'react-native-flash-message';

const InvestmentReports = (props: any) => {
  const {data, isRefresh, setRefresh} = props;
  const[getInvestReport,{isSuccess,isLoading}] = useGetInvestReportMutation();

  console.log('=====reportProps=====>',data);

  const renderDisplay = (item: any) => {
    const {invest_account, created_at, investment,id} = item.item;
    let name: string;
    const plan_name: string = investment[0]?.plan_name;
    if (plan_name) {
      name = plan_name;
    } else {
      name = 'Investment Offer';
    }

    async function investReportApi(id:Number,name:string){
      const body = {
        invest_id:id
      }
      try {
        const response = await getInvestReport(body) 
        if(response?.data?.data){
          const pdf:string = response?.data?.data;
          downloadPdf(pdf,name)
        }
      } catch (error) {
        showMessage({
          message:JSON.stringify(error),
          type:'danger',
          autoHide:true,
          duration:800
        })
      }
    }

    const date = new Date(created_at);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return (
      <View style={styles.renderMainView}>
        <View style={styles.renderView}>
          <View style={styles.renderView1}>
            <Text style={[styles.text, {fontSize: FONT_SIZES.LABEL}]}>
              {name}
            </Text>
            <Text style={styles.text}>{invest_account}</Text>
            <Text style={[styles.text, {fontSize: FONT_SIZES.LABEL}]}>
              {formattedDate}
            </Text>
          </View>
          <View style={styles.renderView2}>
            <TouchableOpacity onPress={()=> investReportApi(id,invest_account)
              // downloadPdf('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','dummy')
              }>
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
            No Investment Reports Yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default InvestmentReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: adjust(15),
  },
  renderMainView: {
    // height: adjust(70),
    // width: adjust(280),
    backgroundColor: COLORS.WHITE,
    borderRadius: adjust(5),
    // marginLeft: adjust(25),
    marginVertical: adjust(5),
  },
  renderView: {
    flexDirection: 'row',
    padding: adjust(10),
  },
  renderView1: {
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
