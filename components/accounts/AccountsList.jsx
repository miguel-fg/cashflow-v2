import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AccountCard from "./AccountCard";
import { initDB } from "../../db/database";

const AccountsList = (props) => {
  const { userId, credit, fetchFlag } = props;
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const db = await initDB();
        const result = await db.getAllAsync(
          "SELECT * FROM accounts WHERE user_id = ? AND credit = ?",
          [userId, credit],
        );

        if (result.length > 0) {
          setAccounts(result);
        }
      } catch (error) {
        console.error("Failed to fetch accounts ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [fetchFlag]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#416788" />
      </View>
    );
  }

  if (accounts.length === 0) {
    return <></>;
  }

  return (
    <>
      <View>
        <FlatList
          data={accounts}
          renderItem={({ item }) => (
            <AccountCard
              key={item.id}
              name={item.name}
              currency={item.currency}
              type={item.type}
              amount={item.amount}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
  },
});

export default AccountsList;
