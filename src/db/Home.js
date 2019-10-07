import React from "react";
import {FlatList, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Button, Dialog, Paragraph, Portal, Provider as PaperProvider, Snackbar, TextInput} from "react-native-paper";

import {db} from "../config/Config";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Card} from "react-native-elements";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.tasksRef = db.ref("/items");

        const dataSource = [];
        this.state = {
            dataSource: dataSource,
            selecteditem: null,
            snackbarVisible: false,
            confirmVisible: false
        };
    }

    componentDidMount() {
        this.listenForTasks(this.tasksRef);
    }

    listenForTasks(tasksRef) {
        tasksRef.on("value", dataSnapshot => {
            var tasks = [];
            dataSnapshot.forEach(child => {
                tasks.push({
                    name: child.val().name,
                    key: child.key
                });
            });

            this.setState({
                dataSource: tasks
            });
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    width: "90%",
                    height: 2,
                    backgroundColor: "#BBB5B3"
                }}
            >
                <View/>
            </View>
        );
    };

    deleteItem(item) {
        this.setState({deleteItem: item, confirmVisible: true});
    }

    performDeleteItem(key) {
        var updates = {};
        updates["/items/" + key] = null;
        return db
            .ref()
            .update(updates);
    }

    addItem(itemName) {
        var newPostKey = db
            .ref()
            .child("items")
            .push().key;


        var updates = {};
        updates["/items/" + newPostKey] = {
            name:
                itemName === "" || itemName == undefined
                    ? this.state.itemname
                    : itemName
        };

        return db
            .ref()
            .update(updates);
    }

    updateItem() {

        var updates = {};
        updates["/items/" + this.state.selecteditem.key] = {
            name: this.state.itemname
        };

        return db
            .ref()
            .update(updates);
    }

    saveItem() {
        if (this.state.selecteditem === null) this.addItem();
        else this.updateItem();

        this.setState({itemname: "", selecteditem: null});
    }

    hideDialog(yesNo) {
        this.setState({confirmVisible: false});
        if (yesNo === true) {
            this.performDeleteItem(this.state.deleteItem.key).then(() => {
                this.setState({snackbarVisible: true});
            });
        }
    }

    undoDeleteItem() {
        this.addItem(this.state.deleteItem.name);
    }


    render() {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                        }}
                        >CRUD Firebase</Text>
                        <Card>
                            <TextInput
                                style={{
                                    height: 45,
                                    width: 250,
                                    borderColor: "gray",
                                    borderWidth: 1
                                }}
                                onChangeText={text => this.setState({itemname: text})}
                                value={this.state.itemname}
                            />
                            <View style={{height: 10}}></View>
                            <Button
                                icon={this.state.selecteditem === null ? "add" : "update"}
                                mode="contained"
                                onPress={() => this.saveItem()}
                            >
                                {this.state.selecteditem === null ? "Tambah" : "Ubah"}
                            </Button>
                        </Card>
                        <Card>
                            <View style={{height: 20}}></View>
                            <Text style={styles.headerList}>Firebase DB</Text>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({item}) => (
                                    <View>
                                        <ScrollView horizontal={true}>
                                            <TouchableWithoutFeedback>
                                                <View style={{paddingTop: 10}}>
                                                    <Text
                                                        style={{color: "#040f82"}}
                                                        onPress={() => this.deleteItem(item)}
                                                    >
                                                        <Icon name="trash-o" size={20}/>
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback
                                                onPress={() =>
                                                    this.setState({
                                                        selecteditem: item,
                                                        itemname: item.name
                                                    })
                                                }
                                            >
                                                <View>
                                                    <Text style={styles.item}>{item.name} </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </ScrollView>
                                    </View>
                                )}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                            <Text/>
                        </Card>

                        <Portal>
                            <Dialog
                                visible={this.state.confirmVisible}
                                onDismiss={() => this.hideDialog(false)}
                            >
                                <Dialog.Title>Konfirmasi</Dialog.Title>
                                <Dialog.Content>
                                    <Paragraph>Apakah anda yakin ingin menghapus data ini?</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => this.hideDialog(true)}>Iya</Button>
                                    <Button onPress={() => this.hideDialog(false)}>Tidak</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </ScrollView>
                    <Snackbar
                        visible={this.state.snackbarVisible}
                        onDismiss={() => this.setState({snackbarVisible: false})}
                        action={{
                            label: "Batalkan",
                            onPress: () => {
                                // Do something
                                this.undoDeleteItem();
                            }
                        }}
                    >
                        Data Berhasil dihapus !!!.
                    </Snackbar>
                </View>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 38 : 22,
        alignItems: "center",
        backgroundColor: "#F5FFFA"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        alignItems: "center"
    },
    headerList: {
        padding: 10,
        fontSize: 20,
        height: 50,
        alignItems: "center"
    }
});