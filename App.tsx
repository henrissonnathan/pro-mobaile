import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Form from './src/screens/Form';
import Home from './src/screens/Home';
import Login from './src/screens/login';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;