import axios from 'axios';
import { useTokenStore } from '../components/token'; 
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import { Image, Input } from 'react-native-elements';
/*
interface TokenStore {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
}*/


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
    color: 'cor desejada', // Cor desejada do texto
    fontSize: 18,
  },
});
const CustomButton = ({ title, onPress, textColor }: any) => { 
  return (
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
  </TouchableOpacity>
)};

const Login = ({navigation}:any) => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const tokenStore = useTokenStore();
    
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        try {
          if(!Email){
            // Verifique se o email foi fornecido
            setErrorMessage('Email é obtigatorio')
            return;
          }
          if(password.length < 6){
            //verique se a senha tem pelo menos 6 caracteres
            setErrorMessage('A senha deve ter pelo menos 6 caracteres');
            return;
          }
          
          const body = {
            email: Email,
            password: password,
          }
          const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/login', body);
          
             const userToken: string | null = data.token;
            tokenStore.setToken(userToken);
             navigation.navigate('PetList');
          // }
        } catch (error) {
          // Lidar com erros de rede ou outros erros aqui.
          console.error('Erro de rede', error);
        }
      };

  return (
    <SafeAreaView>
        <Input
        placeholder='Email'
        style={styles.input}
        value={Email}
        onChangeText={setEmail}
      />
       <Input 
        secureTextEntry={!showPassword}
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword} 
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
            source={showPassword ? require('../../imagens/olhoA.png') : require('../../imagens/olhof.png')}
            style={{width:25, height: 25}}
            />
          </TouchableOpacity>
        } 
      />
{errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <Button   
      title='logar'
        onPress={handleSubmit} 
      />
      
      <CustomButton
      title="cadastro"
      onPress={()=>{navigation.navigate('cadastro')}}
      testColor="#111"
      />
    </SafeAreaView>
  );
};

export default Login;