import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { AXIOS } from '../lib/axios'
import { assertZeros } from '../util/assertZeros'

interface FuncionarioProps {
  id: string,
  nomeFuncionario: string
  horaInicioExpediente: Date
  horaFinalExpediente: Date
}

export function FuncionarioList({
  id,
  nomeFuncionario,
  horaInicioExpediente,
  horaFinalExpediente
}: FuncionarioProps) {
  const { navigate } = useNavigation()
  const [time, setTime] = useState('')
  const [horaInicio, setHoraInicio] = useState<Date>(new Date(horaInicioExpediente))
  const [horaFinal, setHoraFinal] = useState<Date>(new Date(horaFinalExpediente))
  const [horasAdicionadas, setHorasAdicionadas] = useState(false)

  const timeCounter = setInterval(timer, 1000)
  
  function timer() {
    const today = new Date()
    const hora = today.getHours()
    const inicio = horaInicio.getHours()
    const final = horaFinal.getHours()
    let minutoInicio = horaInicio.getMinutes()
    let minutoFinal = horaFinal.getMinutes()
    let segundosInicio = horaInicio.getSeconds()
    let segundosFinal = horaFinal.getSeconds()

    minutoInicio = assertZeros(minutoInicio)
    minutoFinal = assertZeros(minutoFinal)
    segundosInicio = assertZeros(segundosInicio)
    segundosFinal = assertZeros(segundosFinal)
    
    let segundos = today.getSeconds()
    let minutos = today.getMinutes()
    minutos = assertZeros(minutos)
    segundos = assertZeros(segundos)

    let counter: string = `${hora}:${minutos}:${segundos}`
    if (
      (hora >= inicio && minutos >= minutoInicio) &&
      (hora <= final && minutos <= minutoFinal)
    ) {
      counter = `${hora}:${minutos}:${segundos}`
      setTime(counter)
    } else if (hora >= final && minutos >= minutoFinal && !segundos) {
      clearInterval(timeCounter)
      counter = `${final}:${minutoFinal}:${segundosFinal}`
      setTime(counter)

      return
    }
  }

  async function atualizarHorasTrabalhadas() {
    try {
      await AXIOS.post(`/funcionario/trabalho/${id}`, {
        horaInicio: horaInicio,
        horaFinal: horaFinal,
      })
      Alert.alert('Horas trabalhadas adicionadas com sucesso!')
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível adicionar horas trabalhadas do funcionário')
    }
  }
  
  return (
    <View style={[style.container, style.elevação, style.shadowProp]}>
      <Text style={style.text}>
        {nomeFuncionario}
      </Text>
      
      <Text style={[style.timer, style.text]}>
        {time}
      </Text>

      <TouchableOpacity 
        style={style.settings}
        onPress={() => navigate('funcionarioDetails', { id: id.toString() }) }
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 307,
    height: 81,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12, 
    marginBottom: 19,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  text: {
    textAlignVertical: 'center',
  },

  elevação: {
    elevation: 8,
    shadowColor:'#000',
  },

  shadowProp: {
    shadowColor: '#171717', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  settings: {
    alignSelf: 'center'
  },

  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})
