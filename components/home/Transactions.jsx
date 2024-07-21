import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TransactionCard from "./TransactionCard";

const Transactions = (props) => {
  const { transactions } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionCard
            key={item.id}
            transactionId={item.id}
            name={item.description}
            category={item.category}
            type={item.type}
            amount={item.amount}
            date={item.date}
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
