import React from 'react';

export default function ErrorList ({ errors }) {
  if (errors === undefined) return null;

  const errorItems = errors.map(error, idx =>
    <li key={ idx }>{ error }</li>
  );

  return (
    <ul>
      { errorItems }
    </ul>
  );
}
