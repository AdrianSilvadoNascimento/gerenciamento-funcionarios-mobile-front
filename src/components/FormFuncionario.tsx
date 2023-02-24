import { useState, useEffect } from 'react'
import {
  View,
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
import { assertZeros } from '../util/assertZeros'
import { useNavigation } from '@react-navigation/native'
DateTimePickerAndroid.dismiss('time')

interface FuncionarioProps {
  nomeFuncionario?: string
  sobrenomeFuncionario?: string
  cargoFuncionario?: string
  turnoFuncionario?: string
  horaInicio?: string
  horaFinal?: string
}

export function FormFuncionario({
  nomeFuncionario,
  sobrenomeFuncionario,
  cargoFuncionario,
  turnoFuncionario,
  horaInicio,
  horaFinal,
}: FuncionarioProps) {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    reset,
  } = useForm()
  const [dateInicio, setDateInicio] = useState<Date>(new Date())
  const [dateFinal, setDateFinal] = useState<Date>(new Date())
  const [doInicio, setHoraInicio] = useState(0)
  const [minutosInicio, setMinutosInicio] = useState(0)
  const [doFinal, setHoraFinal] = useState(0)
  const [minutosFinal, setMinutosFinal] = useState(0)
  const [showTimeInicio, setShowTimeInicio] = useState(false)
  const [showTimeFinal, setShowTimeFinal] = useState(false)
  
  const [msgInicio, setMsgInicio] = useState('Informe hora inicial do expediente')
  const [msgFinal, setMsgFinal] = useState('Informe hora final do expediente')

  useEffect(() => {
    register('nomeFuncionario')
    register('sobrenomeFuncionario')
    register('cargoFuncionario')
    register('turnoFuncionario')
    register('horaInicio')
    register('horaFinal')
  }, [register])

  /**
   * Altera e seta o valor da hora início.
   * 
   * @param { DateTimePickerEvent } event - Evento do date picker.
   * @param { any } selectedHoraInicio'- Hora selecionada.
   */
  function onChangeHoraInicio(event: DateTimePickerEvent, selectedHoraInicio: any) {
    const horaInicialSelecionada: Date = selectedHoraInicio
    let horas = horaInicialSelecionada.getHours()
    let minutos = horaInicialSelecionada.getMinutes()
    horas = assertZeros(horas)
    minutos = assertZeros(minutos)
    
    horaInicialSelecionada.setSeconds(0)
    setDateInicio(horaInicialSelecionada)
    setHoraInicio(horas)
    setMinutosInicio(minutos)

    setValue('horaInicio', dateInicio)

    setMsgInicio(`${horas}:${minutos}:00`)

    if (event.type === 'dismissed' || event.type === 'set') {
      setShowTimeInicio(!showTimeInicio)
    }
  }

  /**
   * Altera e seta o valor da hora final.
   * 
   * @param { DateTimePickerEvent } event - Evento do date picker.
   * @param { any } selectedHoraFinal - Hora selecionada.
   */
  function onChangeHoraFinal(event: DateTimePickerEvent, selectedHoraFinal: any) {
    const horaFinalSelecionada: Date = selectedHoraFinal
    let horas = horaFinalSelecionada.getHours()
    let minutos = horaFinalSelecionada.getMinutes()
    horas = assertZeros(horas)
    minutos = assertZeros(minutos)
    
    horaFinalSelecionada.setSeconds(0)
    setDateFinal(horaFinalSelecionada)
    setHoraFinal(horas)
    setMinutosFinal(minutos)

    setValue('horaFinal', dateFinal)

    setMsgFinal(`${horas}:${minutos}:00`)

    if ((event.type === 'dismissed') || (event.type === 'set')) {
      setShowTimeFinal(!showTimeFinal)
    }
  }

  /**
   * Abre o date time picker.
   */
  function timePickerInicio() {
    setShowTimeInicio(true)
  }

  /**
   * Abre o date time picker.
   */
  function timePickerFinal() {
    setShowTimeFinal(true)
  }

  /**
   * Envia o formulário para cadastro de funcionário.
   * 
   * @param data - Dados do funcionário.
   */
  async function onSubmit(data: any) {
    try {
      setLoading(true)

      await AXIOS.post('/funcionario/cadastro/63e2c20b39840e2a25432bd4', {
        nomeFuncionario: data.nomeFuncionario,
        sobrenomeFuncionario: data.sobrenomeFuncionario,
        cargoFuncionario: data.cargoFuncionario,
        turnoFuncionario: data.turnoFuncionario,
        horaInicio: data.horaInicio,
        horaFinal: data.horaFinal,
      })

      Alert.alert('Funcionário adicionado com sucesso!')

      setTimeout(() => {
        navigate('home')
      }, 3000)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível cadastrar novo funcionário')
    } finally {
      setLoading(false)
      reset([
        'nomeFuncionario',
        'sobrenomeFuncionario',
        'cargoFuncionario',
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
      <FormInput
        rules={{ required: { value: true, message: 'Nome é obrigatório' }}}
        placeholder='Nome do funcionário'
        value={nomeFuncionario}
        onChangeText={(text: string) => setValue('nomeFuncionario', text)} />
      <FormInput
        rules={{ required: { value: true, message: 'Sobrenome é obrigatório' }}}
        placeholder='Sobrenome do funcionário'
        value={sobrenomeFuncionario}
        onChangeText={(text: string) => setValue('sobrenomeFuncionario', text)} />
      <FormInput
        rules={{ required: { value: true, message: 'Cargo do funcionário é obrigatória' }}}
        placeholder='Cargo do funcionário'
        value={cargoFuncionario}
        onChangeText={(text: string) => setValue('posicaoFuncionario', text)} />
      <FormInput
        rules={{ required: { value: true, message: 'Turno do funcionário é obrigatório' }}}
        placeholder='Turno'
        value={turnoFuncionario}
        onChangeText={(text: string) => setValue('turnoFuncionario', text)} />

      <TouchableOpacity 
        style={styles.input}
        onPress={timePickerInicio}
      >
        <Text style={styles.input.text}>
          { msgInicio }
        </Text>
        {
          showTimeInicio &&
          <DateTimePicker 
            value={dateInicio}
            onChange={onChangeHoraInicio}
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
          { msgFinal }
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
