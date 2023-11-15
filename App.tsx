import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/login';
import cadastro from './src/screens/cadastro'
import PetList from './src/screens/ListPage';
import CadastroPet from './src/screens/cadastroPet';
import DetalhesPet from './src/screens/DetalhesPet';
import Jokenpo from './src/screens/jokempo';
import editarPet from './src/screens/editarPet';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="cadastro" component={cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PetList" component={PetList}/>
        <Stack.Screen name="cadastroPet" component={CadastroPet}/>
        <Stack.Screen name="DetalhesPet" component={DetalhesPet}/>
        <Stack.Screen
          name="Jokenpo"component={(props: any) => <Jokenpo {...props} />}/>
          <Stack.Screen name="editarPet" component={editarPet}/>
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;