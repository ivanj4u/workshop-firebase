import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {db} from "../config/Config";
import {ListItem} from "react-native-elements";

const ViewData = () => {
    let dataFirebase = db.ref('items');
    const [data, setData] = useState();

    useEffect(() => {
        dataFirebase.on('value', snapshot => {
            let data = snapshot.val();
            let items = Object.values(data);
            console.log(items);
            setData(items)
        })
    }, [setData]);

    return (
        <View>
            { data != null ? (
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <ListItem
                            key={item.id}
                            title={item.id}
                            subtitle={item.name}
                            onPress={() => {
                                alert("This is User ID : " + item.id)
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
