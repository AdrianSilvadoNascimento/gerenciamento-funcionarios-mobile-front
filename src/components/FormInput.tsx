import { View, TextInput, StyleSheet } from 'react-native'

export function FormInput({ ...inputProps }: any) {
  return (
    <View>
      <TextInput style={style.input} {...inputProps} />
    </View>
  )
}

const style = StyleSheet.create({
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
})
