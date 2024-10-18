import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import Register from "./components/Register";
import AhorrosUser from "./components/AhorrosUser"
import AhorrosCrear from "./components/AhorrosCrear"
import AhorrosDetalle from "./components/AhorrosDetalle"
import NavBar from "./components/NavBar"

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <View style = {{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AhorrosUser" component={AhorrosUser} />
        <Stack.Screen name="AhorrosCrear" component={AhorrosCrear} />
        <Stack.Screen name="AhorrosDetalle" component={AhorrosDetalle} />
      </Stack.Navigator>
      <NavBar />
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}> 
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5ebde',
    justifyContent: 'center',
  },
});
