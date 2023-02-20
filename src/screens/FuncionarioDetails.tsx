import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Calendar, LocaleConfig } from 'react-native-calendars'

import Header from '../components/Header'
import { AXIOS } from '../lib/axios'
import BackButton from '../components/BackButton'
import { Loading } from '../Loading'

interface Params {
  id: string
}

interface Funcionario {
  nomeFuncionario: string
  sobrenomeFuncionario: string
  posicaoFuncionario: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
}

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'fr';

export default function FuncionarioDetails() {
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState('8:30')
  const [endTime, setEndTime] = useState('18:30')
  const route = useRoute()
  const { id } = route.params as Params

  async function fetchFuncionario() {
    try {
      setLoading(true)
      
      const res = await AXIOS.get(`/funcionario/search/${id}`)
      setFuncionario(res.data)      
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar os dados do funcionário')
    } finally {
      setLoading(false)

      if (funcionario) {
        const inicio = new Date(funcionario.horaInicio)
        const final = new Date(funcionario.horaFinal)
  
        setStartTime(`${inicio.getHours()}:${inicio.getMinutes()}`)
        setEndTime(`${final.getHours()}:${final.getMinutes()}`)
      }
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
      
      <Text style={style.text}>Funcionário - Detalhes</Text>

      <BackButton />

        <Text style={style.name}>{ funcionario?.nomeFuncionario } { funcionario?.sobrenomeFuncionario }</Text>
        {
          isLoading
          ? <Loading />
          : <ScrollView style={ style.infoBg }>
              <View style={style.actions}>
                <TouchableOpacity>
                  <FontAwesomeIcon style={{ marginRight: 30, color: '#46A6FF' }} size={32} icon={ faPenToSquare } />
                </TouchableOpacity>

                <TouchableOpacity>
                  <FontAwesomeIcon style={{ color: '#FF4651' }} size={32} icon={ faTrash } />
                </TouchableOpacity>
              </View>
              <View style={style.infos}>
                <Text style={style.infos.text}>Turno: { funcionario?.turnoFuncionario }</Text>
                <Text style={style.infos.text}>Expediente: { startTime } - { endTime }</Text>
              </View>

              <View style={style.calendar}>
                <Calendar
                  initialDate={new Date().toISOString()}
                  enableSwipeMonths={true}
                />
              </View>
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

  infoBg: {
    height: 550,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#EEE'
  },

  infos: {
    paddingHorizontal: 15,
    paddingVertical: 15,

    text: {
      fontSize: 18,
      marginBottom: 10,
    }
  },

  calendar: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 15,
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
