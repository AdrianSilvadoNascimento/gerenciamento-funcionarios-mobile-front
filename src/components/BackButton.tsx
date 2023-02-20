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
        color="#6F6F6F"
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  button: {
    width: 72,
    position: 'relative',
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#F0F0F0',
    marginTop: 25,
    marginBottom: 25,
  }
})

