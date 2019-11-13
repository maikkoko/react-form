import React from 'react';
import fetch from 'isomorphic-fetch';

import '../styles/index.css';

const Index = props => {
  const { data } = props;

  const renderFormField = () => {
    if (!data || data.statusCode === 500) {
      return (
        <div className="container mx-auto">
          <p>Oops! Something went wrong</p>
          <p>Please refresh the poge.</p>
        </div>
      );
    }

    return data.map(field => {
      if (field.type === 'radio') {
        return (
          <div>
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
      } else if (field.type === 'select') {
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <select
              value={field.default}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {field.value.map(option => (
                <option>{option}</option>
              ))}
            </select>
          </div>
        );
      }

      return (
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={field.type}
            value={field.value}
          />
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto">
      <form>{renderFormField()}</form>
    </div>
  );
};

Index.getInitialProps = async () => {
  try {
    const result = await fetch(
      'https://ansible-template-engine.herokuapp.com/form'
    );

    const data = await result.json();

    return { data };
  } catch (error) {
    return {};
  }
};

export default Index;
