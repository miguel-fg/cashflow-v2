import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";
import AccountsList from "../../components/accounts/AccountsList";
import AddNewButton from "../../components/shared/addNewButton";
import AddAccount from "../../components/shared/addAccount";

const Accounts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AddAccount isVisible={isModalVisible} onClose={closeModal} />
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <StyledText type="header" variant="light">
              Accounts
            </StyledText>
          </View>
        </HomeAppBar>
        <View
          styles={styles.container}
          contentContainerStyle={styles.container}
        >
          <View style={styles.titleContainer}>
            <StyledText type="title">Banking</StyledText>
          </View>
          <AccountsList credit={0} />
          <View style={styles.titleContainer}>
            <StyledText type="title">Credit</StyledText>
          </View>
          <AccountsList credit={1} />
        </View>
        <View style={styles.bottomContainer}>
          <AddNewButton style={styles.buttonSize} onPress={handleAddNew} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F2",
  },
  appBarContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column-reverse",
    marginBottom: 10,
  },
  buttonSize: {
    width: "80%",
  },
});

export default Accounts;
