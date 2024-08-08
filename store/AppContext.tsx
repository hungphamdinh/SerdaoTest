import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem('transactions');
        const savedBeneficiaries = await AsyncStorage.getItem('beneficiaries');
        const savedBalance = await AsyncStorage.getItem('balance');

        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        if (savedBeneficiaries) setBeneficiaries(JSON.parse(savedBeneficiaries));
        if (savedBalance) setBalance(parseFloat(savedBalance));
      } catch (e) {
        console.error('Failed to load state:', e);
      }
    };

    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        await AsyncStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
        await AsyncStorage.setItem('balance', balance.toString());
      } catch (e) {
        console.error('Failed to save state:', e);
      }
    };

    saveState();
  }, [transactions, beneficiaries, balance]);

  const addTransaction = (amount, account) => {
    const newTransaction = { id: Date.now(), amount: parseFloat(amount), account };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setBalance((prevBalance) => prevBalance - parseFloat(amount));
  };

  const addBeneficiary = (beneficiary) => {
    setBeneficiaries((prevBeneficiaries) => [...prevBeneficiaries, beneficiary]);
  };

  return (
    <AppContext.Provider value={{ transactions, addTransaction, balance, beneficiaries, addBeneficiary }}>
      {children}
    </AppContext.Provider>
  );
};
