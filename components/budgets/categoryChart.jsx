import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import { TransactionContext } from "../../context/transactionContext";
import { View, StyleSheet, Dimensions } from "react-native";
import { categoryDataBuilder } from "../../scripts/chartDataBuilder";

const CategoryChart = () => {
  const [data, setData] = useState([]);
  const { transactions } = useContext(TransactionContext);
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#EEF0F2",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#EEF0F2",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(65, 103, 136, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(8, 14, 33, ${opacity})`,
  };

  useEffect(() => {
    if (transactions.length > 0) {
      setData(categoryDataBuilder(transactions));
    }
  }, [transactions]);

  return (
    <View style={styles.container}>
      {transactions.length > 0 && data && (
        <PieChart
          data={data}
          accessor={"amount"}
          backgroundColor={"transparent"}
          width={screenWidth - 5}
          height={170}
          chartConfig={chartConfig}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    width: "100%",
    alignItems: "center",
  },
});

export default CategoryChart;
