// React Native components
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeAppBar = (props) => {
  return (
    <>
      <HookComponent />
      <View style={styles.container}>{props.children}</View>
    </>
  )
}

const HookComponent = () => {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top, backgroundColor: '#35546E' }} />
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 165,
    backgroundColor: '#416788',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
})

export default HomeAppBar
