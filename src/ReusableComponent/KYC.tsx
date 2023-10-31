import {FONT_FAMILIES, FONT_SIZES, RF} from '@/Configration';
import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
/**
 * @type KYCPrps
 * @typedef KYCProps
 * @author Ramesh
 */
export type KYCProps = {
  status: {status: KYC};
};

/**
 * @enum KYC
 */
enum KYC {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

/**
 * @author Ramesh
 * @constant COLORS
 */
const COLORS = {
  approved: 'green',
  pending: '#CC7722',
  rejected: 'red',
};

/**
 * @argument  Messages
 * @constant MESSAGES
 */
const MESSAGES = {
  approved: 'Your KYC has been approved',
  pending: 'Your KYC is under inspection Please wait.',
  rejected:
    'Your KYC has been rejected , please check your email for more detail.',
};

/**
 *
 * @param props
 * @returns
 */
const KYCStatus = (props: KYCProps) => {
  console.log('KYC Props', props);
  const showKyc = props?.status?.status ? props?.status?.status : KYC.PENDING;
  if (showKyc === KYC.APPROVED) {
    return null;
  }
  return (
    <View style={[styles.container, {backgroundColor: COLORS[showKyc]}]}>
      <Text style={styles.message}>{MESSAGES[showKyc]}</Text>
    </View>
  );
};

/**
 * @constant styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-end',
    height: 70 * RF,
    paddingBottom: 6 * RF,
  },
  message: {
    color: 'white',
    fontFamily: FONT_FAMILIES.BOLD,
    fontSize: FONT_SIZES.PRIMARY,
  },
});
export default KYCStatus;
