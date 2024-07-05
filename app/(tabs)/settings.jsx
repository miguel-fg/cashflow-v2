import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import HomeAppBar from "../../components/home/HomeAppBar";
import StyledText from "../../components/shared/styledText";
import TextButton from "../../components/shared/textButton";
import { initDB } from "../../db/database.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const { name } = JSON.parse(storedUser);
        const db = await initDB();
        const userDetails = await db.getFirstAsync(
          "SELECT * FROM users WHERE username = ?",
          [name],
        );
        console.log(userDetails);
        setUser(userDetails);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.reset({ index: 0, routes: [{ name: "welcome" }] });
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: handleLogout,
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <StyledText type="header" variant="light">
              Settings
            </StyledText>
          </View>
        </HomeAppBar>
        <View style={styles.container} contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <StyledText type="title">Personal Info</StyledText>
            <View style={styles.userInfoContainer}>
              <View style={styles.infoTitles}>
                <StyledText type="text" weight="medium">
                  Username
                </StyledText>
                <StyledText type="text" weight="medium">
                  Email
                </StyledText>
              </View>
              <View style={styles.infoValues}>
                {user && (
                  <>
                    <StyledText type="text">{user.username}</StyledText>
                    <StyledText type="text">{user.email}</StyledText>
                  </>
                )}
              </View>
            </View>
            <TextButton
              variant="danger"
              style={styles.buttonSize}
              onPress={confirmLogout}
            >
              LOGOUT
            </TextButton>
          </View>
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
  buttonSize: {
    width: "80%",
    marginBottom: 5,
  },
  userInfoContainer: {
    flex: -1,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 80,
    width: "100%",
    justifyContent: "space-between",
  },
  infoTitles: {
    marginLeft: 20,
  },
  infoValues: {
    flex: -1,
    alignItems: "flex-end",
    marginRight: 20,
  },
});

export default Settings;
