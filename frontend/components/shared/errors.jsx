import React from 'react';

export default function ErrorList ( {errors}) {
  if (errors === undefined) return null;
  const errorItems = errors.map(error =>
    <span key={error}>{ error }</span>
  );

  return (
    <p>
      { errorItems }
    </p>
  );
}
