import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";
import HappBarLayout from "../../components/home/HappBarLayout";
import Transactions from "../../components/home/Transactions";
import AddNewButton from "../../components/shared/addNewButton";
import AddTransaction from "../../components/home/addTransaction";
import { TransactionContext } from "../../context/transactionContext";
import BalanceChart from "../../components/home/balanceChart";
import AddNewCard from "../../components/shared/addNewCard";

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { transactions, loading, fetchTransactions } =
    useContext(TransactionContext);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#416788" />
        </SafeAreaView>
      </>
    );
  }

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
            <StyledText type="title">Summary</StyledText>
          </View>
          <BalanceChart />
          <View style={styles.transactionsContainer}>
            <StyledText type="title">Transactions</StyledText>
          </View>
          <AddNewCard onPress={handleAddNew} toAdd="Transaction" />
          <Transactions transactions={transactions} />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF0F2",
  },
  appBarContainer: {
    alignItems: "center",
  },
  transactionsContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Index;
