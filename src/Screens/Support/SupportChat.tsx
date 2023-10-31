import { StyleSheet, View, Text, TextInput, SafeAreaView, Image, TouchableOpacity, FlatList, Modal, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/ReusableComponent/Header'
import { Images } from '@/Assets';
import { useSupportChatMutation } from '@/Redux/services/support/supportChat';
import { useSupportDetailsMutation } from '@/Redux/services/support/supportDetails';
import { showMessage } from 'react-native-flash-message';
import adjust from '@/Component/adjust';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import Loader from '@/ReusableComponent/Loader';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import { openCamera } from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SupportChat = (props: any) => {
    const { route } = props;
    const { params } = route;
    const [supportChat, { isSuccess, data }] = useSupportChatMutation<any>();
    const [supportDetails, { isSuccess: supportDetailsSuceess, data: supportDetailsData, isLoading }] = useSupportDetailsMutation<any>();
    const [dataFlatList, setDataFlatList] = useState();
    const [textfieldValue, setTextfieldValue] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const attachment: any = {
        name: '',
        type: '',
        uri: ''
    };
    const chatMessage = async () => {
        console.log('messages', textfieldValue)
        const body = new FormData();
        body.append('request_number', params?.requestNumber)
        body.append('description', textfieldValue)
        {
            attachment.name ?
                body.append('support_file', attachment) : null
        }
        try {
            await supportChat(body);
            console.log('bodyofsupportchat', body)
            await supportDetailsApi();
            setTextfieldValue('')
        } catch (error: any) {
            showMessage({
                message: error.toString(),
                type: 'danger',
            });
            console.log('==error==', error);
        }
    }
    const supportDetailsApi = async () => {
        const body = new FormData();
        body.append('request_number', params?.requestNumber)
        try {
            await supportDetails(body);
            console.log('bodyofsupportdetails', body)
        } catch (error: any) {
            showMessage({
                message: error.toString(),
                type: 'danger',
            });
            console.log('==error==', error);
        }
    }
    useEffect(() => {
        if (data?.status === false) {
            showMessage({
                message: data?.message,
                type: 'danger',
            });
            console.log('data', data)
        }
    }, [isSuccess])
    useEffect(() => {
        supportDetailsApi();
    }, [])
    useEffect(() => {
        if (supportDetailsSuceess) {
            console.log('SupportDetailsData', supportDetailsData);
            setDataFlatList(supportDetailsData?.data);
        }
    }, [supportDetailsSuceess])
    const renderDisplay = (item: any) => {
        const { admin_reply, description, name, profile_pic, created_at, updated_at, file_attach } = item?.item;
        console.log('description', description)
        return (
            <View>
                {description != null ?
                    <>
                        <View style={styles.dateView}>
                            <Image source={Images.line} style={styles.lineImage} />
                            <View style={styles.dateView1}>
                                <Text style={[styles.text2, { textAlign: 'center' }]}>{moment(created_at).format('DD/MM/YYYY')}</Text>
                            </View>
                            <Image source={Images.line} style={styles.lineImage}/>
                        </View>
                        <View style={styles.renderDisplayView}>
                            <Image source={{ uri: profile_pic }} style={styles.renderProfilePic} />
                            <View style={styles.renderDisplayView1}>
                                <Text style={styles.text}>{name}</Text>
                                <Text style={styles.text1}>{description}</Text>
                            </View>
                            <Text style={styles.text2}>{moment(created_at).format('h:mm a')}</Text>
                        </View>
                    </>
                    : null
                }
                {(admin_reply != null)
                    ?
                    <View>
                        <View style={styles.dateView}>
                            <Image source={Images.line} style={styles.lineImage} />
                            <View style={styles.dateView1}>
                                <Text style={[styles.text2, { textAlign: 'center' }]}>{moment(updated_at).format('DD/MM/YYYY')}</Text>
                            </View>
                            <Image source={Images.line} style={styles.lineImage}/>
                        </View>
                        <View style={styles.renderDisplayView}>
                            <Image source={Images.chatLogo} style={styles.renderProfilePic} />
                            <View style={styles.renderDisplayView1}>
                                <Text style={styles.text}>Team Raavila</Text>
                                <Text style={styles.text1}>{admin_reply}</Text>
                            </View>
                            <Text style={styles.text2}>{moment(updated_at).format('h:mm a')}</Text>
                        </View>
                    </View>
                    : null
                }
                {(file_attach != "") ?
                    <View>
                        <View style={styles.dateView}>
                            <Image source={Images.line} style={styles.lineImage} />
                            <View style={styles.dateView1}>
                                <Text style={[styles.text2, { textAlign: 'center' }]}>{moment(created_at).format('DD/MM/YYYY')}</Text>
                            </View>
                            <Image source={Images.line} style={styles.lineImage}/>
                        </View>
                        <View style={styles.mainImageProfileView}>
                            <Image source={{ uri: profile_pic }}
                                style={styles.pickerProfileImage} />
                            <View style={styles.pickerView}>
                                <Image
                                    source={{ uri: file_attach }}
                                    style={styles.pickerImage}
                                />
                            </View>
                            <Text style={styles.text2}>{moment(created_at).format('h:mm a')}</Text>
                        </View>
                    </View>
                    : null
                }
            </View>
        )
    }
    const sendMessage = async () => {
        await chatMessage();
    }
    const openCameraLib = () => {
        openCamera({ cropping: false, useFrontCamera: true })
            .then(response => {
                // console.log("res",resp)
                const split = response?.path.split('/');
                const imgName = split[split.length - 1];
                // SET({
                //     name:
                //         Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName,
                //     type: response?.mime,
                //     uri: response?.path,
                // });
                attachment.name = Platform.OS === 'ios' ? response?.filename?.toLowerCase() : imgName;
                attachment.type = response?.mime;
                attachment.uri = response?.path;
                setVisible(false);
            })
            .catch(err => {
                console.log('message', err);
                setVisible(false);
            });
    };
    const apiCalledAfterLibrary = async () => {
        await launchImageLibrary();
        await chatMessage();
    };
    const apiCalledAfterCamera = async () => {
        await openCameraLib();
        await chatMessage();
    }
    // **********************launchImageLibrary******************************************
    const launchImageLibrary = async () => {
        // let SET: any;
        // SET = setAttachment;
        setVisible(false);
        let options: any = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        await ImagePicker.launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                console.log('response', response);
                // SET({
                //     name: response.assets[0].fileName,
                //     type: response.assets[0].type,
                //     uri: response.assets[0].uri,
                // });
                attachment.name = response.assets[0].fileName;
                attachment.type = response.assets[0].type;
                attachment.uri = response.assets[0].uri;
            }
        });
    };
    const SORT = [
        { key: 1, img: Images.camera, name: 'Capture Image' },
        { key: 2, img: Images.upload_img, name: 'From Gallery' },
    ];
    const renderSort = (item: any) => {
        const { key, img, name } = item.item;
        return (
            <TouchableOpacity
                onPress={() =>
                    key == 1 ? apiCalledAfterCamera() : apiCalledAfterLibrary()
                }>
                <View style={styles.sortcontainer}>
                    <View style={styles.left}>
                        <Image source={img} style={{}} />
                    </View>
                    <View style={styles.right}>
                        <Text
                            style={[
                                styles.txt,
                                {
                                    fontSize: adjust(12),
                                    textAlign: 'left',
                                    padding: 0,
                                    color: COLORS.DARK,
                                },
                            ]}>
                            {name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <Header title='Support' isBack />
            <SafeAreaView style={styles.container}>
                <View style={styles.mainView}>
                    <FlatList
                        data={dataFlatList}
                        renderItem={renderDisplay}
                        showsVerticalScrollIndicator={false}
                    />
                    {params?.status === 2 ? <View style={styles.closedStatusView}>
                        <Text style={styles.text3}>This ticket is marked Resolved and Closed.</Text>
                    </View> : null}
                </View>
                {/* <KeyboardAwareScrollView scrollEnabled={true} enableOnAndroid={true}> */}
                <View style={styles.bottomView}>
                    <View style={styles.bottomView1}>
                        <TextInput
                            placeholder='Enter your query'
                            style={styles.input}
                            value={textfieldValue}
                            onChangeText={(text) => setTextfieldValue(text)}
                            multiline
                            numberOfLines={4}
                            editable={params?.status === 2 ? false : true}
                            selectTextOnFocus={params?.status === 2 ? false : true}
                        />
                        <TouchableOpacity onPress={() => setVisible(true)} disabled={params?.status === 2 ? true : false}>
                            <Image source={Images.attachment} style={styles.attachmentImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sendTouch} onPress={() => sendMessage()} disabled={params?.status === 2 ? true : false}>
                            <Image source={Images.send} style={styles.sendImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </KeyboardAwareScrollView> */}
            </SafeAreaView>
            <Modal animationType={'slide'} transparent={true} visible={visible}>
                <View style={styles.modalview}>
                    <View style={styles.modal}>
                        <View style={styles.cross}>
                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                style={styles.crossbtn}>
                                <Image style={styles.close} source={Images.cross} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.upload}>
                            <Image source={Images.upload} style={{}} />
                            <Text
                                style={[
                                    styles.txt,
                                    { fontSize: adjust(12), padding: 0, color: COLORS.DARK },
                                ]}>
                                {'Upload Photos'}
                            </Text>
                        </View>
                        <View style={[styles.sortflatlist, { justifyContent: 'center' }]}>
                            <FlatList
                                data={SORT}
                                renderItem={renderSort}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Loader loading={isLoading} />
        </View>
    )
}

