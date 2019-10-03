import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ListItem = ({text}) => (
    <TouchableOpacity onPress={() => (
        alert(text)
    )}
    >
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
);

export default ListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AAAAAA',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text: {
        color: '#4a4a4a',
        fontSize: 15,
    },
    separator: {
        flex: 1,
        height: 1,
        // backgroundColor: '#e4e4e4',
        marginLeft: 10,
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
    }
});