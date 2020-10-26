import React from 'react';

import css from './picture.module.css';

export default function Picture({ imageSrc, description }) {
  return (
    <div>
      <img
        className={css.picture}
        src={imageSrc}
        alt={description}
        title={description}
      />
    </div>
  );
}
