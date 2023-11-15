import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useTokenStore } from '../components/token';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 35,
  },
  result: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default function Jokenpo({ route }: { route: { params: { id: string; token: string } } }) {
  const { id} = route.params;
  const {token} = useTokenStore();
  const [escolhaApp, setEscolhaApp] = useState<string | null>(null);
  const [escolhaUsuario, setEscolhaUsuario] = useState<string | null>(null);
  const [resultado, setResultado] = useState<string | null>(null);

  const opcoes = ['Pedra', 'Papel', 'Tesoura'];
 
  function mostrarEscolhas() {
    if(!escolhaUsuario || !escolhaApp) return null;
  
    return (
      <Text style={styles.result} >
        {escolhaUsuario} x {escolhaApp} 
      </Text>
    )
  }
  const aumentarDiversao = async () => {
    try {
      await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/play', {},
                {
                    headers: {
                        'x-access-token': token,
                    },
                });
    } catch (error) {
      Alert.alert('Erro ao aumentar diversão');
    }
  };

  const jogar = () => {
    const numeroAleatorio = Math.floor(Math.random() * 3);
    setEscolhaApp(opcoes[numeroAleatorio]);
    
    
    mostrarEscolhas();
    let resultadoJogo = '';
    let mensagemResultado = '';
    if (
      (escolhaUsuario === 'Pedra' && escolhaApp === 'Tesoura') ||
      (escolhaUsuario === 'Papel' && escolhaApp === 'Pedra') ||
      (escolhaUsuario === 'Tesoura' && escolhaApp === 'Papel')
    ) {
      resultadoJogo = 'Você ganhou!';
      mensagemResultado = `${escolhaUsuario} ganha de ${escolhaApp}`;
    } else if (
      (escolhaUsuario === 'Pedra' && escolhaApp === 'Papel') ||
      (escolhaUsuario === 'Papel' && escolhaApp === 'Tesoura') ||
      (escolhaUsuario === 'Tesoura' && escolhaApp === 'Pedra')
    ) {
      resultadoJogo = 'Você perdeu!';
      mensagemResultado = `${escolhaApp} ganha de ${escolhaUsuario}`;
    } else {
      resultadoJogo = 'Empatou!';
      mensagemResultado = `Ambos escolheram ${escolhaUsuario}. Empatou!`;
    }
  
    showResult(resultadoJogo, mensagemResultado);
  
    aumentarDiversao();
  };
  const showResult = async (text: string, mensagemResultado: string) => {
    await aumentarDiversao(); // Aguarda a conclusão de aumentarDiversao antes de continuar
    setResultado(`${text}\n${mensagemResultado}`);
  
    setTimeout(() => {
      setResultado(null);
    }, 3000);
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Jokenpo</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setEscolhaUsuario('Pedra');
            jogar();
          }}
        >
          <Text style={styles.buttonText}>Pedra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setEscolhaUsuario('Papel');
            jogar();
          }}
        >
          <Text style={styles.buttonText}>Papel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setEscolhaUsuario('Tesoura');
            jogar();
          }}
        >
          <Text style={styles.buttonText}>Tesoura</Text>
        </TouchableOpacity>
        {resultado && <Text style={styles.result}>{resultado}</Text>}
      </View>
    </View>
  );}