import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/login';
import cadastro from './src/screens/cadastro'
import PetList from './src/screens/ListPage';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="cadastro" component={cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PetList" component={PetList}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;