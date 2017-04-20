import React from 'react';

export default function ErrorList ( {errors}) {
  if (errors === undefined) return null;
  const errorItems = errors.map(error =>
    <p className='error-message' key={error}>{ error }</p>
  );

  return (
    <p>
      { errorItems }
    </p>
  );
}
