import { namespaceConfig } from 'fast-redux';

const DEFAULT_STATE = {};

const { action: formAction, getState: getFormState } = namespaceConfig(
  'form',
  DEFAULT_STATE
);

export { getFormState };

export const setFormField = formAction(
  'SET_FORM_FIELD',
  (state, key, value) => {
    return {
      ...state,
      [key]: value,
    };
  }
);
