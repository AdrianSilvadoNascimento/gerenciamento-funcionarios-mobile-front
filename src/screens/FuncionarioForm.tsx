import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'

import { FormFuncionario } from '../components/FormFuncionario'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { AXIOS } from '../lib/axios'
import { Loading } from '../Loading'
import { assertZeros } from '../util/assertZeros'

interface Params {
  tituloForm: string
  funcionarioId: string
}

interface FuncionarioProps {
  nomeFuncionario: string
  sobrenomeFuncionario: string
  cargoFuncionario: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
}

export function FuncionarioForm() {  
  const [funcionario, setFuncionario] = useState<FuncionarioProps | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [inicio, setInicio] = useState('')
  const [final, setFinal] = useState('')
  const route = useRoute()
  const { tituloForm, funcionarioId } = route.params as Params || ''

  async function fetchFuncionario() {
    if (tituloForm === 'editar' && funcionarioId) {
      try {
        setLoading(true)
        const res = await AXIOS.get(`/funcionario/${funcionarioId}`)

        console.log('funcionario:', res.data.funcionario)
  
        setFuncionario(res.data.funcionario)

        if (funcionario) {
          const tempoInicio = new Date(funcionario.horaInicio)
          const tempoFinal = new Date(funcionario.horaFinal)
          
          let horas = tempoInicio.getHours()
          let minutos = tempoInicio.getMinutes()
          let horaDoFinal = tempoFinal.getHours()
          let minutosDoFinal = tempoFinal.getMinutes()
          horas = assertZeros(horas)
          minutos = assertZeros(minutos)
          horaDoFinal = assertZeros(horaDoFinal)
          minutosDoFinal = assertZeros(minutosDoFinal)
  
          setInicio(`${horas}:${minutos}:00`)
          setFinal(`${horaDoFinal}:${minutosDoFinal}:00`)
        }

      } catch (error) {
        console.error('error:', error)
        Alert.alert('Ops', 'Não foi possível carregar os dados do funcionário')
      } finally {
        setLoading(false)
      }
    }
  }

  useFocusEffect(useCallback(() => {
    fetchFuncionario()
  }, []))
  
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Header />
      </View>

        <Text style={style.text}>
          {
            tituloForm === 'editar'
            ? 'Editar '
            : 'Adicionar '
          }
          Funcionário
        </Text>

        <BackButton />

        {
          isLoading
          ? <Loading />
          : !funcionario
          ?
          <ScrollView>
            <FormFuncionario />
          </ScrollView>
          :
          <ScrollView>
            <FormFuncionario
              nomeFuncionario={funcionario.nomeFuncionario}
              sobrenomeFuncionario={funcionario.sobrenomeFuncionario}
              cargoFuncionario={funcionario.cargoFuncionario}
              turnoFuncionario={funcionario.turnoFuncionario}
              horaInicio={inicio}
            />
          </ScrollView>
        }
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
