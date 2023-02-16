import { StatusBar } from 'react-native'
import { useFonts, NotoSerifAhom_400Regular } from '@expo-google-fonts/noto-serif-ahom'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Loading } from './src/Loading'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import { FuncionarioForm } from './src/screens/FuncionarioForm'

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSerifAhom_400Regular,
  })
  
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FuncionarioForm" component={FuncionarioForm} />
      </Stack.Navigator>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </NavigationContainer>
  )
}
