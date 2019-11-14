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
      <div className="flex">
        {!data || data.statusCode === 500 ? (
          <>
            <p>Oops! Something went wrong!</p>
            <p>Please refresh the page.</p>
          </>
        ) : (
          <>
            <Form data={data} />
            <Output />
          </>
        )}
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ store }) => {
  try {
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
