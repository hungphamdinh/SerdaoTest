import React, {useState} from 'react';
import {View, Button, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useApp} from '../../store/AppContext';
import Picker from '../../component/Picker';
import InputField from '../../component/form/InputField';
import {validateFields} from '../../utils';

const TransactionScreen = ({navigation}) => {
  const [form, setForm] = useState({amount: '', name: '', iban: ''});
  const [errors, setErrors] = useState({});
  const [pickerVisible, setPickerVisible] = useState(false);
  const {addTransaction, beneficiaries} = useApp();

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value});
    setErrors({...errors, [name]: ''});
  };

  const validationSchema = {
    amount: ['required', 'numeric'],
    name: ['required'],
    iban: ['required', 'iban'],
  };

  const handleTransaction = () => {
    const validationErrors = validateFields(form, validationSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addTransaction(form.amount, {name: form.name, iban: form.iban});
    navigation.goBack();
  };

  const handleSelectBeneficiary = id => {
    const beneficiary = beneficiaries.find(b => b.id === id);
    if (beneficiary) {
      setForm({
        ...form,
        name: `${beneficiary.firstName} ${beneficiary.lastName}`,
        iban: beneficiary.iban,
      });
    }
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <InputField
        value={form.amount}
        onChangeText={value => handleInputChange('amount', value)}
        placeholder="Enter amount"
        error={errors.amount}
        keyboardType="number-pad"
      />
      <InputField
        value={form.name}
        onChangeText={value => handleInputChange('name', value)}
        placeholder="Recipient Name"
        error={errors.name}
      />
      <InputField
        value={form.iban}
        onChangeText={value => handleInputChange('iban', value)}
        placeholder="Recipient IBAN"
        error={errors.iban}
      />
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>Select Beneficiary</Text>
      </TouchableOpacity>
      <Button title="Submit Transaction" onPress={handleTransaction} />
      <Picker
        visible={pickerVisible}
        data={beneficiaries}
        onSelect={handleSelectBeneficiary}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
  },
});

export default TransactionScreen;
