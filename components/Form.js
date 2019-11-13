import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormState, setFormField, validateForm } from '../reducer';

const DATa = [
  { label: 'Email address', type: 'email', isOptional: false, isHidden: false },
  {
    label: 'Gender',
    type: 'radio',
    value: ['M (Male)', 'F (Female)', 'X (Indeterminate/Intersex/Unspecified)'],
    isOptional: true,
  },
  {
    label: 'State',
    type: 'select',
    value: ['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'NT', 'ACT'],
    default: 'ACT',
  },
  { label: 'Contact number', type: 'telephone' },
  { type: 'hidden', value: 1573680446850, isHidden: true },
];

const Form = ({ data, formState, setFormField, validate }) => {
  useEffect(() => {
    // Set initial form state
    data.forEach(field => {
      if (field.isHidden) {
        setFormField('hidden', field.value);
      } else {
        setFormField(field.label || field.type, field.default || '');
      }
    });
  }, []);

  const renderFormFields = () => {
    return data.map((field, index) => {
      // Radio
      if (field.type === 'radio') {
        return (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <div className="flex radio-option">
              {field.value.map(option => {
                return (
                  <div className="mr-2">
                    <input
                      type={field.type}
                      name={field.label}
                      value={option}
                      checked={formState[field.label] === option}
                      onChange={e => setFormField(field.label, option)}
                    />
                    <span className="ml-2">{option}</span>
                  </div>
                );
              })}

              <style jsx>
                {`
                  .radio-option: {
                    align-items: center;
                  }
                `}
              </style>
            </div>
          </div>
        );
      }

      // Select
      if (field.type === 'select') {
        return (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formState[field.label] || ''}
              onChange={e => setFormField(field.label, e.target.value)}
            >
              {field.value.map(option => (
                <option>{option}</option>
              ))}
            </select>
          </div>
        );
      }

      // Text/Email, etc
      return (
        <div key={index}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={field.type}
            value={formState[field.label] || ''}
            onChange={e =>
              setFormField(field.label || field.type, e.target.value)
            }
          />
        </div>
      );
    });
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          validate({ formState, source: data });
        }}
      >
        {renderFormFields()}
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  const { formState } = getFormState(state);
  return { formState };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFormField,
      validate: validateForm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form);
