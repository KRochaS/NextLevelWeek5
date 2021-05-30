import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import colors from '../styles/colors';

export default function Upload() {
    // const [avatar, setAvatar] = useState();

    // async function imagePickerCall() {
    //     if(Constants.platform?.ios) {
    //        const { status } =  await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    //        if(status !== 'granted') {
    //             alert("");
    //             return;
    //        }
    //     }
    // }

    return(
        <View style={styles.container}>
            <Image style={styles.avatar} 
                    source={
                        {uri: 'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png'}} 
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Escolher Imagem
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
