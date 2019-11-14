import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormState, setFormField, validateForm } from '../reducer';

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
    return data.map(field => {
      // Radio
      if (field.type === 'radio') {
        return (
          <div key={field.label}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <div className="flex radio-option">
              {field.value.map(option => {
                return (
                  <div key={option} className="mr-2">
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
          <div key={field.label}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formState[field.label] || ''}
              onChange={e => setFormField(field.label, e.target.value)}
            >
              {field.value.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      }

      // Text/Email, etc
      return (
        <div key={field.label || field.type}>
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
    <form
      onSubmit={e => {
        e.preventDefault();
        validate({ formState, source: data });
      }}
      className="w-auto"
    >
      {renderFormFields()}
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded"
      >
        Submit
      </button>
    </form>
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
