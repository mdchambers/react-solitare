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
    setSelectedCard(null);
  };

  const randomCard = () => {
    // return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 12) + 1];
  };

  const reroll = () => {
    newGame();
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

  const cardClickHandler = (card: CardSpec | null): void => {
    // console.log("card clicked");
    // If a card is already selected:
    // Unselect if same card
    // console.log(card);
    if (
      selectedCard &&
      card &&
      selectedCard.suite === card.suite &&
      selectedCard.value === card.value &&
      card.position !== cardStates.DECK
    ) {
      // console.log("unsetting card");
      setSelectedCard(null);
    } else {
      // Move selected card to position if move legal
      // If card is not selected:
      // Set clicked card as selected
      if (card) {
        switch (card.position) {
          // Draw new card from deck
          case cardStates.DECK:
            console.log("deck click");
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
          // Set waste card as selected
          case cardStates.WASTE:
            setSelectedCard({
              suite: card.suite,
              value: card.value,
              position: cardStates.WASTE
            });
            break;
          // Move card (and daughters) if valid
          // Otherwise select new card
          case cardStates.TABLEAU:
            // IF top card and not flipped, flip on click
            if (
              card.tableau &&
              !card.visible &&
              card.column === tableaus[card.tableau].length - 1
            ) {
              flipCard(card.tableau);
            }

            // If prev card selected and move is valid, move card (stack)
            else if (selectedCard && validMove(selectedCard, card)) {
              moveCard(selectedCard, card);
              // Otherwise set card as selected
            } else {
              setSelectedCard({
                suite: card.suite,
                value: card.value,
                position: cardStates.TABLEAU,
                tableau: card.tableau,
                column: card.column
              });
            }
            break;
          // Move prev selected card to foundation if selected and valid
          // Otherwise, select foundation card
          case cardStates.FOUNDATION:
            setSelectedCard({
              suite: card.suite,
              value: card.value,
              position: cardStates.FOUNDATION
            });
            break;
        }
      }
    }

    // logCard({ suite, value, position, opts });
  };

  const validMove = (source: CardSpec, target: CardSpec): boolean => {
    let suiteValid =
      ((source.suite === 0 || source.suite === 3) &&
        (target.suite === 1 || target.suite === 2)) ||
      ((source.suite === 1 || source.suite === 2) &&
        (target.suite === 0 || target.suite === 3));
    let valueValid =
      target.value - 1 === source.value ||
      (target.value === 1 && source.value === 12);
    let targetPositionValid = true;
    if (
      target.position === cardStates.TABLEAU &&
      target.tableau &&
      target.column
    ) {
      if (target.column !== tableaus[target.tableau].length - 1) {
        targetPositionValid = false;
      }
    }
    console.log(
      `Valid move: ${suiteValid && valueValid && targetPositionValid}`
    );
    return suiteValid && valueValid && targetPositionValid;
  };

  const moveCard = (source: CardSpec, target: CardSpec): void => {
    // tableau to tableau move
    if (
      source.position === cardStates.TABLEAU &&
      target.position === cardStates.TABLEAU &&
      source.tableau !== undefined &&
      source.column !== undefined &&
      target.tableau !== undefined &&
      target.column !== undefined
    ) {
      console.log("moving card");
      let newSourceTableau = tableaus[source.tableau].splice(0);
      let newTargetTableau = tableaus[target.tableau].splice(0);

      let cardsToMove = newSourceTableau.splice(source.column);
      newTargetTableau = newTargetTableau.concat(cardsToMove);

      console.log(`Soruce: ${newSourceTableau}`);
      console.log(`Target: ${newTargetTableau}`);

      let newTableaus = tableaus.splice(0);
      newTableaus[source.tableau] = newSourceTableau;
      newTableaus[target.tableau] = newTargetTableau;

      setTableaus(newTableaus);
    }
    // waste to tableau move
    if (
      source.position === cardStates.WASTE &&
      target.position === cardStates.TABLEAU &&
      target.tableau !== undefined &&
      target.column !== undefined
    ) {
      console.log("moving card");
      let newWaste = waste.splice(0);
      let newTargetTableau = tableaus[target.tableau].splice(0);

      let cardsToMove = newWaste.shift();
      if (cardsToMove) {
        newTargetTableau.push(cardsToMove);
      }

      let newTableaus = tableaus.splice(0);
      newTableaus[target.tableau] = newTargetTableau;

      setWaste(newWaste);
      setTableaus(newTableaus);
      setSelectedCard(null);
    }
  };

  const flipCard = (tableau: number): void => {
    const newColumn = tableaus[tableau].splice(0);
    newColumn[newColumn.length - 1].visible = true;
    const newTableaus = tableaus.splice(0);

    newTableaus[tableau] = newColumn;
    // console.log(newColumn);
    // console.log(newTableaus);
    setTableaus(newTableaus);
  };

  const cardDblClickHandler = (card: CardSpec | null) => {
    console.log(`dbl click ${card}`);
    // Move to foundation if possible
    if (card && card.tableau !== undefined) {
      // Check if bottom of tableau
      if (card.column === tableaus[card.tableau].length - 1) {
        for (let i = 0; i < foundations.length; i += 1) {
          // If empty foundation and card is ace
          if (
            (card.value === 1 && foundations[i].length === 0) ||
            (foundations[i].length > 0 &&
              card.suite === foundations[i][0].suite &&
              card.value - 1 ===
                foundations[i][foundations[i].length - 1].value)
          ) {
            const newFoundations = foundations.splice(0);
            newFoundations[i].push(card);

            const newTableaus = tableaus.splice(0);
            newTableaus[card.tableau].pop();

            setFoundations(newFoundations);
            setTableaus(newTableaus);
          }
        }
      }
    }
    // Move from waste if possible
    if (card && card.position === cardStates.WASTE) {
      for (let i = 0; i < foundations.length; i += 1) {
        // If empty foundation and card is ace
        if (
          (card.value === 1 && foundations[i].length === 0) ||
          (foundations[i].length > 0 &&
            card.suite === foundations[i][0].suite &&
            card.value - 1 === foundations[i][foundations[i].length - 1].value)
        ) {
          const newFoundations = foundations.splice(0);
          newFoundations[i].push(card);

          const newWaste = waste.splice(0);
          newWaste.shift();

          setFoundations(newFoundations);
          setWaste(newWaste);
          setSelectedCard(null);
        }
      }
    }
  };

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
