import { namespaceConfig } from 'fast-redux';
import { validateEmail, validateContactNumber } from './helpers';

// FormState

const DEFAULT_STATE = {
  formState: {},
  validated: [],
};

const { action: formAction, getState: getFormState } = namespaceConfig(
  'state',
  DEFAULT_STATE
);

export { getFormState };

export const setFormField = formAction(
  'SET_FORM_FIELD',
  (state, key, value) => {
    return {
      ...state,
      formState: { ...state.formState, [key]: value },
    };
  }
);

export const validateForm = formAction(
  'VALIDATE_FORM',
  (state, { formState, source }) => {
    let validated = [];

    source.forEach(field => {
      const key = field.label || field.type;
      let isValid = true;

      if (!field.isOptional) {
        isValid = !(!formState[key] || formState[key].length === 0);
      }

      if (field.type === 'email') {
        isValid = validateEmail(formState[key]);
      }

      if (field.type === 'telephone') {
        isValid = validateContactNumber(formState[key]);
      }

      validated.push({
        isValid,
        label: key,
        value: formState[key],
      });
    });

    return {
      ...state,
      validated,
    };
  }
);
