import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, TouchableOpacity,Text } from 'react-native';
import { Image,Input } from 'react-native-elements';

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

const Cadastro = ({ navigation }: any) => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
    // Validações ao pressionar o botão "Cadastrar"
    if (!isValidEmail(Email)) {
      setErrorMessage('O email não é válido.');
      return; // Não prosseguir com o registro se o email não for válido
    }
    if (password !== verify) {
      setErrorMessage('As senhas não coincidem.');
    } else if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
    } else {
      try {
        const response = await fetch('https://tamagochiapi-clpsampedro.b4a.run/register', {
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
          // Registro bem-sucedido, pode redirecionar para a tela de login ou fazer outra ação.
          navigation.navigate('Login');
        } else {
          // Trate erros de registro aqui, por exemplo, exibindo uma mensagem de erro.
          console.error('Erro no registro');
        }
      } catch (error) {
        // Lidar com erros de rede ou outros erros aqui.
        console.error('Erro de rede', error);
      }
    }
  };
  const isValidEmail = (Email:any) => {
    // Expressão regular simples para validar o formato do email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(Email);
  };


  return (
    <SafeAreaView>
      <Input
        placeholder='Email'
        value={Email}
        onChangeText={setEmail} // Use a função de setter diretamente
        style={styles.input}
      />
      <Input
        secureTextEntry={!showPassword}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword} // Use a função de setter diretamente
        style={styles.input}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? require('../../imagens/olhoA.png') : require('../../imagens/olhof.png')}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        }
      />
      <Input
        secureTextEntry={!showVerify}
        placeholder="verificasão"
        value={verify}
        onChangeText={setVerify} // Use a função de setter diretamente
        style={styles.input}
        rightIcon={
          <TouchableOpacity onPress={() => setShowVerify(!showVerify)}>
            <Image
              source={showVerify ? require('../../imagens/olhoA.png') : require('../../imagens/olhof.png')}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        }
      />
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <Button
        title='cadastrar'
        onPress={handleRegister}
      />
      <Button
        title="login"
        onPress={() => { navigation.navigate('Login') }}
      />
    </SafeAreaView>
  );
};

export default Cadastro;
