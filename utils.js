export const validateIban = iban => {
  // IBAN validation logic
  const ibanRegex = /^[A-Z0-9]{15,34}$/;
  return ibanRegex.test(iban);
};

const validationRules = {
  required: value => (value ? null : 'This field is required'),
  iban: value => (validateIban(value) ? null : 'Invalid IBAN'),
  numeric: value => (!isNaN(value) ? null : 'Must be a number'),
};

export const validateFields = (fields, schema) => {
  const errors = {};
  Object.keys(schema).forEach(field => {
    const formFieldValue = fields[field];
    const fieldRules = schema[field];
    fieldRules.forEach(rule => {
      const error = validationRules[rule](formFieldValue);
      if (error) {
        errors[field] = error;
        return;
      }
    });
  });
  return errors;
};
