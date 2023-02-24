import { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { AXIOS } from '../lib/axios'
import { assertZeros } from '../util/assertZeros'
import { Loading } from '../Loading'

LocaleConfig.locales['pt-BR'] = {
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
    'Dezembro',
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
}
LocaleConfig.defaultLocale = 'pt-BR'

interface FuncionarioProps {
  funcionarioId: string
  turnoFuncionario: string
  horaInicio: Date
  horaFinal: Date
  diasTrabalhados: {
    dia: Date
    horasNoDia: number
  }[]
  eventos: {
    dataInicio: Date
    dataFinal: Date
    selecionado: boolean
    comecoDia: boolean
    finalDia: boolean
  }[]
}

export default function FuncionarioInfo({
  funcionarioId,
  turnoFuncionario,
  horaInicio,
  horaFinal,
  diasTrabalhados,
  eventos
}: FuncionarioProps) {
  const { navigate } = useNavigation()
  const [isLoading, setLoading] = useState(false)
  const [inicio, setHoraInicio] = useState<Date>(new Date(horaInicio))
  const [final, setHoraFinal] = useState<Date>(new Date(horaFinal))
  const [dias, setDias] = useState(Object)

  const [timeInicio, setTimeInicio] = useState('')
  const [timeFinal, setTimeFinal] = useState('')

  async function excluirFuncionario() {
    try {
      setLoading(true)
      await AXIOS.delete(`/funcionario/${funcionarioId}`)
      
      Alert.alert('Sucesso', 'Funcionário removido com sucesso!')

      setTimeout(() => {
        navigate('home')
      }, 3000)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível remover o funcionário')
    } finally {
      setLoading(false)
    } 
  }

  function getMarked() {
    let marked: { [date: string ]: {}} = {}
    const currentDate = new Date()
    let mesAtual = currentDate.getMonth() + 1
    mesAtual = assertZeros(mesAtual)
    const dataString = `${currentDate.getFullYear()}-${mesAtual}`
    
    if (diasTrabalhados) {
      console.log('dias:', diasTrabalhados.length)
      for(const dia of diasTrabalhados) {
        const diaEmDiasTrabalhados = new Date(dia.dia)
        marked[`${dataString}-${diaEmDiasTrabalhados.getDate()}`] = {
          marked: true,
          color: '#46A6FF',
          textColor: '#fff',
        }
      }
    }
    return marked;
  }

  useEffect(() => {
    let horaInicio = inicio.getHours()
    let minutosInicio = inicio.getMinutes()
    let horaFinal = final.getHours()
    let minutosFinal = final.getMinutes()
    horaInicio = assertZeros(horaInicio)
    minutosInicio = assertZeros(minutosInicio)
    horaFinal = assertZeros(horaFinal)
    minutosFinal = assertZeros(minutosFinal)

    setTimeInicio(`${horaInicio}:${minutosInicio}:00`)
    setTimeFinal(`${horaFinal}:${minutosFinal}:00`)
  }, [])
  
  if (isLoading) {
    return (
      <Loading />
    )
  }
  
  return (
    <ScrollView style={ style.infoBg }>
      <View style={style.actions}>
        <TouchableOpacity
          onPress={() => navigate('funcionarioForm', {
            tituloForm: 'editar',
            funcionarioId: funcionarioId
          })}
        >
          <FontAwesomeIcon style={{ marginRight: 30, color: '#46A6FF' }} size={32} icon={ faPenToSquare } />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={excluirFuncionario}>
          <FontAwesomeIcon style={{ color: '#FF4651' }} size={32} icon={ faTrash } />
        </TouchableOpacity>
      </View>
      <View style={style.infos}>
        <Text style={style.infos.text}>Turno: { turnoFuncionario }</Text>
        <Text style={style.infos.text}>
          Expediente: 
          <Text> { timeInicio } - </Text>
          <Text>{ timeFinal }</Text>
        </Text>
      </View>

      <View style={style.calendar}>
        <Calendar
          initialDate={new Date().toISOString()}
          markingType='custom'
          markedDates={getMarked()}
          enableSwipeMonths={true}
        />
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  infoBg: {
    height: 550,
    marginHorizontal: 15,
    marginTop: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
})
