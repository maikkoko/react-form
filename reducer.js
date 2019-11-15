import { namespaceConfig } from 'fast-redux';
import { validateEmail, validateContactNumber } from './helpers';

// FormState

const DEFAULT_STATE = {
  formState: {},
  validated: [],
  isSubmitting: false,
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

const validateInit = formAction('VALIDATE_INIT', state => ({
  ...state,
  isSubmitting: true,
  validated: [],
}));

const validateSuccess = formAction('VALIDATE_SUCCESS', (state, validated) => ({
  ...state,
  validated,
  isSubmitting: false,
}));

export const validateForm = ({ formState, source }) => async dispatch => {
  dispatch(validateInit());

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

  // wait 1 second to mock async request
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  dispatch(validateSuccess(validated));
};
