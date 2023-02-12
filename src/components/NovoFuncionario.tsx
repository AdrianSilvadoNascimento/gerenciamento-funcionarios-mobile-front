import { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useForm } from 'react-hook-form'
import { AXIOS } from '../lib/axios'
import { FormInput } from './FormInput'

interface FuncionarioProps {
  nomeFuncionario: string
  telefoneContato: string
  posicaoFuncionario: string
  turnoFuncionario: string
  horasFuncionario: string
}

export function NovoFuncionario({ navigation }: any) {
  const [loading, setLoading] = useState(true)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    register('nomeFuncionario')
    register('telefoneContato')
    register('posicaoFuncionario')
    register('turnoFuncionario')
    register('horasFuncionario')
  }, [register])

  const onSubmit = async (data: any) => {
    const funcionario: FuncionarioProps = data
    console.log('funcionario:', funcionario)

    try {
      setLoading(true)

      await AXIOS.post('/funcionario/cadastro/63e2c20b39840e2a25432bd4', {
        nomeFuncionario: funcionario.nomeFuncionario,
        telefoneContato: funcionario.telefoneContato,
      })

      await navigation.navigate('Home')

      
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível cadastrar novo funcionário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormInput 
          placeholder='Digite o nome do funcionário'
          onChangeText={(text: string) => setValue('nomeFuncionario', text)} />
        <FormInput 
          placeholder='Digite o número de telefone'
          onChangeText={(text: string) => setValue('telefoneContato', text)} />
        <FormInput 
          placeholder='Digite a posição do funcionário'
          onChangeText={(text: string) => setValue('posicaoFuncionario', text)} />
        <FormInput 
          placeholder='Digite o turno'
          onChangeText={(text: string) => setValue('turnoFuncionario', text)} />
        <FormInput 
          placeholder='Digite a quantidade de horas'
          onChangeText={(text: string) => setValue('horasFuncionario', text)} />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.entrar}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.entrar.text}>
            Cadastrar
          </Text>
        </TouchableOpacity>      
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  entrar: {
    paddingTop: 13,
    paddingRight: 15,
    paddingBottom: 13,
    paddingLeft: 15,
    backgroundColor: '#00FF85',
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 24,
    
    text: {
      color: '#FFF',
      fontSize: 18
    }
  }
})
