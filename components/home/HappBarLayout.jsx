import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import StyledText from "../shared/styledText";

const HappBarLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Personal')
  const [dropdownTop, setDropdownTop] = useState(0)
  const dropdownRef = useRef(null)

  const data = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' },
    { label: 'Savings', value: 'savings' },
  ]

  const handleSelect = (item) => {
    setSelectedItem(item.label)
    setIsOpen(false)
  }

  const showDropdown = () => {
    dropdownRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownTop(py + 5)
      setIsOpen(!isOpen)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={dropdownRef} style={styles.dropDown} onPress={showDropdown}>
        <Image
          source={require('../../assets/images/icons/wallet.png')}
          style={{ width: 20, height: 20, marginRight: 5 }}
        />
        <StyledText type='text'>{selectedItem}</StyledText>
        {isOpen ? (
          <Ionicons name='chevron-up' size={16} color='#080E21' style={{ marginLeft: 10 }} />
        ) : (<Ionicons name='chevron-down' size={16} color='#080E21' style={{ marginLeft: 10 }} />)}
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownList, { top: dropdownTop }]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                <StyledText type='text'>{item.label}</StyledText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <StyledText type='header' variant='light'>$8,320.00</StyledText>
      <View style={styles.accountData}>
        <View style={styles.dataContainer}>
          <Ionicons name='chevron-up-circle' size={25} color='#62A87C' />
          <View style={styles.income}>
            <StyledText type='label' variant='light'>Income</StyledText>
            <StyledText type='text' variant='light' weight='medium'>$12,572.00</StyledText>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.expenses}>
            <StyledText type='label' variant='light'>Expenses</StyledText>
            <StyledText type='text' variant='light' weight='medium'>$4,252.00</StyledText>
          </View>
          <Ionicons name='chevron-down-circle' size={25} color='#FE616F' />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  dropDown: {
    flex: -1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    backgroundColor: '#EEF0F2',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    zIndex: 2,
  },
  dropdownList: {
    backgroundColor: '#EEF0F2',
    borderRadius: 5,
    paddingHorizontal: 5,
    position: 'absolute',
    zIndex: 1,
    // shadow for iOS 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation for Android
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  accountData: {
    flex: -1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 25,
  },
  dataContainer: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  income: {
    marginLeft: 5,
  },
  expenses: {
    flex: -1,
    alignItems: 'flex-end',
    marginRight: 5,
  }
});


export default HappBarLayout
