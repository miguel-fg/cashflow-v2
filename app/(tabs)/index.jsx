// React Native components
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Dev components
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";
import HappBarLayout from "../../components/home/HappBarLayout";
import Transactions from "../../components/home/Transactions";
import AddNewButton from "../../components/shared/addNewButton";
import AddTransaction from "../../components/home/addTransaction";

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AddTransaction
        isEditing={false}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <HappBarLayout />
          </View>
        </HomeAppBar>
        <View style={styles.container} contentContainerStyle={styles.container}>
          <View style={styles.transactionsContainer}>
            <StyledText type="title">Transactions</StyledText>
          </View>
          <Transactions />
        </View>
        <View style={styles.bottomContainer}>
          <AddNewButton style={styles.buttonSize} onPress={handleAddNew} />
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
  transactionsContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  bottomContainer: {
    flex: -1,
    alignItems: "center",
    flexDirection: "column-reverse",
    marginBottom: 10,
  },
  buttonSize: {
    width: "80%",
  },
});

export default Index;
