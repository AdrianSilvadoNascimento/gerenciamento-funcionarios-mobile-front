import { StatusBar } from 'react-native'
import { useFonts, NotoSerifAhom_400Regular } from '@expo-google-fonts/noto-serif-ahom'

import { Loading } from './src/Loading'
import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSerifAhom_400Regular,
  })
  
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  )
}
