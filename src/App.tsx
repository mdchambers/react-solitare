import React from "react";
import { useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";

const initialCards = [[0, 5], [1, 6]];

const App: React.FC = () => {
  const [cards, setCards] = useState(initialCards);

  const randomCard = () => {
    return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 12) + 1];
  };

  const reroll = () => {
    console.log("reroll");
  };
  const addCard = () => {
    // console.log("add card");
    const newCards = [];
    for (let i = 0; i < cards.length; i += 1) {
      newCards[i] = cards[i].slice();
    }
    newCards.push(randomCard());
    // console.log(newCards);
    setCards(newCards);
  };
  const reset = () => {
    setCards(initialCards);
  };

  const setToFullSet = () => {
    const fullCards = [];
    for (let s = 0; s < 4; s += 1) {
      for (let v = 1; v <= 12; v += 1) {
        fullCards.push([s, v]);
      }
    }
    setCards(fullCards);
  };

  const populateTableau = () => {
    const tableau = [];
    for (let i = 1; i <= 7; i += 1) {
      const column = [];
      for (let j = 1; j <= i; j += 1) {
        column.push([i % 4, j]);
      }
      tableau.push(column);
    }
    return tableau;
  };

  const populateFoundations = () => {
    return [[0, 1], [1, 1], [2, 1], [3, 1]];
  };

  const tableaus = populateTableau();
  console.log(tableaus);
  const foundations = populateFoundations();

  return (
    <div className="App">
      <Header
        rerollHandler={reroll}
        addHandler={addCard}
        resetHandler={reset}
        fullSetHandler={setToFullSet}
      />
      <Board
        deck_empty={false}
        waste_top={[1, 1]}
        foundations={foundations}
        tableaus={tableaus}
        // tableaus={[[1, 1], [1, 1]]}
      />
    </div>
  );
};

export default App;
