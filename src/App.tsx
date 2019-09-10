import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";
import Testbed from "./Test/Testbed";

import { CardSpec, gameStates, cardStates } from "./constants";

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

const suiteMap: string[] = ["clubs", "diamonds", "hearts", "spades"];
const valueMap: string[] = ["jack", "queen", "king"];

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

  const [selectedCard, setSelectedCard] = useState<CardSpec | null>(null);

  // Logging function
  useEffect(() => {
    let output;
    if (selectedCard) {
      output = `card of suite ${suiteMap[selectedCard.suite]} value ${
        selectedCard.value > 9
          ? valueMap[selectedCard.value - 10]
          : selectedCard.value
      } @ ${selectedCard.position} clicked`;
      // if (selectedCard.tableau || selectedCard.column) {
      output += ` col: ${selectedCard.tableau} pos: ${selectedCard.column}`;
      // }
    } else {
      output = "no card selected";
    }
    console.log(output);
  }, [selectedCard]);

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
    // Flip top cards
    newTableaus.forEach(t => {
      t[t.length - 1].visible = true;
    });

    // Set states
    setDeck(shuffledCards);
    setWaste([]);
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

  type C = { suite: number; value: number; position: string; opts?: any };
  const logCard = ({ suite, value, position, opts }: C): void => {
    let output = `card of suite ${suiteMap[suite]} value ${
      value > 9 ? valueMap[value - 10] : value
    } @ ${position} clicked`;
    if (opts) {
      output += ` col: ${opts.tableauID} pos: ${opts.columnID}`;
    }
    console.log(output);
  };

  const logSelectedCard = () => {
    let output;
    if (selectedCard) {
      output = `card of suite ${suiteMap[selectedCard.suite]} value ${
        selectedCard.value > 9
          ? valueMap[selectedCard.value - 10]
          : selectedCard.value
      } @ ${selectedCard.position} clicked`;
      if (selectedCard.tableau && selectedCard.column) {
        output += ` col: ${selectedCard.tableau} pos: ${selectedCard.column}`;
      }
    } else {
      output = "no card selected";
    }
    console.log(output);
  };

  const cardClickHandler = (
    event: any,
    suite: number,
    value: number,
    position: string,
    opts?: { tableauID: number; columnID: number }
  ): void => {
    // If a card is already selected:
    // Unselect if same card
    if (
      selectedCard &&
      selectedCard.suite === suite &&
      selectedCard.value === value
    ) {
      // console.log("unsetting card");
      setSelectedCard(null);
    } else {
      // Move selected card to position if move legal
      // If card is not selected:
      // Set clicked card as selected
      switch (position) {
        case cardStates.DECK:
          if (deck.length > 0) {
            const newDeck = deck.slice(0);
            const newWaste = waste.slice(0);
            const cardToMv = newDeck.pop();
            if (cardToMv) {
              cardToMv.visible = true;
              newWaste.unshift(cardToMv);
            }
            setDeck(newDeck);
            setWaste(newWaste);
          }
          break;
        case cardStates.WASTE:
          setSelectedCard({
            suite: suite,
            value: value,
            position: cardStates.WASTE
          });
          break;
        case cardStates.TABLEAU:
          if()
          setSelectedCard({
            suite: suite,
            value: value,
            position: cardStates.TABLEAU,
            tableau: opts ? opts.tableauID : 0,
            column: opts ? opts.columnID : 0
          });
          break;
        case cardStates.FOUNDATION:
          setSelectedCard({
            suite: suite,
            value: value,
            position: cardStates.FOUNDATION
          });
          break;
      }
    }

    // logCard({ suite, value, position, opts });
  };

  const cardDblClickHandler = (
    e: any,
    suite: number,
    value: number,
    position: string
  ): void => {};

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
              cardClickHandler={cardClickHandler}
              cardDblClickHandler={cardDblClickHandler}
              deck_empty={deck.length === 0}
              waste={waste}
              foundations={foundations}
              tableaus={tableaus}
              selectedCard={selectedCard}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
