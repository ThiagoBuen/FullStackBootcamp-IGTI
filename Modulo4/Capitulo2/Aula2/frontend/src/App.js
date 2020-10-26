import React, { Component } from 'react';
import Candidates from './components/Candidates';
import Header from './components/Header';
import Spinner from './components/Spinner';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
      previousVote: [],
      previousPercentage: [],
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const previousVote = this.state.candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          const previousPercentage = this.state.candidates.map(
            ({ id, percentage }) => {
              return { id, percentage };
            }
          );

          this.setState({
            candidates: json.candidates,
            previousVote,
            previousPercentage,
          });
        });
    }, 1000);
  }

  render() {
    const { candidates, previousVote, previousPercentage } = this.state;

    if (candidates.length === 0) {
      return <Spinner description="Carregando..." />;
    }
    return (
      <div className="container">
        <Header>Votação</Header>
        <Candidates
          candidates={candidates}
          previousV={previousVote}
          previousPercent={previousPercentage}
        />
      </div>
    );
  }
}
