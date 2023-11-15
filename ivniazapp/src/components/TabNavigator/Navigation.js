import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Register from '../../screens/Register/Register';
import Login from '../../screens/Login/Login';
import TabNavigator from './TabNavigator';
import Comments from '../../screens/Comments/Comments';


const Stack = createNativeStackNavigator();


function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options= {{ headerShown : false}}/>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/>
        <Stack.Screen name='TabNavigator' component={TabNavigator} options= {{ headerShown : false}}/>
        <Stack.Screen name='Comments' component={Comments} options= {{ headerShown : false}}/>
      </Stack.Navigator> 

    </NavigationContainer>
  ); 
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default Navigation;