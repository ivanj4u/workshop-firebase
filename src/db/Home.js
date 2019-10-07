import React from 'react';
import {Button, View} from "react-native";

export default class HomePage extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View>
                    <Button
                        onPress={() => navigate('Tambah')}
                        title="Insert Data"
                    />
                </View>
                <View>
                    <Button
                        onPress={() => navigate('Lihat')}
                        title="View Data"
                    />
                </View>
            </View>
        )
    }
}