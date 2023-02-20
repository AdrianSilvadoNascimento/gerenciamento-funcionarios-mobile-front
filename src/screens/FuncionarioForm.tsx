import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { NovoFuncionario } from '../components/NovoFuncionario'
import Header from '../components/Header'
import BackButton from '../components/BackButton'

export function FuncionarioForm() {  
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Header />
      </View>

      <Text style={style.text}>Funcionário - Adição</Text>

      <BackButton />

      <ScrollView>
        <NovoFuncionario />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    width: '100%',
    height: 120,
  },

  text: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 65,
    letterSpacing: 2,
    fontSize: 16,
  }

})
