
//language : any
//object.keys(languege)
//language[object,keys(language)[0]]
//language.ara= language['ara']
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';

export default function Lista() {
  const [data, setData] = useState([]);

fetch('https://restcountries.com/v3.1/all')
.then((resposta)=> resposta.json())
    .then((json)=> console.log(json))
    .catch((error) => console.error(error) )
