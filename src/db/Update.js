import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {db} from "../config/Config";

export default class UpdatePage extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        let [name, setName] = useState("");
        let addItem = (item, id) => {
            db.ref('/items').push({
                name: item,
                id: id,
            })
        };

        const updateItem = (id,param) => {
            console.log('Ini keynya: ' + id);
            console.log('Param: ' + param);
            let dataUpdate = db.ref('items/' + id + '/' + 'name');
            console.log(dataUpdate.orderByChild('name'));

            db.orderByChild('name').equalTo(param).once('value', snapshot => {
                const updates = {};
                snapshot.forEach(function (child) {
                    updates[child.key + '/' + 'name'] = name;
                    console.log('key dalam : ' + child.key);
                    console.log('val dalam : ' + child.val()['name']);
                });
                db.update(updates);
            }).then(() => {
                console.log("Data successfully Updated!");

            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        };

        let handleSubmit = () => {
            addItem(name, Date.now());
            alert(name);
            this.textInput.clear();
            updateItem(name)
        };
        return (
            <View>
                <Text>Insert Name</Text>
                <TextInput
                    placeholder={"Type Here"}
                    onChangeText={value => setName(value)}
                    ref={input => {
                        this.textInput = input
                    }}
                />
                <Button
                    title={"Save"}
                    onPress={handleSubmit}
                />
                <Button
                    title={"Back to Home"}
                    onPress={() => navigate('Home')}
                />
            </View>
        )
    }
}