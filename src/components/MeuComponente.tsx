import React, {useCallback, useEffect, useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text,Button, Touchable, TouchableOpacity} from 'react-native';
import { Image, Input } from 'react-native-elements';

const styles = StyleSheet.create({
  input: {
    fontSize:12,
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#111' ,
    textAlign:'center',
  },
});

const textos = ({navigation}:any) => {
    const[texto,setTexto]= useState('');

return(
    <SafeAreaView>
        <TextInput
        placeholder='texto'
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
      />
    </SafeAreaView>
)};
export default textos
