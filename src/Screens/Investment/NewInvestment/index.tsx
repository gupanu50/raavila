import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import Header from 'header';
import adjust from 'components/adjust';
import { Images } from '@/Assets';
import { SCREENS } from '@/Constant';
import CustomTabBar from '@/Component/CustomTabBar';
const { INDIVISUAL, ENTERPRISEVALIDATE } = SCREENS
import { useGetInvestmentTypeQuery } from '@/Redux/services/investments';
import Loader from '@/ReusableComponent/Loader';
import ReadMore from '@fawazahmed/react-native-read-more';

type InvestmentType = {
    id: number,
    description: string
    investmet_type: string

}
const PlansType: any = {
    individual_plan: "Indivisual Investment",
    enterprise_plan: "Enterprise Investment"
}
enum InvestmentTypes {
    BIZZ = "enterprise_plan",
    INDI = "individual_plan"
}
const NewInvestment = (props: any) => {

    const { navigation } = props;
    const { data, isLoading } = useGetInvestmentTypeQuery('investment-type')
    const types: [InvestmentType] = data?.data
    return (
        <View style={styles.container}>
            <Header title={'Make New Investment'} isBack />
            <View style={styles.main}>
                {types?.map((plan: InvestmentType) => {
                    let btn = plan.investmet_type !== InvestmentTypes.INDI ? ENTERPRISEVALIDATE : INDIVISUAL
                    console.log('====plan===>', plan);
                    return (<View key={plan.investmet_type} style={[styles.boxView]}>
                        <Image source={Images.investmentIndiviual} style={styles.image} />
                        <Text style={styles.text}>{PlansType[plan?.investmet_type]}</Text>
                        <ReadMore
                            numberOfLines={3}
                            seeMoreText={'Read More'}
                            seeMoreStyle={styles.seeMore}
                            style={[styles.text, styles.text1, styles.text4]}>
                            {plan?.description}
                        </ReadMore>
                        <TouchableOpacity onPress={() => navigation.navigate(btn, plan)}>
                            <View style={[styles.bottomView, { marginTop: adjust(15) }]}>
                                <Text style={styles.text3}>{"Invest as " + btn}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                })
                }
            </View>
            <CustomTabBar />
            <Loader loading={isLoading} />
        </View>
    )
}

export default NewInvestment;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        flex: 1,
        margin: adjust(15)
    },
    boxView: {
        // height: adjust(160),
        // width: adjust(270),
        borderWidth: 1,
        marginVertical: adjust(10),
        // flex:1,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.GRAY,
        // marginBottom: adjust(60),

    },
    text: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        marginHorizontal: adjust(25),
        marginTop: adjust(10),
        fontSize: adjust(14),
        fontWeight: '400',
        color: COLORS.BLACK
    },
    image: {
        height: adjust(22),
        width: adjust(22),
        marginTop: adjust(20),
        marginHorizontal: adjust(25)
    },
    text1: {
        marginTop: adjust(6),
        fontSize: adjust(12),
    },
    readMoreView: {
        marginTop: adjust(5),
        marginHorizontal: adjust(25),
        width: adjust(70),
        height: adjust(15)
    },
    text2: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontWeight: '400',
        color: COLORS.BLACK,
        textDecorationLine: 'underline'
    },
    text4: {
        fontSize: adjust(11)
    },
    bottomView: {
        backgroundColor: COLORS.MAIN,
        height: adjust(35),
        // width: adjust(270),
        marginTop: Platform.OS === 'android' ? adjust(14) : adjust(15),
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text3: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontWeight: '400',
        color: COLORS.WHITE,
        fontSize: adjust(15)
    },
    seeMore: {
        textDecorationLine: 'underline',
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontSize: adjust(11),
      },
})
