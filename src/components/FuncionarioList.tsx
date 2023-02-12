import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface FuncionarioProps {
  nomeFuncionario: string
  horasATrabalhar: string
}

export function FuncionarioList({ nomeFuncionario, horasATrabalhar }: FuncionarioProps) {
  const [time, setTime] = useState('')
  
  function timer() {
    const today = new Date()
    const hora = today.getHours()
    const horas = parseInt(horasATrabalhar)
    
    let minutos = today.getMinutes()
    minutos = assertZeros(minutos)

    let counter: string = ''
    if (hora === horas) {
      counter = `${hora}:${minutos}`
    }
    setTime(counter)
  }

  function assertZeros(val: any) {
    if (val < 10) {
      val = `0${val}`
    }
    return val
  }

  setInterval(timer, 1000)
  
  return (
    <View style={style.container}>
      <Text style={style.text}>
        {nomeFuncionario.substring(0, 6)}
      </Text>
      
      <Text style={[style.timer, style.text]}>
        {time}
      </Text>

      <Text style={style.text}>
        O
      </Text>
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

  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})
