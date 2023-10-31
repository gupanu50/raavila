import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import adjust from './adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {arrayData} from '@/Types';
import {useIsFocused} from '@react-navigation/native';
import {useLazyGetAccountsQuery} from '@/Redux/services/withdrawal';

export default function DropDown(props: any) {
  const {
    select,
    setSelect,
    setError,
    style,
    data1,
    type,
    setAvailAmount,
    setAmount,
    data2,
  } = props;
  const isFocus = useIsFocused();
  const [getAccounts, {data}] = useLazyGetAccountsQuery();

  useEffect(() => {
    apiCall();
  }, [isFocus]);

  async function apiCall() {
    try {
      const date = new Date();
      const refetch = date.getSeconds();
      await getAccounts(refetch);
    } catch (error) {
      console.log('===error===>', error);
    }
  }

  const formattedData: arrayData[] =
    data?.data?.map((item: any) => ({
      label: item.account_number,
      value: item.account_number,
      amount: item.amount,
    })) || [];

  const formattedData1: arrayData[] =
    data?.bank_detals?.map((item: any) => ({
      label: item.account_number,
      value: item.account_number,
    })) || [];

  const DATA: arrayData[] = [
    {
      label: 'Student',
      value: 'student',
    },
    {
      label: 'Teacher',
      value: 'seacher',
    },
    {
      label: 'Professional',
      value: 'professional',
    },
    {
      label: 'Self-Employed',
      value: 'self-employed',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];

  return (
    <>
      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={{color: 'black', fontFamily: FONT_FAMILIES.AMERETTO}}
        containerStyle={{}}
        activeColor={COLORS.MAIN}
        dropdownPosition={'bottom'}
        data={
          // data1 ? (type == 'accounts' ? formattedData : formattedData1) : data2 ? data2 : DATA
          data1
            ? type === 'accounts'
              ? formattedData
              : formattedData1
            : data2 || DATA
        }
        placeholder={'Select One'}
        maxHeight={adjust(100)}
        labelField="label"
        valueField="value"
        value={select}
        onChange={(item: any) => {
          setSelect(item.value), setError(null);
          if (data1 && type === 'accounts') {
            const selectedItem = formattedData.find(
              (dataItem: any) => dataItem.value === item.value,
            );
            if (selectedItem && 'amount' in selectedItem) {
              const {amount} = selectedItem;
              setAvailAmount(amount);
              setAmount(0);
            }
          }
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: adjust(40),
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: adjust(5),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
    marginVertical: adjust(5),
  },
  placeholderStyle: {
    fontSize: adjust(13),
    color: 'grey',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  selectedTextStyle: {
    fontSize: adjust(14),
    marginLeft: 15,
    color: 'black',
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
});
