import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Grid, Fold,CircleFade,Circle} from 'react-native-animated-spinkit';
import { COLORS } from '@/Configration';
// var Spinner = require('react-native-spinkit');
const Loader = (props: any) => {
  const {loading} = props;

  return (
    <>
      {loading && (
        <View style={styles.container}>
          {/* <Grid
            size={100}
            color={COLORS.MAIN}
          /> */}
          <Circle  size={75} color={COLORS.MAIN} />
        </View>
      )}
    </>
  );
};
export default Loader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

// import { View, StyleSheet } from 'react-native';
// import React from 'react';
// import { COLORS } from '@/Configration';
// var Spinner = require('react-native-spinkit');
// const Loader = (props: any) => {
//     const{loading} = props;
//     return (
//         <View style={styles.container}>
//             <Spinner isVisible={loading} size={100} type={'Wave'} color={COLORS.MAIN} />
//         </View>
//     )
// };
// export default Loader
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
// });
