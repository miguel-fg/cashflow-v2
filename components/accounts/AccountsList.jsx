import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AccountCard from "./AccountCard";
import StyledText from "../shared/styledText";
import { initDB } from "../../db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    id: 1,
    name: "TD Unlimited Checking",
    currency: "CAD",
    type: "Visa",
    amount: 987.3,
    credit: 0,
  },
  {
    id: 2,
    name: "TD Every Day Savings",
    currency: "CAD",
    type: "Other",
    amount: 1578.27,
    credit: 0,
  },
  {
    id: 3,
    name: "Banamex Perfiles",
    currency: "MXN",
    type: "Mastercard",
    amount: 1243,
    credit: 0,
  },
  {
    id: 4,
    name: "TD Cash Back",
    currency: "CAD",
    type: "Visa",
    amount: 674.34,
    credit: 1,
  },
];

const AccountsList = (props) => {
  const filteredAccounts = data.filter((item) => item.credit === props.credit);
  return (
    <>
      <View>
        <FlatList
          data={filteredAccounts}
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

export default AccountsList;
