import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';

import userImg from '../assets/profile.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();
    const [photo, setPhoto] = useState<string>();

    useEffect(() => {

        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        async function loadStoragePhotoIdentification() {
            const photo = await AsyncStorage.getItem('@plantmanager:photoUser');
            setPhoto(photo || '');
            console.log('loadphoto', photo);

        }


        loadStorageUserName();
        loadStoragePhotoIdentification();
    }, [userName, photo]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}> Olá </Text>
                <Text style={styles.userName}> {userName} </Text>
            </View>

            <Image style={styles.image}
                source={
                    {
                        uri:
                            photo  ? photo
                                :
                                'file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.32-PlantManager/ImagePicker/ce94ad4a-de20-4a92-b432-be75d60bb0a6.jpg'
                    }}
            />



            {/* <SvgFromUri
                        uri={photo ? photo: userImg}
                        height={150}
                        width={150}
                        style={styles.image}
                    /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
})
