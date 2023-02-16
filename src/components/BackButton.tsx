import { TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function BackButton() {
  const { goBack } = useNavigation()
  
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={goBack}
      style={style.button}
    >
      <Feather 
        name="arrow-left"
        size={32}
        color="#fff"
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  button: {
    width: 72,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#000'
  }
})

