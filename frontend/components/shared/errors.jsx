import React from 'react';

export default function ErrorList ( {errors, errorType}) {
  if (errors === undefined) return null;
  const errorItems = errors.map(error =>
    <p className='error-message' key={error}>{errorType}{ error }</p>
  );

  return (
    <p>
      { errorItems }
    </p>
  );
}
