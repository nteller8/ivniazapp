import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Registro from "./src/screens/Registro/Registro";
import Login from "./src/screens/Login/Login";
import TabNavigator from './src/components/TabNavigator/TabNavigator';
import Comments from "./src/screens/Comments/Comments";
import User from './src/screens/User/User';
import Buscador from './src/screens/Buscador/Buscador'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Buscador"
          component={Buscador}
          options={{ headerShown: true }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
