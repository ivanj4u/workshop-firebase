import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {db} from "../config/Config";
import {ListItem} from "react-native-elements";

const ViewData = () => {
    let dataFirebase = db.ref('items');
    const [keys, setKey] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        dataFirebase.on('value', snapshot => {
            let data = snapshot.val();
            let keys = Object.keys(data);
            let items = Object.values(data);
            console.log(keys);
            console.log(items);
            setData(items);
            setData(keys)
        })
    }, [setData], [setKey]);

    return (
        <View>
            { data != null ? (
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <ListItem
                            key={item.id}
                            title={item.name}
                            subtitle={item.name}
                            onPress={() => {
                                alert("This is User ID : ")
                            }}
                        />
                    )}
                />
            ) : (
                <Text>Loading..</Text>
            )}
        </View>
    )
};

export default ViewData;
