import { useCallback, useState } from 'react'
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
} from "react-native"
import { AXIOS } from "../lib/axios"
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { FuncionarioList } from '../components/FuncionarioList'
import { Loading } from '../Loading'
import Header from '../components/Header'

interface FuncionariosProps {
  id: string
  nomeFuncionario: string
  sobrenomeFuncionario: string
  posicaoFuncionario: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
}

export default function Home({ navigation, isFirstTime = true }: any) {
  const { navigate } = useNavigation()
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
      <View style={style.header}>
        <Header />
      </View>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigate('funcionarioForm')}
      >
        <Text style={style.button.text}>
          + Novo Funcionário
        </Text>
      </TouchableOpacity>

      {
        isFirstTime &&
        loading 
        ? <Loading />
        : funcionarios 
        && <View style={style.funcionarioListBg}>
          <ScrollView>
            {
              funcionarios.map((funcionario, index) => (
                <FuncionarioList 
                  key={`${funcionario.nomeFuncionario}-${index}`}
                  id={funcionario.id}
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
    backgroundColor: '#FFF',
  },

  header: {
    width: '100%',
    height: 120,
  },

  funcionarioListBg: {
    height: 550,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#EEE'
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#AFDDFF',
    borderRadius: 10,
    marginBottom: 21,

    text: {
      color: '#fff',
    }
  }
})
