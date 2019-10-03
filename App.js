import React, {Component, useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {InsertData} from './src/db/Insert'
import ViewData from "./src/db/View";
import "./src/config/FixedTime"

export default class App extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <InsertData/>
                    <ViewData/>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    }
});