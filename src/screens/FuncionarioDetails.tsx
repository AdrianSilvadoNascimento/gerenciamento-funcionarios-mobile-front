import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import Header from '../components/Header'
import { AXIOS } from '../lib/axios'
import BackButton from '../components/BackButton'
import { Loading } from '../Loading'
import FuncionarioInfo from '../components/FuncionarioInfo'

interface Params {
  id: string
}

interface FuncionarioProps {
  nomeFuncionario: string
  sobrenomeFuncionario: string
  posicaoFuncionario: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
}

type DiasTrabalhadosProps = {
  dia: Date
  horasNoDia: number
}[]

type EventosProps = {
  dataInicio: Date,
  dataFinal: Date,
  selecionado: boolean,
  comecoDia: boolean,
  finalDia: boolean,
}[]

export default function FuncionarioDetails() {
  const [funcionario, setFuncionario] = useState<FuncionarioProps>()
  const [diasTrabalhados, setDiasTrabalhados] = useState<DiasTrabalhadosProps>()
  const [eventos, setEventos] = useState<EventosProps>()
  const [isLoading, setLoading] = useState(false)
  const route = useRoute()
  const { id } = route.params as Params

  async function fetchFuncionario() {
    try {
      setLoading(true)
      
      const res = await AXIOS.get(`/funcionario/${id}`)
      const trabalhados: DiasTrabalhadosProps = res.data.diasTrabalhados
      const eventos: EventosProps = res.data.eventos
      setFuncionario(res.data.funcionario)
      setDiasTrabalhados(trabalhados)
      setEventos(eventos)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar os dados do funcionário')
    } finally {
      setLoading(false)
    }  
  }
  
  useEffect(() => {
    fetchFuncionario() 
  }, [])

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Header />
      </View>
      
      <Text style={style.text}>Informações do Funcionário</Text>

      <BackButton />

        {
          isLoading
          ? <Loading />
          : funcionario && diasTrabalhados && eventos &&
          <>
            <Text style={style.name}>{ funcionario?.nomeFuncionario } { funcionario?.sobrenomeFuncionario }</Text>
            <FuncionarioInfo 
              funcionarioId={id}
              turnoFuncionario={funcionario?.turnoFuncionario}
              horaInicio={funcionario?.horaInicio}
              horaFinal={funcionario?.horaFinal}
              diasTrabalhados={diasTrabalhados}
              eventos={eventos}
            />
          </>
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
    height: 120,
  },

  name: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 18,
    letterSpacing: 2,
    fontSize: 16,
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
