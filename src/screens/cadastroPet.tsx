import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, TouchableOpacity,Text } from 'react-native';
import { Image,Input } from 'react-native-elements';
import { useTokenStore } from '../components/token';
import axios from 'axios';

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  customButton: {
    alignItems: 'center',
    marginTop: 10, // Espaço entre os botões
  },
  buttonText: {
    border: 1 ,
    borderColor: '#111' ,
    color:  '#1111',
    fontSize: 18 
  },
});
const CustomButton = ({ title, onPress, textColor }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
  </TouchableOpacity>
);
const CadastroPet = ({ navigation }: any) => {
const[name,setName] = useState('');
const [errorMessage, setErrorMessage] = useState('')
const {token} = useTokenStore();
console.log(token)

const handleSubmit = async () =>{
try{
const reponse = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet',
{name: name},{
  headers:{
    'Content-Type': 'application/json',
    'x-access-token': token,
  },
    
});
if (reponse) {
  // Registro bem-sucedido, pode redirecionar para a tela de login ou fazer outra ação.
  navigation.navigate('PetList');
} 

}catch (error) {
  // Lidar com erros de rede ou outros erros aqui.
  console.error('Erro de rede', error);
}
};
return(
  
<SafeAreaView>
<Input
        placeholder='Nome'
        value={name}
        onChangeText={setName} // Use a função de setter diretamente
        style={styles.input}
      />
  <Button
  title='cadastrar'
  onPress={handleSubmit}
  />
  <CustomButton
      title="lista de pets"
      onPress={()=>{navigation.navigate('PetList')}}
      testColor="#111"
      />
</SafeAreaView>
  )

};
export default CadastroPet
