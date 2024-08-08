import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useApp} from '../../store/AppContext';

const Button = ({onPress, title}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
  const {transactions, balance, clearAll} = useApp();

  const renderTransactionItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <View style={styles.row}>
        <Button
          title={'Add Transaction'}
          onPress={() => navigation.navigate('Transaction')}
        />
        <Button
          title={'Add Beneficiary'}
          onPress={() => navigation.navigate('AddBeneficiary')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'View Beneficiaries'}
          onPress={() => navigation.navigate('Beneficiaries')}
        />
        <Button title={'Clear All'} onPress={clearAll} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
  },
  balanceText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    width: '50%',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
