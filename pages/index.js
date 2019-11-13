import React from 'react';
import fetch from 'isomorphic-fetch';

import Form from '../components/Form';
import '../styles/index.css';

const Index = props => {
  const { data } = props;

  if (!data || data.statusCode === 500) {
    return (
      <div className="container mx-auto">
        <p>Oops! Something went wrong!</p>
        <p>Please refresh the poge.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex">
      <Form data={data} />
      <div>Hello</div>
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
