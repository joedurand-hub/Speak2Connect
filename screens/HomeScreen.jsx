import { Picker } from '@react-native-picker/picker';
import React, { useRef, useState } from 'react'
import { levels, list_languages } from '../config';
import { Button, Modal, Pressable, Text, TextInput, View, Image, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState("")
    const pickerRef = useRef();

    const [modalVisible, setModalVisible] = useState(false);
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('Cualquier nivel');
    const [description, setDescription] = useState('');
    const [rooms, setRooms] = useState([]);


    const handleCreateRoom = () => {
        const newRoom = {
            id: Date.now().toString(),
            language,
            level,
            description,
            userImage: 'https://via.placeholder.com/150',
        };
        setRooms([newRoom, ...rooms]);
        setModalVisible(false);
        setLanguage('');
        setLevel('Cualquier nivel');
        setDescription('');
    };

    const handleJoinRoom = (room) => {
        navigation.navigate('CallScreen', { room });
    };
    return (
        <SafeAreaView style={{ backgroundColor: "#f9f9f9" }}>

            <Button title="Crear sala" onPress={() => setModalVisible(true)} />
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text>Selecciona el idioma</Text>
                    <Picker
                        ref={pickerRef}
                        mode='dropdown'
                        selectedValue={language}
                        onValueChange={(itemValue, itemIndex) =>
                            setLanguage(itemValue)
                        }
                    >
                        {list_languages?.map((element, index) => (
                            <Picker.Item key={index} label={element.label} value={element.value} />

                        ))
                        }
                    </Picker>
                    <Text>Selecciona el nivel</Text>
                    <Picker
                        ref={pickerRef}
                        mode='dialog'
                        selectedValue={level}
                        onValueChange={(itemValue, itemIndex) =>
                            setLevel(itemValue)
                        }
                    >
                        {levels?.map((element, index) => (
                            <Picker.Item key={index} label={element.label} value={element.value} />

                        ))
                        }
                    </Picker>
                    <Text>Descripción (hasta 150 caracteres)</Text>
                    <TextInput
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                        maxLength={150}
                        style={styles.input}
                    />
                    <View style={{
                        width: "100%", display: "flex", flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Button color={"red"} title="Cancelar" onPress={() => setModalVisible(false)} />
                        <Button title="Aceptar" onPress={handleCreateRoom} />

                    </View>
                </View>
            </Modal>
            <FlatList
                contentContainerStyle={{ backgroundColor: "#f9f9f9", width: "100%", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 10 }}
                data={rooms}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <View style={styles.roomCard}>
                        <Pressable
                            style={styles.closeButton}
                            onPress={() =>
                                setRooms(rooms.filter((room) => room.id !== item.id))
                            }
                        >
                            <Text style={{ color: "white" }}>X</Text>
                        </Pressable>
                        <View style={styles.roomHeader}>
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>{item.language}</Text>
                            <Text style={{ color: "black" }}>{item.level}</Text>
                        </View>
                        <Text style={{ color: "black" }}>{item.description ? item.description : "No se ha ingresado una descripción"}</Text>
                        <View >
                            <Image source={{ uri: item.userImage }} style={styles.userImage} />
                        </View>
                        <View >
                            <Pressable
                                style={styles.joinButton}
                                onPress={() => handleJoinRoom(item.id)}
                            >
                                <Text>Unirse y charlar</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, marginBottom: 30 },
    modalContainer: { padding: 20 },
    input: { borderWidth: 1, marginBottom: 10, padding: 8, color: "black" },
    roomCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 5,
        marginBottom: 10,
        width: 320,
        height: 320,
    },
    roomHeader: {
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: "center",
        gap: 10,
    },
    userImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    roomFooter: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    joinButton: {
        padding: 10,
        alignItems: "center",
        marginVertical: 10,
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: 1,
    },
    closeButton: {
        position: 'absolute',
        borderRadius: 50,
        paddingLeft: 10,
        paddingTop: 4,
        top: 5,
        right: 5,
        width: 30,
        height: 30,
        backgroundColor: 'red',
    },
});

export default HomeScreen

