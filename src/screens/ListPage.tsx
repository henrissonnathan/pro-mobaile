import React, { useState, useEffect, useId } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity,Alert,Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTokenStore } from '../components/token';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Pet {
  id: number;
  name: string;
  life: number;
  foodLevel: number; 
  funLevel: number;
  imageUrl: string; // Adicione esta linha
}
const style = StyleSheet.create({
  input:  {
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    borderColor:'#111',
    flexDirection: 'row', // Estabelece um layout de linha
    justifyContent: 'center', // Alinha os elementos ao longo do eixo principal (horizontal) ao espaço entre eles
    alignItems: 'center',
  },
  buttonText: {
    color: '#111', // Cor desejada do texto
    fontSize: 15, 
    marginLeft: 10,
  },
  textColor:{
    color:'#111',
    fontSize: 15
  },
  
  buttonContainer: {
    marginLeft: 15, // Adiciona um espaçamento à esquerda (pode ajustar conforme necessário)
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
  },
});



const  PetList = ({navigation}:any) => {
  
  const {token} = useTokenStore();
  const [pets, setPets] = useState<Pet[]>([]);

const handleDelete = async (id:number) =>{     
          try {
            const response = await axios.delete(`https://tamagochiapi-clpsampedro.b4a.run/pet/`+ id,
              {
                headers: {
                  'Content-type':'application/json',
                  'x-access-token': token,
                },
              }
            );

            // Faça algo com a resposta, se necessário
            console.log('Pet excluído com sucesso:', response.data);
            fetchPets();
          } catch (error) {
            console.error('Erro ao excluir o pet:', error);
          }
        
     
};
  const fetchPets = async () => {
    try{
    const response = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets', {
      headers: {
      'x-access-token': token
      }  
     });
     const petsWithImages = response.data.pets.map((pet: Pet) => ({
      ...pet,
      imageUrl: 'https://i.pinimg.com/564x/41/6f/34/416f3480436ae4aa96261a26ba718d04.jpg',
    }));

     setPets(response.data.pets);
     setPets(petsWithImages);
    } catch (error) {
      console.error('Erro na solicitação', error);
    }
  };
  
  useEffect(() => {
    fetchPets();
    }, []);
  const handleRefresh = () => {
    // Chama a função fetchPets para atualizar a lista de pets
    fetchPets();
  };

  const renderPet = ({item}: {item: Pet}) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate('DetalhesPet', { id: item.id }) }}>
      <View style={style.input}>
      <Image
          source={{ uri: item.imageUrl }}
          style={{ width: '50%', height: 200 }} // Ajuste as dimensões conforme necessário
        />
        <View>
        <Text style={style.textColor}>
           Nome:{item.name}
           </Text>
           <Text style={style.textColor}>
           vida:{item.life.toFixed(2)} 
           </Text>  
          
        <Text style={style.textColor} >comida:{item.foodLevel.toFixed(2)} 
        </Text>
        <Text style={style.textColor} >
        divesão {item.funLevel.toFixed(2)}</Text>
        <Text>
        <TouchableOpacity onPress={() => navigation.navigate('editarPet',{id:item.id})} style={style.buttonContainer} >
          <Text style={style.buttonText}>editar</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={style.buttonContainer} >
          <Text style={style.buttonText}>excluir</Text>
        </TouchableOpacity>
        </Text>
        
        </View>
      </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView >
      <View >
      <Button
        title="Adicionar Pet"

        onPress={() => navigation.navigate('cadastroPet')} // 3. Navegar
      />
      <Button title="Atualizar Lista" onPress={handleRefresh} />
      </View>
    <FlatList
      data={pets} 
      renderItem={renderPet }
      keyExtractor={item => item.id.toString()}
      
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
