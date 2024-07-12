import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";
import AccountsList from "../../components/accounts/AccountsList";
import AddNewButton from "../../components/shared/addNewButton";
import AddAccount from "../../components/shared/addAccount";
import { initDB } from "../../db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Accounts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fetchFlag, setFetchFlag] = useState(false);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFetchFlag((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          const user = JSON.parse(userData);
          const db = await initDB();
          const result = await db.getFirstAsync(
            "SELECT * FROM users WHERE username = ?",
            [user.name],
          );

          if (result) {
            setUserId(result.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user ID from database. ", error);
      }
    };

    fetchUserId();
  }, []);

  if (userId === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#416788" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <AddAccount
        userId={userId}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
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
          <AccountsList userId={userId} credit={0} fetchFlag={fetchFlag} />
          <View style={styles.titleContainer}>
            <StyledText type="title">Credit</StyledText>
          </View>
          <AccountsList userId={userId} credit={1} fetchFlag={fetchFlag} />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
