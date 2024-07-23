import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import StyledText from "../../components/shared/styledText";
import HappBarLayout from "../../components/home/HappBarLayout";
import HomeAppBar from "../../components/home/HomeAppBar";
import CategoryChart from "../../components/budgets/categoryChart";

const Budgets = () => {
  return (
    <>
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <HappBarLayout />
          </View>
        </HomeAppBar>
        <View style={styles.container} contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <StyledText type="title">Category Breakdown</StyledText>
          </View>
          <CategoryChart />
          <View style={styles.titleContainer}>
            <StyledText type="title">Your Budgets</StyledText>
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
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Budgets;
