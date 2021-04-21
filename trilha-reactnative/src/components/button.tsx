import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export function Button() {
    return(
        <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8}>

        <Text style={styles.buttonText}> {'>'} </Text>
    </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginRight: 10,
        height: 56,
        width: 56,
        marginBottom: 25,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24,
    }
});