import React, {useEffect, useState} from 'react'
import {createAppContainer} from 'react-navigation'
import {StyleSheet, View} from 'react-native'
import {Drawer} from "./src/config/Router";
import {Provider} from "react-native-paper";

const NavPage = createAppContainer(Drawer);

export default class App extends React.Component {
    render() {
        return (
            <Provider style={styles}>
                <NavPage/>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    }
});