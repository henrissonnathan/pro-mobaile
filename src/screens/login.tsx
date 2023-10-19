import { create } from 'zustand'
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import { Image, Input } from 'react-native-elements';

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
const CustomButton = ({ title, onPress, textColor }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
  </TouchableOpacity>
);

const Login = ({navigation}:any) => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        // Validações
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
    
        // Lógica de autenticação aqui (verificação de senha, comunicação com a API, etc.)
        try {
          // Aqui você pode enviar as informações de login para a API
          // Por exemplo, você pode usar o fetch para autenticar o usuário
          const response = await fetch('https://tamagochiapi-clpsampedro.b4a.run/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: Email,
              password: password,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            const userToken: string | null = data.token;
            useTokenStore().setToken(userToken);
           // await AsyncStorage.setItem('userToken', userToken);
            //colocar aqui
            navigation.navigate('ListPage');
          } else {
            // Trate erros de autenticação aqui, por exemplo, exibindo uma mensagem de erro.
            console.error('Erro na autenticação');
          }
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