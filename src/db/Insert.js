import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {db} from "../config/Config";

export const InsertData = () => {
    let [name, setName] = useState("");
    let addItem = (item, id) => {
        db.ref('/items').push({
            name :item,
            id :id,
        })
    };

    let handleSubmit = () => {
        addItem(name, Date.now());
        alert(name);
        this.textInput.clear()

    };
    return (
        <View>
            <Text>Insert Name</Text>
            <TextInput
                placeholder={"Type Here"}
                onChangeText={value => setName(value)}
                ref={input => { this.textInput = input }}
            />
            <Button
                title={"Save"}
                onPress={handleSubmit}
            />
        </View>
    )
};
