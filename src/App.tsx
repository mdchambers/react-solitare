import React from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";
import Testbed from "./Test/Testbed";

import { CardSpec, gameStates, CardHandlerFunc } from "./constants";

function shuffle<T>(array: T[]): T[] {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState(gameStates.INITIAL);
  const [deck, setDeck] = useState<CardSpec[]>([]);
  const [waste, setWaste] = useState<CardSpec[]>([]);
  const [foundations, setFoundations] = useState<CardSpec[][]>([
    [],
    [],
    [],
    []
  ]);
  const [tableaus, setTableaus] = useState<CardSpec[][]>([]);

  const newGame = () => {
    // Generate all cards;
    const allCards = [];
    for (let suite = 0; suite <= 3; suite += 1) {
      for (let value = 1; value <= 12; value += 1) {
        allCards.push({
          suite: suite,
          value: value,
          visible: false
        });
      }
    }

    const shuffledCards = shuffle(allCards);

    // Place in tableaus
    const newTableaus = [];
    for (let i = 1; i <= 7; i += 1) {
      newTableaus.push(shuffledCards.splice(0, i));
    }

    // Set states
    setDeck(shuffledCards);
    setTableaus(newTableaus);
    setGameState(gameStates.RUNNING);
  };

  const randomCard = () => {
    // return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 12) + 1];
  };

  const reroll = () => {
    // console.log("reroll");
  };

  const addCard = () => {
    // // console.log("add card");
    // const newCards = [];
    // for (let i = 0; i < cards.length; i += 1) {
    //   newCards[i] = cards[i].slice();
    // }
    // newCards.push(randomCard());
    // // console.log(newCards);
    // setCards(newCards);
  };
  const reset = () => {
    // setCards(initialCards);
  };

  const setToFullSet = () => {
    // const fullCards = [];
    // for (let s = 0; s < 4; s += 1) {
    //   for (let v = 1; v <= 12; v += 1) {
    //     fullCards.push([s, v]);
    //   }
    // }
    // setCards(fullCards);
  };

  const populateTableau = () => {
    // return tableau;
  };

  const populateFoundations = () => {
    // return [[0, 1], [1, 1], [2, 1], [3, 1]];
  };

  const deckClickHandler = (
    event: any,
    suite: number,
    value: number,
    position: string
  ) => {
    console.log("deck clicked");
  };

  // const tableaus = populateTableau();
  // console.log(tableaus);
  // const foundations = populateFoundations();

  if (gameState === gameStates.INITIAL) {
    newGame();
  }

  return (
    <div className="App">
      <Header
        newGameHandler={newGame}
        rerollHandler={reroll}
        addHandler={addCard}
        resetHandler={reset}
        fullSetHandler={setToFullSet}
      />
      <Switch>
        <Route path="/test" render={props => <Testbed />} />
        <Route
          path="/"
          render={props => (
            <Board
              onDeckClick={deckClickHandler}
              deck_empty={deck.length === 0}
              waste={waste}
              foundations={foundations}
              tableaus={tableaus}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
