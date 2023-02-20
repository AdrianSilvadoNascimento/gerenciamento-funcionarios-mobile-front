import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  titulo?: string
  isEmpresa?: boolean
}

export default function Header({ titulo, isEmpresa = true }: HeaderProps) {
  return (
    <View style={[style.container, style.shadowProp, style.elevação]}>
      {
        !isEmpresa
        ? <Text style={style.text}>
            {
              titulo
              ? titulo
              : 'Nome da Empresa'
            }
          </Text>
        : <View style={[style.empresa, style.logoElevation, style.shadowProp]}>
            <Text style={style.empresa.text}>brand</Text>
          </View>
      }

      <TouchableOpacity>
        <FontAwesomeIcon size={45} style={style.menu} icon={ faEllipsisVertical } />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#46A6FF',
  },

  empresa: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#AFDDFF',
    position: 'relative',
    top: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,

    text: {
      fontSize: 32,
      color: '#FFF'
    }
  },

  menu: {
    marginRight: 30,
    marginTop: 30,
    color: '#FFF',
  },

  text: {
    fontSize: 32,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignContent: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },

  elevação: {
    elevation: 20,
    shadowColor:'#000',
  },

  logoElevation: {
    elevation: 10,
    shadowColor: '#000'
  },

  shadowProp: {
    shadowColor: '#171717', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  backButton: {
    position: 'relative',
    left: 0,
  },
})
