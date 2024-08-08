import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useApp } from '../../store/AppContext';

const Beneficiaries = () => {
  const { beneficiaries } = useApp();

  const renderBeneficiaryItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Beneficiary: {item.firstName} {item.lastName}</Text>
      <Text style={styles.itemText}>IBAN: {item.iban}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={beneficiaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBeneficiaryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default Beneficiaries;
