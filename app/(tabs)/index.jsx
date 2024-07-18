import React, { useState, useEffect, useCallback } from "react";
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
import { initDB } from "../../db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [userId, setUserId] = useState(null);
  const [currentAccount, setCurrentAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [fetchAccounts, setFetchAccounts] = useState(null);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    fetchTransactions();
    setIsModalVisible(false);
  };

  const calculateIncome = () => {
    if (transactions) {
      const income = transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
      setTotalIncome(income);
    }
  };

  const calculateExpenses = () => {
    if (transactions) {
      const expenses = transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
      setTotalExpenses(expenses);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          const user = JSON.parse(userData);
          const db = await initDB();
          const result = await db.getFirstAsync(
            "SELECT * FROM users WHERE username = ?",
            [user.name],
          );

          if (result) {
            setUserId(result.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user ID from database. ", error);
      }
    };

    fetchUserId();
  }, []);

  const fetchTransactions = async () => {
    if (currentAccount) {
      try {
        const db = await initDB();
        const result = await db.getAllAsync(
          "SELECT * FROM transactions WHERE account_id = ?",
          [currentAccount.id],
        );

        setTransactions(result);
      } catch (error) {
        console.error("Failed to fetch transactions from database. ", error);
      } finally {
        calculateIncome();
        calculateExpenses();
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentAccount]);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, []),
  );

  if (userId === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#416788" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <AddTransaction
        accountId={currentAccount.id}
        currentAmount={currentAccount.amount}
        currentIncome={currentAccount.total_income}
        currentExpense={currentAccount.total_expense}
        fetchAccounts={fetchAccounts}
        isEditing={false}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <HappBarLayout
              userId={userId}
              setFetchAccounts={setFetchAccounts}
              setCurrentAccount={setCurrentAccount}
              isFocused={isFocused}
            />
          </View>
        </HomeAppBar>
        <View style={styles.container} contentContainerStyle={styles.container}>
          <View style={styles.transactionsContainer}>
            <StyledText type="title">Transactions</StyledText>
          </View>
          <Transactions transactions={transactions} />
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
