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

  return (
    <div className="App">
      <p>{cards.length}</p>
      <Header
        rerollHandler={reroll}
        addHandler={addCard}
        resetHandler={reset}
        fullSetHandler={setToFullSet}
      />
      <Board cards={cards} />
    </div>
  );
};

export default App;
