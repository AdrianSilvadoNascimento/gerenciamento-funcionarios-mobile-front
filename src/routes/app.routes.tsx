import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

import Home from '../screens/Home'
import { FuncionarioForm } from '../screens/FuncionarioForm'
import FuncionarioDetails from '../screens/FuncionarioDetails'

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name='home'
        component={Home}
      />
      <Screen 
        name='funcionarioForm'
        component={FuncionarioForm}
      />
      <Screen 
        name='funcionarioDetails'
        component={FuncionarioDetails}
      />
    </Navigator>
  )
}
