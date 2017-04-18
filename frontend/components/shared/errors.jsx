import React from 'react';

export default function ErrorList ( {errors}) {
  if (errors === undefined) return null;
  const errorItems = errors.map(error =>
    <li key={error}>{ error }</li>
  );

  return (
    <ul>
      { errorItems }
    </ul>
  );
}
