import { useCallback, useState, useEffect } from 'react'
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Image
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

export default function Home({ navigation }: any) {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [isFirstTime, setFirstTime] = useState(true)
  const [funcionarios, setFuncionarios] = useState<FuncionariosProps[]>([])

  async function fetchFuncionarios() {
    try {
      setLoading(true)
    
      const res = await AXIOS.get('/funcionario/empresa/63e2c20b39840e2a25432bd4')
      setFuncionarios(res.data)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar os funcionários')
    } finally {
      setLoading(false)
      setFirstTime(false)
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchFuncionarios()
  }, []))

  useEffect(() => {
    setFirstTime(true)
  }, [])
  
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
        : funcionarios.length > 0
        ? <View style={style.funcionarioListBg}>
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
        : <View style={style.imageView}>
            <Text style={style.text}>Ops!</Text>
            <Text style={style.text}>Parece que sua lista de funcionários está vazia!</Text>
            <Image
              style={{ marginTop: 25 }}
              source={require('../assets/lista-vazia.png')}
            />

              <TouchableOpacity
                style={style.buttonListaVazia}
                onPress={() => navigate('funcionarioForm')}
              >
              <Text style={style.buttonListaVazia.text}>
                Cadastrar Funcionário
              </Text>
            </TouchableOpacity>
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

  imageView: {
    height: 760,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },

  text: {
    textAlign: 'center',
    marginBottom: 10,
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
  },

  buttonListaVazia: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#00FF85',
    borderRadius: 10,
    marginTop: 108,

    text: {
      color: '#fff',
      fontSize: 18,
    }
  },
})
