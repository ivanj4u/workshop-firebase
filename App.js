import React, {useEffect, useState} from 'react'
import {createAppContainer} from 'react-navigation'
import {StyleSheet, Text, View} from 'react-native'
import {Drawer} from "./src/config/Router";

const NavPage = createAppContainer(Drawer);

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Firebase Database</Text>
                <NavPage/>
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