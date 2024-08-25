import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StyledText from '../../components/shared/styledText';
import HappBarLayout from '../../components/home/HappBarLayout';
import HomeAppBar from '../../components/home/HomeAppBar';
import CategoryChart from '../../components/budgets/categoryChart';
import AddNewCard from '../../components/shared/addNewCard';
import { BudgetContext } from '../../context/budgetContext';
import BudgetList from '../../components/budgets/BudgetList';
import AddBudget from '../../components/budgets/addBudget';

const Budgets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { budgets, loading } = useContext(BudgetContext);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size='large' color='#416788' />
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <AddBudget
        isEditing={false}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <StatusBar style='light' translucent={true} />
      <SafeAreaView style={styles.container}>
        <HomeAppBar>
          <View style={styles.appBarContainer}>
            <HappBarLayout />
          </View>
        </HomeAppBar>
        <View style={styles.container} contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <StyledText type='title'>Top Categories</StyledText>
          </View>
          <CategoryChart />
          <View style={styles.titleContainer}>
            <StyledText type='title'>Your Budgets</StyledText>
          </View>
          <AddNewCard onPress={handleAddNew} toAdd='Budget' />
          <BudgetList budgets={budgets} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  appBarContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Budgets;
