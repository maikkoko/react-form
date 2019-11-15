import React from 'react';
import fetch from 'isomorphic-fetch';

import Form from '../components/Form';
import Output from '../components/Output';
import '../styles/index.css';

const Index = props => {
  const { data } = props;

  return (
    <div className="container mx-auto">
      <p className="text-2xl text-center mt-3 mb-4">Form</p>
      {!data || data.statusCode === 500 ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Holy smokes!</strong>
          <span className="block sm:inline pl-2">
            The form server returned an error
          </span>
          <p>Hit refresh to go back to previous page.</p>
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/2 p-2">
            <Form data={data} />
          </div>
          <div className="w-1/2 p-2">
            <Output />
          </div>
        </div>
      )}
    </div>
  );
};

Index.getInitialProps = async ({ store }) => {
  try {
    // Fetch data on server side to get around cors
    const result = await fetch(
      'https://ansible-template-engine.herokuapp.com/form'
    );

    const data = await result.json();

    return { store, data };
  } catch (error) {
    return {};
  }
};

export default Index;
