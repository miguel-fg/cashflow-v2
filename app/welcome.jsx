import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, StatusBar } from 'react-native';
import StyledText from '../components/shared/styledText';
import TextButton from '../components/shared/textButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const Welcome = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#EEF0F2' />
      <HookComponent />
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/images/payments.png')}
          style={styles.mainImage}
        />
        <View style={styles.textContainer}>
          <StyledText type='header' weight='medium'>
            Cash Flow
          </StyledText>
          <StyledText type='text'>See where your money goes</StyledText>
        </View>
        <Link href='/login' asChild>
          <TextButton variant='primary' style={styles.buttonSize}>
            LOGIN
          </TextButton>
        </Link>
        <Link href='/register' asChild>
          <TextButton variant='secondary' style={styles.buttonSize}>
            SIGN UP
          </TextButton>
        </Link>
      </SafeAreaView>
    </>
  );
};

const HookComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: '#EEF0F2' }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 100,
  },
  mainImage: {
    width: 360,
    height: 226,
    marginTop: 90,
  },
  buttonSize: {
    width: '80%',
    marginBottom: 10,
  },
});

export default Welcome;
