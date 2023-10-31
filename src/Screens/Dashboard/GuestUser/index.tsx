import { Dimensions, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/ReusableComponent/Header'
import { Images } from '@/Assets'
import adjust from '@/Component/adjust'
import { COLORS, FONT_FAMILIES } from '@/Configration'
import TextBox from '@/Component/TextBox'
import { SCREENS, VALIDATE_FORM } from '@/Constant'
import CustomButton from '@/Component/CustomButton'
import TextTicker from 'react-native-text-ticker'
import { VictoryPie } from 'victory-native'
const { height, width } = Dimensions.get("screen");
const { LOGIN } = SCREENS;
const GuestUser = (props: any) => {
  const { navigation } = props;
  const [active, setActive] = useState<number>(0);
  const [amount, setAmount] = useState<number>();
  const [errorAmount, setErrorAmount] = useState<string | null>(null);
  const [roi, setRoi] = useState<number>();
  const [errorRoi, setErrorRoi] = useState<string | null>(null);
  const _amountValidate = (mail: string) => {
    if (mail === '') {
      setErrorAmount(VALIDATE_FORM.AMOUNT);
    } else {
      setErrorAmount(null);
    }
  };
  const _roiValidate = (mail: string) => {
    if (mail === '') {
      setErrorRoi(VALIDATE_FORM.ROI);
    } else {
      setErrorRoi(null);
    }
  };
  const data = [
    { x: 'Properties', y: 787 },
    { x: 'Stocks', y: 787 },
    { x: 'Gold', y: 787 }
  ]
  return (
    <View style={styles.container}>
      <Header titleLogo isRightAction />
      <ImageBackground source={Images.background} style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={{
            flex: 1,
            margin: adjust(15),
          }}>
            <View style={{ flex: 1, aspectRatio: 1 * 1.45 }}>
              <Image source={Images.banner1} style={styles.bannerImage} />
            </View>
            <View style={styles.boxView}>
              <View style={styles.boxInnerView}>
                <View style={styles.boxInnerView1}>
                  <Text style={styles.text}>Total Investment</Text>
                  <Text style={[styles.text, styles.text1]}>{'\u20B9'} 15,47,000</Text>
                </View>
                <Image source={Images.line2} style={styles.lineImage} />
                <View style={styles.boxInnerView2}>
                  <Text style={styles.text}>People Invested</Text>
                  <Text style={[styles.text, styles.text1]}>200+</Text>
                </View>
              </View>
              <View style={styles.boxInnerBottomView2}>
                <View style={styles.boxInnerView}>
                  <Text style={[styles.text, styles.text2]}>Total Gain</Text>
                  <Image source={Images.polygon} style={styles.polygonImage} />
                  <Text style={[styles.text, styles.text2]}> {'\u20B9'} 1,43,456</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxViewChart}>
              <Text style={styles.textInvested}>Invested Diversification</Text>
              <View style={styles.victoryView}>
                <VictoryPie
                  colorScale={["#7CD2BE", "#D35597", "#7161D6", "cyan", "navy"]}
                  labels={({ datum }) => `${datum.y}`}
                  data={data}
                  width={width / 0.4}
                  height={height / 3.6}
                  labelRadius={({ innerRadius }: any) => innerRadius + 35}
                  style={{
                    labels: { fontSize: 12, fontWeight: "400", fill: "white", fontFamily: FONT_FAMILIES.AMERETTO },
                    data: {
                      fillOpacity: 1,
                      stroke: "white",
                      strokeWidth: 1,
                    },
                  }}
                />
              </View>
              <View style={styles.dotsViewMain}>
                <View style={[styles.dotsView, { backgroundColor: '#D35597' }]}></View>
                <Text style={styles.labelText}>Properties</Text>
                <View style={[styles.dotsView, { backgroundColor: '#7CD2BE' }]}></View>
                <Text style={styles.labelText}>Stocks</Text>
                <View style={[styles.dotsView, { backgroundColor: '#7161D6' }]}></View>
                <Text style={styles.labelText}>Gold</Text>
              </View>
            </View>
            <View style={styles.boxViewRoi}>
              <Text style={styles.textInvested}>Plans with ROI Calculator</Text>
              <View style={styles.buttonOuterView}>
                <TouchableOpacity onPress={() => setActive(0)} style={{ width: '31%' }}>
                  <View style={[styles.buttonInnerView, { backgroundColor: active === 0 ? COLORS.DARK : COLORS.WHITE }]}>
                    <Text style={[styles.buttonText, { color: active === 0 ? COLORS.WHITE : COLORS.DARK }]}>Daily</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActive(1)} style={{ width: '31%' }}>
                  <View style={[styles.buttonInnerView, { backgroundColor: active === 1 ? COLORS.DARK : COLORS.WHITE }]}>
                    <Text style={[styles.buttonText, { color: active === 1 ? COLORS.WHITE : COLORS.DARK }]}>Monthly</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActive(2)} style={{ width: '25.5%' }}>
                  <View style={[styles.buttonInnerView, {
                    width: Platform.OS === 'android' ? '150%' : adjust(87),
                    backgroundColor: active === 2 ? COLORS.DARK : COLORS.WHITE
                  }]}>
                    <Text style={[styles.buttonText, { color: active === 2 ? COLORS.WHITE : COLORS.DARK }]}>Yearly</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.amountRoiMainView}>
                <View style={{ width: adjust(160), justifyContent: 'center' }}>
                  <Text style={styles.amountText}>Amount</Text>
                  <TextBox placeholder={`${'\u20B9'}10,000`} style={styles.textbox} value={amount} setValue={setAmount} containerStyle={styles.containerStyle} validate={_amountValidate} num />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.amountText}>Roi</Text>
                  <TextBox placeholder={`10%`} style={styles.textboxRoi} value={roi} setValue={setRoi} containerStyle={styles.containerStyle} validate={_roiValidate} num />
                </View>
              </View>
              <Text style={[styles.amountText, { fontSize: adjust(15) }]}>{`${'\u20B9'}11000`}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <View
        style={styles.marqueView}>
        <TextTicker
          style={styles.marqueTxt}
          duration={5000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={2000}>
          Top Gainers – X has invested 10XXX Amount and received a return of 10XX Amount.
        </TextTicker>
      </View>
      <CustomButton label='Register with Us' press={() => navigation.navigate(LOGIN)} />
    </View>
  )
}

