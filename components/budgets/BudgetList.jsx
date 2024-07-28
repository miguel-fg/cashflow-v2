import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import BudgetCard from "./BudgetCard";

const BudgetList = (props) => {
  const { budgets } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={({ item }) => (
          <BudgetCard
            key={item.id}
            budgetId={item.id}
            category={item.category}
            currentAmount={item.current_amount}
            limitAmount={item.limit_amount}
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

export default BudgetList;