export default SupportChat

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: adjust(190),
        height: adjust(30),
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: 1,
        borderRadius: adjust(5),
        color: COLORS.DARK,
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        backgroundColor: COLORS.WHITE,
        paddingLeft: adjust(10)
    },
    text: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontSize: adjust(15),
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    text2: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontSize: adjust(11),
        color: COLORS.GRAY_SUPPORT,
        fontWeight: '500'
    },
    text1: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontSize: adjust(15),
        color: COLORS.GRAY_SUPPORT,
        fontWeight: '500',
        marginTop: '2%'
    },
    modalview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: COLORS.WHITE,
        width: adjust(220),
        borderRadius: 8,
        elevation: 10,
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: 1,
    },
    cross: {
        height: adjust(25),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    crossbtn: {
        height: adjust(25),
        width: adjust(27),
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        tintColor: 'black',
    },
    sortflatlist: {
        alignItems: 'center',
    },
    upload: {
        alignItems: 'center'
    },
    txt: {
        color: COLORS.WHITE,
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        padding: adjust(12),
    },
    sortcontainer: {
        height: adjust(35),
        width: adjust(200),
        marginVertical: adjust(3),
        borderRadius: 8,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        flexDirection: 'row',
    },
    left: {
        width: adjust(37),
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        width: adjust(90),
        justifyContent: 'center',
    },
    text3: {
        fontFamily: FONT_FAMILIES.AMERETTO,
        fontSize: adjust(14),
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    mainView: {
        margin: adjust(15),
        flex: 20
    },
    mainImageProfileView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: adjust(5)
    },
    pickerProfileImage: {
        height: adjust(35),
        width: adjust(35),
        borderRadius: 100 / 2
    },
    pickerView: {
        flex: 0.9,
        aspectRatio: 1 * 1.4
    },
    pickerImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    closedStatusView: {
        backgroundColor: COLORS.GRAY,
        height: adjust(35),
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        // flex: 1,
        // justifyContent: 'flex-end'
    },
    bottomView1: {
        flexDirection: 'row',
        height: adjust(40),
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE
    },
    attachmentImage: {
        height: adjust(20),
        width: adjust(20),
        marginTop: adjust(5)
    },
    sendImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    sendTouch: {
        flex: 0.2,
        aspectRatio: 1 * 1.12
    },
    renderDisplayView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: adjust(5)
    },
    renderProfilePic: {
        height: adjust(35),
        width: adjust(35),
        borderRadius: 100 / 2
    },
    renderDisplayView1: {
        flexDirection: 'column',
        width: '70%'
    },
    dateView: {
        flexDirection: 'row', justifyContent: 'space-evenly'
    },
    dateView1: {
        backgroundColor: COLORS.GRAY, 
        width: '30%', 
        borderRadius: 20, 
        height: adjust(25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    lineImage: {
        marginTop: adjust(12)
    }
})