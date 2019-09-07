import React from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";
import Testbed from "./Test/Testbed";

const App: React.FC = () => {
  const [deck, setDeck] = useState();
  const [waste, setWaste] = useState();
  const [foundations, setFoundations] = useState();
  const [tableaus, setTableaus] = useState();

  const newGame = () => {};
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

  // const tableaus = populateTableau();
  // console.log(tableaus);
  // const foundations = populateFoundations();

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
              deck_empty={deck.length === 0}
              waste_top={waste}
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
