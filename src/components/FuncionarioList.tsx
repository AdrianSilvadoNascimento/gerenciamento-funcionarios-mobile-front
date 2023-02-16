import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface FuncionarioProps {
  nomeFuncionario: string
  horaInicioExpediente: Date
  horaFinalExpediente: Date
}

export function FuncionarioList({
  nomeFuncionario,
  horaInicioExpediente,
  horaFinalExpediente
}: FuncionarioProps) {
  const [time, setTime] = useState('')
  const [horaInicio, setHoraInicio] = useState<Date>(new Date(horaInicioExpediente))
  const [horaFinal, setHoraFinal] = useState<Date>(new Date(horaFinalExpediente))
  
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

    let counter: string = ''
    if (hora === inicio && minutos === minutoInicio) {
      counter = `${hora}:${minutos}:${segundos}`
    } else if (hora > inicio && minutos > minutoInicio) {
      counter = `${hora}:${minutos}:${segundos}`
    } else if (hora > final && minutos > minutoFinal) {
      counter = `${final}:${minutoFinal}:${segundosFinal}`
      clearInterval(timeCounter)
    } else {
      counter = `${inicio}:${minutoInicio}:${segundosInicio}`
      clearInterval(timeCounter)
    }

    setTime(counter)
  }

  function assertZeros(val: any) {
    if (val < 10) {
      val = `0${val}`
    }
    return val
  }
  
  return (
    <View style={style.container}>
      <Text style={style.text}>
        {nomeFuncionario.substring(0, 6)}
      </Text>
      
      <Text style={[style.timer, style.text]}>
        {time}
      </Text>

      <TouchableOpacity style={style.settings}>
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
  },

  text: {
    textAlignVertical: 'center',
  },

  settings: {
    alignSelf: 'center'
  },

  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})
