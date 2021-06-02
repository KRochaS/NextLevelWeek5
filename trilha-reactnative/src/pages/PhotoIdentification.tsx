import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import colors from '../styles/colors';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { ImagePickerResult } from 'expo-image-picker';
import { ImageInfo, ImagePickerMultipleResult } from 'expo-image-picker/build/ImagePicker.types';


export default function Upload() {
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

      
        if(data.cancelled) 
            return;

        if(!data.uri) 
            return;

        setAvatar(data);
    }



    async function uploadImage() {
        const data = {
            uri: avatar?.uri
        }


        await api.post(`users`, data);
    }

    return (

        <View style={styles.container}>
            <Image style={styles.avatar}
                source={
                    {
                        uri:
                            avatar && avatar.uri ? avatar.uri
                                :
                                'file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.32-PlantManager/ImagePicker/f465749f-62c6-469c-86f4-b7cfa213af02.jpg'
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

        </View>
    )




    // async function uploadImage() {
    //     const data = new FormData();


    //     data.append("avatar", {
    //         fileName: avatar.fileName,
    //         uri: avatar.uri,
    //         type: avatar.type
    //     });

    //     await Axios.post("http://localhost:3333/files", data);
    // }
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
