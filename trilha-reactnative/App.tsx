import { Jost_400Regular, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';



import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';


export default function App() {

    const [fontsLoaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold,
    });

    // useEffect(() => {
        // const subscription = Notifications.addNotificationReceivedListener(
        //     async notification => {
        //         const data = notification.request.content.data.plant as PlantProps;
        //     }
        // )

        // return () => subscription.remove();

        // Notificações Agendas
    //     async function notifications() {
    //     //    const data = await Notifications.getAllScheduledNotificationsAsync();
    //     //     console.log(data);

    //     // Cancelar todas as notificações
    //     await Notifications.cancelAllScheduledNotificationsAsync();
    //     }

    //     notifications();


    // }, [])


    if (!fontsLoaded)
        return <AppLoading />


    return (
       <Routes />
    )
}
