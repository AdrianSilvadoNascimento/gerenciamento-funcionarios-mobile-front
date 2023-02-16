import { useCallback, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { AXIOS } from "../lib/axios"
import { useFocusEffect } from '@react-navigation/native'

import { FuncionarioList } from '../components/FuncionarioList'
import { Loading } from '../Loading'

interface FuncionariosProps {
  nomeFuncionario: string
  sobrenomeFuncionario: string
  posicaoFuncionario: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
}

export default function Home({ navigation }: any) {
  const [loading, setLoading] = useState(false)
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [funcionarios, setFuncionarios] = useState<FuncionariosProps[]>([])

  async function fetchFuncionarios() {
    try {
      setLoading(true)
    
      const res = await AXIOS.get('/funcionario/63e2c20b39840e2a25432bd4')
      setFuncionarios(res.data)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar os funcionários')
    } finally {
      setLoading(false)
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchFuncionarios()
  }, []))
  
  return (
    <View style={style.container}>
      <Text style={style.header}>
        {
          nomeEmpresa
          ? nomeEmpresa
          : 'Nome da Empresa'
        }
      </Text>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('FuncionarioForm')}
      >
        <Text style={style.button.text}>
          + Novo Funcionário
        </Text>
      </TouchableOpacity>

      {
        loading 
        ? <Loading />
        : funcionarios 
        && <View style={style.funcionarioListBg}>
          <ScrollView>
            {
              funcionarios.map((funcionario, index) => (
                <FuncionarioList 
                  key={`${funcionario.nomeFuncionario}-${index}`} 
                  nomeFuncionario={funcionario.nomeFuncionario} 
                  horaInicioExpediente={funcionario.horaInicio}
                  horaFinalExpediente={funcionario.horaFinal}
                />
              ))
            }
          </ScrollView>
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100
  },

  header: {
    fontSize: 32,
    marginBottom: 50,
  },

  funcionarioListBg: {
    height: 550,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#EEE'
  },

  button: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#AFDDFF',
    borderRadius: 10,
    marginBottom: 21,

    text: {
      color: '#fff',
    }
  }
})
