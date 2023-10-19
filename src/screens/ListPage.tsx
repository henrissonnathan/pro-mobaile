import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import create from 'zustand';
import axios from 'axios';

interface TokenStore {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: null }),
}));

interface Pet {
  id: number;
  name: string;
  life: number;
  foodLevel: number;
  // outras propriedades 
}

export default function PetList() {

  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const token = useTokenStore.getState().token;
      
      const response = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets', {
        headers: {
        'x-access-token': token
        }  
       });
      
      // setPets(response.data.pets as Pet[])
      console.log('aqui')
    };

    fetchPets();
  }, []);

  const renderPet = ({item}: {item: Pet}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    )
  };

  return (
    <FlatList
      data={pets}
      renderItem={renderPet}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  petContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee' 
  }
});
