import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
} from '@expo-google-fonts/space-grotesk'

const StyledText = (props) => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return null
  } else {
    SplashScreen.hideAsync()
  }

  let style

  if (props.type === 'label') {
    style = props.variant === 'light' ? styles.lightLabel : styles.darkLabel
  } else if (props.type === 'text') {
    style = props.variant === 'light' ? styles.lightText : styles.darkText
  } else if (props.type === 'title') {
    style = props.variant === 'light' ? styles.lightTitle : styles.darkTitle
  } else if (props.type === 'header') {
    style = props.variant === 'light' ? styles.lightHeader : styles.darkHeader
  }

  return (
    <Text style={style}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  lightLabel: {
    color: '#EEF0F2',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  darkLabel: {
    color: '#080E21',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  lightText: {
    color: '#EEF0F2',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  darkText: {
    color: '#080E21',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  lightTitle: {
    color: '#EEF0F2',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  darkTitle: {
    color: '#080E21',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  lightHeader: {
    color: '#EEF0F2',
    fontSize: 40,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  darkHeader: {
    color: '#080E21',
    fontSize: 40,
    fontFamily: 'SpaceGrotesk_400Regular'
  }
});


export default StyledText
