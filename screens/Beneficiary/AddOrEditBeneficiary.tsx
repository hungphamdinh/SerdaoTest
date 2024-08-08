import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../store/AppContext';
import InputField from '../../component/form/InputField';
import { validateFields } from '../../utils';

const AddOrEditBeneficiary = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', iban: '' });
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { addBeneficiary } = useApp();

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validationSchema = {
    firstName: ['required'],
    lastName: ['required'],
    iban: ['required', 'iban'],
  };

  const handleSubmit = () => {
    const validationErrors = validateFields(form, validationSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const beneficiary = { id: Date.now(), ...form };
    addBeneficiary(beneficiary);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputField
        value={form.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
        placeholder="First Name"
        error={errors.firstName}
      />
      <InputField
        value={form.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
        placeholder="Last Name"
        error={errors.lastName}
      />
      <InputField
        value={form.iban}
        onChangeText={(value) => handleInputChange('iban', value)}
        placeholder="IBAN"
        error={errors.iban}
      />
      <Button title="Add Beneficiary" onPress={handleSubmit} />
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
});

export default AddOrEditBeneficiary;
