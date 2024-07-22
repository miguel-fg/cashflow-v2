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

  const chartConfig = {
    backgroundGradientFrom: "#EEF0F2",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#EEF0F2",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(65, 103, 136, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(8, 14, 33, ${opacity})`,
  };

  const formatYLabel = (value) => {
    const num = Number(value);
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "k";
    }

    return num.toFixed(1).toString();
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
          width={screenWidth - 5}
          height={170}
          chartConfig={chartConfig}
          bezier
          withHorizontalLines={true}
          withVerticalLines={false}
          formatYLabel={formatYLabel}
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
