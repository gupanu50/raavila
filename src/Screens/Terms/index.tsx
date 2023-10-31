import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import Header from 'header';
import {Images} from '@/Assets';
import adjust from 'components/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import {ScrollView} from 'react-native-gesture-handler';
import CustomTabBar from 'components/CustomTabBar';
import { useGetTermsQuery} from '@/Redux/services/pptc';

export default function Terms() {
  const {data} = useGetTermsQuery('Terms')
  console.log("Terms",data)
  const dummy: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac lorem non risus maximus vulputate viverra sit amet sem. Fusce consequat dictum est, et luctus arcu facilisis in. Curabitur et dui ut sapien luctus vehicula et et nisi. Nulla vestibulum varius elit ac facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam nisi elit, blandit feugiat ultrices in, aliquet ut odio. Quisque tempor sem eu metus rhoncus hendrerit. Etiam tristique, ligula non euismod tincidunt, nunc orci tempus ante, vel feugiat eros risus at lacus. Curabitur pellentesque lectus non turpis varius, ut auctor elit fringilla. Suspendisse at massa vel justo efficitur porttitor eget et sem. Cras vel efficitur felis. Vivamus ut massa sit amet leo efficitur mattis.Phasellus velit arcu, lobortis vel ultrices quis, accumsan vel nisl. Curabitur semper sollicitudin posuere. Duis mollis vitae diam et ornare. Pellentesque ut dui interdum, mattis arcu eget, posuere mauris. Vivamus ante nisl, venenatis nec cursus et, pellentesque ut lorem. Ut maximus tempus lacus, ut tristique lectus accumsan non. Pellentesque diam ipsum, imperdiet vitae magna vitae, vulputate facilisis risus.Vestibulum ac ante a magna lobortis facilisis nec et felis. Curabitur non pretium neque. Suspendisse mauris lacus, rutrum ut sapien vitae, congue sodales mi. Aenean tempus dui diam, in tristique magna lacinia vel. Curabitur fermentum ac purus sed malesuada. Vestibulum lacus tellus, pharetra a neque a, auctor mollis leo. Phasellus ut nunc lectus. Aenean volutpat est in aliquet tincidunt.Donec purus purus, pulvinar vel velit sit amet, porttitor elementum metus. Fusce accumsan magna sit amet ex convallis iaculis. In ac dui at ex convallis euismod. Suspendisse ac elit at tellus euismod rhoncus vel sed dui. Etiam lorem elit, condimentum id erat quis, luctus molestie risus. Proin maximus sit amet nunc tempor fermentum. Etiam nunc dolor, fringilla id scelerisque quis, volutpat eu diam. Vivamus id ullamcorper sapien. Nulla tristique commodo nibh, a vestibulum dolor sollicitudin eu. Aliquam erat volutpat. Curabitur auctor interdum arcu et venenatis.';
  return (
    <View style={styles.container}>
      <Header title={'Terms & Conditions'} isBack />
      <ImageBackground source={Images.background} style={styles.bgImg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <Text style={styles.txt}>{data?.data?.description}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <CustomTabBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color:COLORS.DARK
  },
  main: {
    flex: 1,
    margin: adjust(20),
  },
  bgImg: {
    flex: 1,
  },
});
