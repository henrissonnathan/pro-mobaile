import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTokenStore } from "../components/token";
import { Image } from "react-native-elements";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centerImage: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#000',
        fontSize: 15
    },
    cardContainer: {
        margin: 4
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    textContainer: {
        gap: 6,
    },
    button: {
        flexDirection: 'row',
        padding: 2
    }

});
const DetalhesPet = ({ route, navigation }: any) => {
    const { id } = route.params;
    const { token } = useTokenStore();
    const [pet, setPets] = useState<any>();
    const ListItem = () => {
        return (

            <SafeAreaView style={styles.container}>
                <Card mode="contained" style={styles.cardContainer}>
                    <Card.Content style={styles.cardContent}>
                    
                        <View style={styles.textContainer}>
                        <Image
            source={{ uri: pet?.imageUrl }}
            style={{ width: '100%', height: 200 }}
          />
                           
                            <Text style={styles.text}>Nome: {pet?.name}</Text>
                            <Text style={styles.text}>Vida: {pet?.life.toFixed(2)}</Text>
                            <Text style={styles.text}>Descanso: {pet?.restLevel.toFixed(2)}</Text>
                            <Text style={styles.text}>Comida: {pet?.foodLevel.toFixed(2)}</Text>
                            <Text style={styles.text}>Diversão: {pet?.funLevel.toFixed(2)}</Text>

                            <Button mode="contained" textColor={'#000'} buttonColor={'#FFFFFF'} onPress={() => navigation.navigate('Jokenpo', { id })}>Brincar</Button>

                            <Button mode="contained" textColor={'#000'} buttonColor={'#FFFFFF'} onPress={() => descansar()}>Dormir</Button>
                            <Button mode="contained-tonal" textColor={'#000'} buttonColor={'#FFFFFF'} onPress={() => alimentar()}>Comer</Button>
                        </View>
                    </Card.Content>
                </Card>
            </SafeAreaView>
        )
    }
    const getDetalhesPet = async () => {
        console.log(id)
        try {
            const { data } = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id,
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            const petWithImage = {
                ...data,
                imageUrl: 'https://i.pinimg.com/564x/41/6f/34/416f3480436ae4aa96261a26ba718d04.jpg',
              };
        
              setPets(petWithImage);
            console.log(pet)
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }

    }
    useEffect(() => {
        getDetalhesPet();
    }, [navigation])

    const alimentar = async () => {
        try {
            await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/food', {}, {
                headers: {
                    'x-access-token': token,
                },
            });

            getDetalhesPet();
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    }

    const descansar = async () => {
        try {
            await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/rest', {},
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            getDetalhesPet();
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    }


    return (
        ListItem()

    );
}

export default DetalhesPet;