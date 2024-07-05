import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

const data = [{}];

const Accounts = () => {
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({ item }) => <View></View>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Accounts;
