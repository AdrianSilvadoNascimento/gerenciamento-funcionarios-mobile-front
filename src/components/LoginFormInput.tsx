import { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { AXIOS } from '../lib/axios'

import { Checkbox } from './CheckBox'

interface LoginProps {
  email: string
  senha: string
}

interface EmpresasProps {
  id: string
  nomeFantasia: string
  qtdFuncionarios: number
}

export function Input() {
  const [loading, setLoading] = useState(true)
  const [empresas, setEmpresas] = useState<EmpresasProps | null>(null)
  const [title, setTitle] = useState('')
  const [senha, setSenha] = useState('')
  const [checked, setChecked] = useState(false)

  function check() {
    const isChecked = checked ? false : true
    setChecked(isChecked)
  }

  async function login({ email, senha }: LoginProps) {
  }

  async function getEmpresas() {
    try {
      setLoading(true)

      const res = await AXIOS.get('/empresa')
      
      setEmpresas(res.data)
    } catch (error) {
      console.error('error:', error)
      Alert.alert('Ops', 'Não foi possível carregar as informações das empresas')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor='6F6F6F'
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder='Senha'
        secureTextEntry={true}
        placeholderTextColor='6F6F6F'
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity style={styles.esqueceu}>
        <Text style={styles.esqueceu.text}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.entrar}
        onPress={() => getEmpresas()}
      >
        <Text style={styles.entrar.text}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => check()}
      >
        <Checkbox 
          title='Mantenha-me conectado'
          checked={checked} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.criarConta}>
        <Text style={styles.esqueceu.text}>
          Não possui conta?
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 48,
    padding: 12,
    paddingLeft: 20,
    textAlign: 'left',
    backgroundColor: '#F0F0F0',
    marginBottom: 24,
    borderRadius: 10,
  },

  esqueceu: {
    alignItems: 'flex-end',

    text: {
      fontSize: 16,
      color: '#AFDDFF'
    }
  },

  criarConta: {
    alignItems: 'center',
    marginTop: 70,

    text: {
      fontSize: 16,
      color: '#AFDDFF'
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
