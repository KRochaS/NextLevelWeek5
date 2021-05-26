import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function Upload() {
    const [avatar, setAvatar] = useState();

    async function imagePickerCall() {
        if(Constants.platform?.ios) {
           const { status } =  await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

           if(status !== 'granted') {
                alert("");
                return;
           }
        }
    }


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

