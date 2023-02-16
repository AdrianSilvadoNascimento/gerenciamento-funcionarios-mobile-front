import { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useForm } from 'react-hook-form'
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { AXIOS } from '../lib/axios'
import { FormInput } from './FormInput'
import { Loading } from '../Loading'

DateTimePickerAndroid.dismiss('time')

export function NovoFuncionario() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [dateInicio, setDateInicio] = useState<Date>(new Date())
  const [dateFinal, setDateFinal] = useState<Date>(new Date())
  const [horaInicio, setHoraInicio] = useState(0)
  const [minutosInicio, setMinutosInicio] = useState(0)
  const [horaFinal, setHoraFinal] = useState(0)
  const [minutosFinal, setMinutosFinal] = useState(0)
  const [showTimeInicio, setShowTimeInicio] = useState(false)
  const [showTimeFinal, setShowTimeFinal] = useState(false)

  useEffect(() => {
    register('nomeFuncionario')
    register('sobrenomeFuncionario')
    register('posicaoFuncionario')
    register('turnoFuncionario')
    register('horaInicio')
    register('horaFinal')
  }, [register])

  function onChange(event: DateTimePickerEvent, selectedHoraInicio: any) {
    const horaInicialSelecionada: Date = selectedHoraInicio
    setDateInicio(horaInicialSelecionada)
    setHoraInicio(horaInicialSelecionada.getHours())
    setMinutosInicio(horaInicialSelecionada.getMinutes())

    setValue('horaInicio', dateInicio)

    if (event.type === 'dismissed' || event.type === 'set') {
      setShowTimeInicio(false)
    }
  }

  function onChangeHoraFinal(event: DateTimePickerEvent, selectedHoraFinal: any) {
    const horaFinalSelecionada: Date = selectedHoraFinal
    setDateFinal(horaFinalSelecionada)
    setHoraFinal(horaFinalSelecionada.getHours())
    setMinutosFinal(horaFinalSelecionada.getMinutes())

    setValue('horaFinal', dateFinal)

    if (event.type === 'dismissed' || event.type === 'set') {
      setShowTimeFinal(false)
    }
  }

  function timePickerInicio() {
    setShowTimeInicio(true)
  }

  function timePickerFinal() {
    setShowTimeFinal(true)
  }

  /**
   * 
   * @param data - Dados do funcionário.
   */
  async function onSubmit(data: any) {

    try {
      setLoading(true)

      await AXIOS.post('/funcionario/cadastro/63e2c20b39840e2a25432bd4', {
        nomeFuncionario: data.nomeFuncionario,
        sobrenomeFuncionario: data.sobrenomeFuncionario,
        posicaoFuncionario: data.posicaoFuncionario,
        turnoFuncionario: data.turnoFuncionario,
        horaInicio: data.horaInicio,
        horaFinal: data.horaFinal,
      })
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível cadastrar novo funcionário')
    } finally {
      setLoading(false)
      reset([
        'nomeFuncionario',
        'sobrenomeFuncionario',
        'posicaoFuncionario',
        'turnoFuncionario',
        'horaInicio',
        'horaFinal',
      ])

      setHoraInicio(0)
      setHoraFinal(0)
      setMinutosInicio(0)
      setMinutosFinal(0)
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormInput 
          placeholder='Nome do funcionário'
          onChangeText={(text: string) => setValue('nomeFuncionario', text)} />
        <FormInput 
          placeholder='Sobrenome do funcionário'
          onChangeText={(text: string) => setValue('sobrenomeFuncionario', text)} />
        <FormInput 
          placeholder='Posição do funcionário'
          onChangeText={(text: string) => setValue('posicaoFuncionario', text)} />
        <FormInput 
          placeholder='Turno'
          onChangeText={(text: string) => setValue('turnoFuncionario', text)} />

        <TouchableOpacity 
          style={styles.input}
          onPress={timePickerInicio}
        >
          <Text style={styles.input.text}>
            {
              minutosInicio !== 0 
              ? `${horaInicio}:${minutosInicio}`
              : 'Informe hora inicial do expediente'
            }
          </Text>
          {
            showTimeInicio &&
            <DateTimePicker 
              value={dateInicio}
              onChange={onChange}
              is24Hour={true}
              mode='time'
              testID='dateTimePicker'
            />
          }
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.input}
          onPress={timePickerFinal}>
          <Text style={styles.input.text}>
            {
              minutosFinal !== 0 
              ? `${horaFinal}:${minutosFinal}`
              : 'Informe hora final do expediente'
            }
          </Text>
          {
            showTimeFinal &&
            <DateTimePicker 
              value={dateFinal}
              onChange={onChangeHoraFinal}
              is24Hour={true}
              mode='time'
              testID='dateTimePicker'
            />
          }
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.entrar}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.entrar.text}>
            Cadastrar
          </Text>
        </TouchableOpacity>      
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  input: {
    width: 300,
    height: 48,
    padding: 12,
    paddingLeft: 20,
    textAlign: 'left',
    backgroundColor: '#F0F0F0',
    marginBottom: 24,
    borderRadius: 10,

    text: {
      color: '#8E8E8E'
    }
  },

  entrar: {
    paddingTop: 13,
    paddingRight: 15,
    paddingBottom: 13,
    paddingLeft: 15,
    backgroundColor: '#00FF85',
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 24,
    
    text: {
      color: '#FFF',
      fontSize: 18
    }
  }
})
