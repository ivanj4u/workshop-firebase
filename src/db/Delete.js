import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {db} from "../config/Config";

export default class DeletePage extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        let [name, setName] = useState("");
        let addItem = (item, id) => {
            db.ref('/items').push({
                name: item,
                id: id,
            })
        };

        const deleteData = (key) => {

            db.orderByChild('name').equalTo(key).once('value', snapshot => {
                const updates = {};
                snapshot.forEach(child => updates[child.key] = null);
                db.update(updates);
            }).then(() => {
                console.log("Data successfully deleted!");

            }).catch((error) => {
                console.error("Error removing document: ", error);

            });
        }

        let handleSubmit = () => {
            addItem(name, Date.now());
            alert(name);
            this.textInput.clear();
            deleteData(name)

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