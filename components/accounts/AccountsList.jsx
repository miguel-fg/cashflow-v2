import React from "react";
import { View, FlatList } from "react-native";
import AccountCard from "./AccountCard";

const AccountsList = (props) => {
  const { accounts } = props;

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
              accountId={item.id}
              name={item.name}
              currency={item.currency}
              type={item.type}
              amount={item.amount}
              credit={item.credit}
            />
          )}
        />
      </View>
    </>
  );
};

export default AccountsList;
