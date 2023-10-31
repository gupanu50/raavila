import { Dimensions } from "react-native";

//================= Network Configration =======================//
const URIS = {
    DEVELOPMENT: 'https://demo41.iitpl.com/api/',
    PRODUCTION: '',
    STAGING: '',
};

const HTTP_CODES = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    VALIDATION: 422,
    SERVER_ERROR: 500,
};
//TODO: EXPRIMENTAL VALUE :: 0.0025*WIDTH 
const RF = 0.0025* Dimensions.get('window').width
const FONT_SIZES = {
    TITLE:24*RF,
    SUB_HEADING:18*RF,
    MEDIUM:20*RF,
    PRIMARY:16*RF,
    LABEL: 14*RF,
    DESCRIPTION:12*RF

}

const URL_ENDPOINTS = {
    LOGIN: 'users',
    REGISTRATION: 'user/registration',
    POSTS:'post'
};

const STATIC_PAGE = {
    PRIVACY_POLICY: '',
    TERMS_CONDITION: ''
}

//================== REGEX =============================//
const REGEX = {
    NAME:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    EMAIL:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    MOBILE:/^[6-9]\d{9}$/,
    PASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

//================== Font Family =============================//
const FONT_FAMILIES = {
    MEDIUM: 'Inter-Medium',
    BOLD: 'Inter-Bold',
    DEMI: 'Inter-Thin',
    LIGHT: 'Inter-Light',
    REGULAR: 'Inter-Regular',
    AMERETTO:'Ameretto'
};

//================ MARGIN and PADDINGS ===================//
const METRICS = {
    MAR_5: 5,
    MAR_8: 8,
    MAR_9: 9,
    MAR_10: 10,
    MAR_11: 11,
    MAR_12: 12,
    MAR_13: 13,
    MAR_14: 14,
    MAR_15: 15,
    MAR_16: 16,
    MAR_17: 17,
    MAR_18: 18,
    MAR_19: 19,
    MAR_20: 20,
    MAR_21: 21,
    MAR_22: 22,
    MAR_23: 23,
    MAR_24: 24,
    MAR_25: 25,
    MAR_29: 29,
    MAR_30: 30,
    MAR_32: 32,
    MAR_35: 35,
    MAR_40: 40,
    MAR_45: 45,
    MAR_50: 50,
    MAR_55: 55,
    MAR_60: 60,
    MAR_66: 66,
    MAR_81: 81,
    MAR_104: 104,
    MAR_110: 110,
    MAR_120: 120,
    MAR_131: 131
};

//==================== Define Colors ========================//
const COLORS = {
    GRAY_BACKGROUND: 'rgba(190,190,190,0.5)',
    GRAY: '#D9D9D9',
    BORDER_COLOR: '#DADADA',
    WHITE: '#FFFFFF',
    BLACK: 'black',
    RED: 'red',
    GREEN: '#00BFB3',
    GRAY_255_6: 'rgba(255,255,255,0.6)',
    GOLD: '#E6C65B',
    MAIN:'#604536',
    DARK:'#2C231F',
    GRAD: ["#D9D9D9","white"],
    RED_GRAD:["#604536","#D9D9D9","#604536"],
    GRAD1:["#604536","#EBAA8A","#604536"],
    GOLDYELLOW: '#FEC514',
    BLUE: '#00BFB3',
    GRAY_SUPPORT: '#000000'
};


export {
    HTTP_CODES,
    FONT_FAMILIES,
    URIS,
    COLORS,
    METRICS,
    URL_ENDPOINTS,
    STATIC_PAGE,
    REGEX,
    FONT_SIZES,
    RF
};