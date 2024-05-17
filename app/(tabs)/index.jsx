// React Native components
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

// Dev components
import HomeAppBar from '../../components/home/HomeAppBar'
import StyledText from '../../components/shared/styledText'
import HappBarLayout from '../../components/home/HappBarLayout'

const Index = () => {

  return (
    <>
      <StatusBar style='light' translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <HappBarLayout />
          </View>
        </HomeAppBar>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.container}
        >
          <View style={styles.transactionsContainer}>
            <StyledText type='title'>Transactions</StyledText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  appBarContainer: {
    alignItems: 'center',
  },
  transactionsContainer: {
    alignItems: 'center',
    marginTop: 20,
  }
})

export default Index
