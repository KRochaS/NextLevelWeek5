import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { savePhotoIdentification } from '../libs/storage';
import colors from '../styles/colors';

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

    function handleConfirmation() {
        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        });
    }


    async function uploadImage() {
        try {
            if (avatar && avatar.uri) {
                await savePhotoIdentification(avatar.uri);
            }
        } catch {
            Alert.alert('Não foi possível salvar a foto! 😥');
        }
    }

    return (

        <View style={styles.container}>
            <Image style={styles.avatar}
                source={
                    {
                        uri:
                            avatar && avatar.uri ? avatar.uri
                                :
                                'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                    }}
            />
            <TouchableOpacity style={styles.button}
                onPress={imagePickerCall}
            >
                <Text style={styles.buttonText}>
                    Escolher Imagem
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={uploadImage}
            >
                <Text style={styles.buttonText}>
                    Enviar Imagem
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={handleConfirmation}
            >
                <Text style={styles.buttonText}>
                    Confirmar
                </Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonText: {
        color: colors.heading,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    }

})
