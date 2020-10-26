import React from 'react';
import Info from './Info';
import Name from './Name';
import Percentage from './Percentage';
import Picture from './Picture';
import Popularity from './Popularity';
import Position from './Position';
import Votes from './Votes';

import css from './candidate.module.css';

export default function Candidate({
  previousVotes,
  candidate,
  position,
  previousPercentage,
}) {
  const { id, name, votes, percentage, popularity } = candidate;
  const imageSource = `${id}.jpg`;
  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imageSrc={imageSource} description={name}></Picture>
      <Info>
        <Name>{name}</Name>
        <Votes value={votes} previous={previousVotes} />
        <Percentage value={percentage} previous={previousPercentage} />
        <Popularity value={popularity}></Popularity>
      </Info>
    </div>
  );
}
