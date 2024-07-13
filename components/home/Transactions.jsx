import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TransactionCard from "./TransactionCard";

const data = [
  {
    key: 0,
    name: "Levi's jacket",
    category: "Shopping",
    type: "Expense",
    amount: 120.5,
  },
  {
    key: 1,
    name: "Fiscal kids",
    category: "Paycheck",
    type: "Income",
    amount: 1242,
  },
  {
    key: 2,
    name: "Doordash",
    category: "Takeout",
    type: "Expense",
    amount: 55.2,
  },
  {
    key: 3,
    name: "T&T Supermarket",
    category: "Groceries",
    type: "Expense",
    amount: 42.74,
  },
  {
    key: 4,
    name: "Fido",
    category: "Bills",
    type: "Expense",
    amount: 39.4,
  },
  {
    key: 5,
    name: "Compass card",
    category: "Transport",
    type: "Expense",
    amount: 103,
  },
  {
    key: 6,
    name: "Cash deposit",
    category: "ATM",
    type: "Income",
    amount: 375,
  },
  {
    key: 7,
    name: "Phone stand",
    category: "Other",
    type: "Expense",
    amount: 19.23,
  },
];

const Transactions = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TransactionCard
            key={item.key}
            name={item.name}
            category={item.category}
            type={item.type}
            amount={item.amount}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Transactions;
