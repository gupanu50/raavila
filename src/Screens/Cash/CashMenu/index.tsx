import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/ReusableComponent/Header'
import CashStatus from '../CashStatus'

const CashMenu = () => {
  return (
    <View style={styles.main}>
        <Header title='Cash Status' isBack/>
        <CashStatus />
    </View>
  )
}

export default CashMenu

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})