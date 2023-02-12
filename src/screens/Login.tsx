import { View, Text, StyleSheet } from "react-native"
import { Input } from "../components/LoginFormInput"

export default function Login() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        Gestão de Funcionários
      </Text>
      <Input />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 220,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 42,
    width: 260,
    textAlign: 'center',
    marginBottom: 61,
    fontWeight: 'bold'
  }
})
