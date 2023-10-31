import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '@/ReusableComponent/Header'
import adjust from '@/Component/adjust'
import { useLazyGetProfileQuery } from '@/Redux/services/profile/profile'
import { useIsFocused } from '@react-navigation/native';
import { COLORS, FONT_FAMILIES, FONT_SIZES } from '@/Configration'
import Loader from '@/ReusableComponent/Loader'
const BankAccountDetails = () => {
  const [Data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const isFocused = useIsFocused();
  const [getProfile, result] = useLazyGetProfileQuery()
  const getProfileInfo = async () => {
    setLoading(true);
    const refetch = Date.now()
    const data: any = await getProfile(refetch, false).unwrap()
    setData(data?.data?.bank)
    setLoading(false);
    // console.log("Data caching", data?.data?.bank)
  }
  useEffect(() => {
    getProfileInfo()
  }, [isFocused])
  const renderDisplay = (item: any) => {
    const { account_holder_name, account_number, ifsc_code } = item?.item
    return (
      <View style={styles.box}>
        <Text style={styles.headingText}>Account Holder Name</Text>
        <Text style={styles.valueText}>{account_holder_name}</Text>
        <Text style={styles.headingText}>Account Number</Text>
        <Text style={styles.valueText}>{account_number}</Text>
        <Text style={styles.headingText}>IFSC Code</Text>
        <Text style={styles.valueText}>{ifsc_code}</Text>
      </View>
    )
  }
  return (
    <View style={styles.main}>
      <Header title='Bank Account Details' isBack />
      <View style={styles.flatListView}>
        <FlatList
          data={Data}
          renderItem={renderDisplay}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Loader loading={loading} />
    </View>
  )
}

export default BankAccountDetails

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  box: {
    backgroundColor: COLORS.WHITE,
    marginVertical: adjust(5),
    borderRadius: adjust(5),
    padding: adjust(5)
  },
  headingText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: FONT_SIZES.SUB_HEADING,
    marginLeft: adjust(10),
    color: COLORS.DARK,
    paddingVertical: 5
  },
  valueText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontWeight: '400',
    fontSize: FONT_SIZES.PRIMARY,
    marginLeft: adjust(10),
    color: COLORS.DARK
  },
  flatListView: {
    margin: adjust(15),
    flex: 1
  }
})