export default GuestUser

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  boxView: {
    backgroundColor: COLORS.WHITE,
    height: adjust(110),
    // width: Platform.OS === 'android' ? adjust(280) : adjust(280),
    borderRadius: 5,
    // marginLeft: Platform.OS === 'android' ? adjust(17) : adjust(15)
  },
  boxInnerView: {
    flexDirection: 'row'
  },
  boxInnerView1: {
    width: '50%',
    height: adjust(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineImage: {
    marginTop: adjust(23)
  },
  boxInnerView2: {
    width: '50%',
    height: adjust(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInnerBottomView2: {
    backgroundColor: COLORS.BLUE,
    // width: Platform.OS === 'android' ? adjust(280) : adjust(280),
    height: adjust(30),
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
    fontWeight: '400',
    color: COLORS.DARK
  },
  text1: {
    marginTop: adjust(4),
    fontSize: adjust(18),
  },
  text2: {
    color: COLORS.WHITE
  },
  polygonImage: {
    marginLeft: adjust(8), marginTop: adjust(2)
  },
  boxViewChart: {
    backgroundColor: COLORS.WHITE,
    height: adjust(190),
    // width: Platform.OS === 'android' ? adjust(280) : adjust(280),
    marginTop: adjust(15),
    borderRadius: 5,
    // marginLeft: Platform.OS === 'android' ? adjust(17) : adjust(15),
  },
  textInvested: {
    fontSize: adjust(12),
    fontFamily: FONT_FAMILIES.AMERETTO,
    marginLeft: adjust(10),
    marginTop: adjust(10),
    color: COLORS.DARK,
    fontWeight: '400'
  },
  boxViewRoi: {
    backgroundColor: COLORS.WHITE,
    height: adjust(190),
    // width: Platform.OS === 'android' ? adjust(280) : adjust(280),
    marginTop: adjust(15),
    borderRadius: 5,
    marginBottom: adjust(10),
    // marginLeft: Platform.OS === 'android' ? adjust(17) : adjust(15)
  },
  buttonOuterView: {
    flexDirection: 'row',
    height: adjust(30),
    marginTop: adjust(10)
  },
  buttonInnerView: {
    // width: Platform.OS === 'ios' ? adjust(97) : adjust(94.5),
    height: adjust(30),
    borderWidth: 0.5,
    borderColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(10),
    fontWeight: '400',
  },
  amountRoiMainView: {
    flexDirection: 'row',
    height: adjust(70)
  },
  containerStyle: {
    height: adjust(40)
  },
  amountText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(12),
    fontWeight: '400',
    marginLeft: adjust(12),
    color: COLORS.DARK
  },
  textbox: {
    width: adjust(150),
    height: adjust(35),
    fontSize: adjust(10),
    marginLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY
  },
  textboxRoi: {
    width: adjust(70),
    height: adjust(35),
    fontSize: adjust(10),
    marginLeft: adjust(10),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.GRAY
  },
  contentView: {
    alignItems: 'center'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  marqueView: {
    backgroundColor: '#FF8989',
    height: adjust(25),
    justifyContent: 'center',
  },
  marqueTxt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
  victoryView: {
    // 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontFamily: FONT_FAMILIES.AMERETTO,
    fontSize: adjust(10),
    fontWeight: '400',
    color: COLORS.DARK,
    marginRight: adjust(10)
  },
  dotsView: {
    height: adjust(8),
    width: adjust(8),
    borderRadius: 100 / 2,
    margin: 5
  },
  dotsViewMain: {
    flexDirection: 'row',
    height: adjust(25),
    justifyContent: 'center',
    alignItems: 'center'
  }
})