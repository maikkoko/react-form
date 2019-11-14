import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { getFormState } from '../reducer';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const Output = ({ validated }) => {
  return (
    <div className="w-auto">
      <ReactJson src={validated} theme="monokai" style={{ width: '100%' }} />
    </div>
  );
};

const mapStateToProps = state => {
  const { validated } = getFormState(state);

  return { validated };
};

export default connect(mapStateToProps)(Output);
