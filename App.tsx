import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import TransactionScreen from './screens/Transaction/TransactionScreen';
import { AppProvider } from './store/AppContext';
import AddOrEditBeneficiary from './screens/Beneficiary/AddOrEditBeneficiary';
import Beneficiaries from './screens/Beneficiary/Beneficiaries';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Transaction" component={TransactionScreen} />
          <Stack.Screen name="AddOrEditBeneficiary" component={AddOrEditBeneficiary} />
          <Stack.Screen name="Beneficiaries" component={Beneficiaries} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
