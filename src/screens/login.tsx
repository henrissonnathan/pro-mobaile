import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text,Button} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        // lógica de submit aqui    
      };
  
    const onUsernameChange = (username) => {
      setUsername(username);
    }  
  
    const onPasswordChange = (password) => {
      setPassword(password);
    }

  return (
    <SafeAreaView>
        <TextInput
        placeholder='Usuario'
        style={styles.input}
        value={username}
        onChangeText={onUsernameChange}
      />
       <TextInput 
        secureTextEntry={!showPassword}
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={onPasswordChange}  
      />

<Button title="Show Password" onPress={() => setShowPassword(!showPassword)} />
      

      <Button   
      title='Login'
        onPress={handleSubmit}
        
      />
    </SafeAreaView>
  );
};

export default Login;
