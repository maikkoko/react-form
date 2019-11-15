import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { getFormState } from '../reducer';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const Output = ({ validated, isSubmitting }) => {
  return (
    <div className="w-auto">
      {isSubmitting ? (
        <p>Mocking server submission...</p>
      ) : (
        <ReactJson src={validated} theme="monokai" style={{ width: '100%' }} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { validated, isSubmitting } = getFormState(state);

  return { validated, isSubmitting };
};

export default connect(mapStateToProps)(Output);
