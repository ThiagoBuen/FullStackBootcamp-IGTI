import React from 'react';
import Candidate from './Candidate';
import Card from './Card';
import FlipMove from 'react-flip-move';

export default function Candidates({ candidates, previousV, previousPercent }) {
  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;

          const previousVoteObject = previousV.find((item) => item.id === id);

          const previousPercentageObject = previousPercent.find(
            (item) => item.id === id
          );

          const previousVote = !!previousVoteObject
            ? previousVoteObject.vote
            : 0;

          const previousPercentage = !!previousPercentageObject
            ? previousPercentageObject.percentage
            : 0;
          return (
            <div key={id}>
              <Card>
                <Candidate
                  previousVotes={previousVote}
                  previousPercentage={previousPercentage}
                  candidate={candidate}
                  position={index + 1}
                />
              </Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
