import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";

const Accounts = () => {
  return (
    <>
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <StyledText type="header" variant="light">
              Accounts
            </StyledText>
          </View>
        </HomeAppBar>
        <View
          styles={styles.container}
          contentContainerStyle={styles.container}
        >
          <View style={styles.titleContainer}>
            <StyledText type="title">Banking</StyledText>
          </View>
          <View style={styles.titleContainer}>
            <StyledText type="title">Credit</StyledText>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F2",
  },
  appBarContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
});

export default Accounts;
