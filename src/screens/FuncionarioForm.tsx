import { View, Text, StyleSheet } from 'react-native'

import BackButton from '../components/BackButton'
import { NovoFuncionario } from '../components/NovoFuncionario'

export function FuncionarioForm() {  
  return (
    <View style={style.container}>
      <View style={style.backButton}>
        <BackButton />
      </View>
      <View style={style.headerContainer}>
        <Text style={style.header}>
          Cadastro de Funcionários
        </Text>
      </View>

      <View>
        <NovoFuncionario />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  backButton: {
    paddingTop: 80,
  },

  headerContainer: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 71,
  },

  header: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 32,
  }
})
