import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import adjust from '../adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {arrayData} from '@/Types';
import {useIsFocused} from '@react-navigation/native';
import {useLazyGetPaymentMethodsQuery} from '@/Redux/services/onlinePayment';
import Loader from '@/ReusableComponent/Loader';
export default function DropDown(props: any) {
  const {select, setSelect, style} = props;
  const [getPaymentMethods, {isLoading, data}] =
    useLazyGetPaymentMethodsQuery();
  const isFocus = useIsFocused();

  useEffect(() => {
    getMethods();
  }, [isFocus]);

  const getMethods = async () => {
    const date = new Date();
    const refetch = date.getSeconds();
    try {
      await getPaymentMethods(refetch);
    } catch (error) {
      console.log('===some error occured==>', error);
    }
  };

  const DATA: arrayData[] =
    data?.data.map((item: any) => ({
      label: item.payment_method,
      value: item.id,
    })) || [];

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={{color: 'black'}}
        containerStyle={{}}
        activeColor={COLORS.MAIN}
        dropdownPosition={'bottom'}
        data={DATA}
        placeholder={'Select One'}
        maxHeight={adjust(155)}
        labelField="label"
        valueField="value"
        value={select}
        onChange={(item: any) => {
          setSelect(item.value);
        }}
      />
      <Loader loading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: adjust(40),
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 8,
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
