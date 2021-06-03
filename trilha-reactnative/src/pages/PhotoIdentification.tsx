import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/Button';

import { savePhotoIdentification } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import * as ImagePicker from 'expo-image-picker';

export default function Upload() {
    const navigation = useNavigation();

    const [avatar, setAvatar] = useState<ImageInfo>();



    async function imagePickerCall() {
        if (Constants.platform?.ios) {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

            if (status !== 'granted') {
                alert("Precisamos de permissão");
                return;
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({});


        if (data.cancelled)
            return;

        if (!data.uri)
            return;

        setAvatar(data);
    }

    async function handleConfirmation() {
        try {
            if (avatar && avatar.uri) {
                await savePhotoIdentification(avatar.uri);
            }
        } catch {
            Alert.alert('Não foi possível salvar a foto! 😥');
        }
    
        if (avatar === undefined) {
            Alert.alert('Escolha uma foto para seu perfil! 😥');
        } else {
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }
    }


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.emoji}>
                    📷
                </Text>

                <Text style={styles.title}>
                    Escolha uma foto {'\n'}
                    para seu perfil
                </Text>
            </View>

            <TouchableOpacity onPress={imagePickerCall}>
                <Image style={styles.avatar}
                    source={
                        {
                            uri:
                                avatar && avatar.uri ? avatar.uri
                                    :
                                    'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                        }}
                />
                <View style={styles.camera}>
                  <FontAwesome5  name="camera" size={22} color={colors.green_light}/>

                </View>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Button
                    title='Confirmar'
                    onPress={handleConfirmation}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    button: {
        width: 150,
        height: 70,
        borderRadius: 3,
        backgroundColor: colors.green_light,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    buttonText: {
        color: colors.heading,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 40

    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 40
    },
    camera: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: -25,
        marginLeft: 70,
    }

})
