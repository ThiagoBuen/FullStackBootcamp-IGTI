import React from 'react';

export default function Candidates({ candidates }) {
  return (
    <div>
      {candidates.map(({ id, name, votes }) => {
        return (
          <p key={id}>
            {name} - {votes}
          </p>
        );
      })}
    </div>
  );
}
