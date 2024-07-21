import React, { useContext, useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { TransactionContext } from "../../context/transactionContext";
import { AccountContext } from "../../context/accountsContext";
import { View, StyleSheet, Dimensions } from "react-native";
import { balanceDataBuilder } from "../../scripts/chartDataBuilder";

const BalanceChart = () => {
  const { transactions } = useContext(TransactionContext);
  const { selectedAccount } = useContext(AccountContext);
  const [data, setData] = useState({});
  const screenWidth = Dimensions.get("window").width;

  const dataOld = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(65, 103, 136, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#EEF0F2",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#EEF0F2",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(65, 103, 136, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    if (transactions.length > 0 && selectedAccount) {
      setData(balanceDataBuilder(transactions, selectedAccount.amount));
    }
  }, [transactions, selectedAccount]);

  return (
    <View style={styles.container}>
      {data.datasets && (
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={170}
          chartConfig={chartConfig}
          bezier
          withInnerLines={false}
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

export default BalanceChart;
