import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTokenStore } from '../components/token';
import { SafeAreaView } from 'react-native-safe-area-context';
const style = StyleSheet.create({
  input:  {
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    
  }
});
interface Pet {
  id: number;
  name: string;
  life: number;
  foodLevel: number; 
  funLevel: number;
};


const  PetList = ({navigation}:any) => {
  
  const {token} = useTokenStore();
  const [pets, setPets] = useState<Pet[]>([]);
console.log('listpage ',token)
  const fetchPets = async () => {
    try{
    const response = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets', {
      headers: {
      'x-access-token': token
      }  
     });
     setPets(response.data.pets);
     
     
    } catch (error) {
      console.error('Erro na solicitação', error);
    }
  };


  useEffect(() => {
    fetchPets();
  }, [token]);
  

  const renderPet = ({item}: {item: Pet}) => {
    return (
      <View>
        
        <Text>
          Nome: {item.name}  vida: {item.life} comida: {item.foodLevel} divesão {item.funLevel}
        </Text>
        <Text></Text>

        
      </View>
    )
  };

  return (
    <SafeAreaView>
      <Button 
        title="Adicionar Pet"
        onPress={() => navigation.navigate('cadastroPet')} // 3. Navegar
      />
    <FlatList
      data={pets}
      renderItem={renderPet}
      keyExtractor={item => item.id.toString()}
      style={style.input}
    />
    
    </SafeAreaView>
    
  );
  
}


const styles = StyleSheet.create({
  petContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee' 
  }
});
export default PetList;