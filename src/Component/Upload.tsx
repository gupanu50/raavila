import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react';
import adjust from './adjust';
import { Images } from '@/Assets';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import * as ImagePicker from 'react-native-image-picker';

export default function Upload(props: any) {
    const { image, setImage } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const SORT = [
        { key: 1, img: Images.camera, name: 'Take A Selfie' },
        { key: 2, img: Images.upload_img, name: 'From Gallery' },
    ];

    const renderSort = (item: any) => {
        const { key, img, name } = item.item;
        return (
            <TouchableOpacity
                onPress={() => (key == 1) ? launchCamera() : launchImageLibrary()}
            >
                <View style={styles.sortcontainer}>
                    <View style={styles.left}>
                        <Image source={img} style={{}} />
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.txt, { fontSize: adjust(12), textAlign: 'left', padding: 0, color: COLORS.DARK }]}>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    // **********************launchImageLibrary******************************************
    const launchImageLibrary = () => {
        setVisible(false);
        let options: any = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        try {
            ImagePicker.launchImageLibrary(options, (response: any) => 
        {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                console.log('response', JSON.stringify(response));
                setImage({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.assets[0].uri,
                });
            }
        });
        } catch (error) {
            console.log('==>',error);
            // reacttron
            
        }
        // ImagePicker.launchImageLibrary(options, (response: any) => 
        // {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         alert(response.customButton);
        //     } else {
        //         const source = { uri: response.assets[0].uri };
        //         console.log('response', JSON.stringify(response));
        //         setImage({
        //             filePath: response,
        //             fileData: response.data,
        //             fileUri: response.assets[0].uri,
        //         });
        //     }
        // });
    };

    // **********************launchCamera******************************************
    const launchCamera = () => {
        setVisible(false);
        let options: any = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response: any) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                setImage({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.assets[0].uri
                });
            }
        });
    }

    
    React.useEffect(() => {
        // console.log('=====up====>', image); 
    }, [image])
    
    // console.log('img',image)


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => setVisible(!visible)}>
                <Image source={image?.fileUri ? { uri: image.fileUri } : Images.upload} style={styles.img} />
            </TouchableOpacity>
            <Modal animationType={'slide'} transparent={true} visible={visible}>
                <View style={styles.modalview}
                // onPress={() => setVisible(false)}
                >
                    <View style={[styles.modal, {}]}>
                        <View style={styles.cross}>
                            <TouchableOpacity onPress={() => setVisible(false)} style={styles.crossbtn}>
                                <Image style={styles.close} source={Images.cross} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.upload}>
                            <Image source={Images.upload} style={{}} />
                            <Text style={[styles.txt, { fontSize: adjust(12), padding: 0, color: COLORS.DARK }]}>{'Upload Photos'}</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'green',
        height: adjust(104),
        justifyContent: 'center',
    },
    btn: {
        height: adjust(90),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: adjust(5),
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: 1,
        borderStyle: 'dashed',
        backgroundColor: COLORS.WHITE
    },
    txt: {
        color: COLORS.WHITE,
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        padding: adjust(12)
    },
    sortcontainer: {
        height: adjust(35),
        width: adjust(190),
        marginVertical: adjust(3),
        borderRadius: 8,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        flexDirection: 'row'
    },
    left: {
        width: adjust(37),
        // height: adjust(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        // height: adjust(20),
        width: adjust(90),
        justifyContent: 'center',
        // backgroundColor:'yellow'
    },
    modalview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        // backgroundColor:'green',
        // height:adjust(1500),
        // width:adjust(1100)
    },
    modal: {
        backgroundColor: COLORS.WHITE,
        height: adjust(170),
        width: adjust(200),
        borderRadius: 8,
        elevation: 10,
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: 1,
        // top:250,
        // left:77
    },
    cross: {
        height: adjust(25),
        // width: adjust(79),
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor:'orange'
    },
    crossbtn: {
        height: adjust(25),
        width: adjust(27),
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        tintColor: 'black',
    },
    sortflatlist: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor:'pink'
    },
    upload: {
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    img: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    }

})