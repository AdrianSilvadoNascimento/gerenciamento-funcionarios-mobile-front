import { Text, View, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'

interface Props {
  title: string
  checked?: boolean
}

export function Checkbox({ title, checked = false }: Props) {
  return (
    <View style={style.checkView}>
      <Text style={style.text}>
        {title}
      </Text>
      {
        checked
        ?
        <View style={style.checked}>
          <Feather 
            name="check"
            size={20}
            color='#FFF'
          />
        </View>
        :
        <View style={style.unchecked} />
      }
    </View>
  )
}

const style = StyleSheet.create({
  checkView: {
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checked: {
    width: 30,
    height: 30,
    backgroundColor: '#00FF85',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  unchecked: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#707070',
  },

  text: {
    color: '#6F6F6F',
    marginRight: 12,
  }
})