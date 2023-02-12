import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { AXIOS } from "../lib/axios"
import { FuncionarioList } from '../components/FuncionarioList'

interface FuncionariosProps {
  nomeFuncionario: string
}

export default function Home({ navigation }: any) {
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [funcionarios, setFuncionarios] = useState<FuncionariosProps[]>([])

  async function fetchFuncionarios() {
    try {
      const res = await AXIOS.get('/funcionario/63e2c20b39840e2a25432bd4')
      setFuncionarios(res.data)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar os funcionários')
    }
  }
  
  useEffect(() => {
    fetchFuncionarios()
  }, [])
  
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

      <View style={style.funcionarioListBg}>
        <ScrollView>
          {
            funcionarios.map((funcionario, index) => (
              <FuncionarioList key={`${funcionario.nomeFuncionario}-${index}`} nomeFuncionario={funcionario.nomeFuncionario} horasATrabalhar='11' />
            ))
          }
        </ScrollView>
      </View>

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
