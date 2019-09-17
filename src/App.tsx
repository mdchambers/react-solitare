import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Board from "./containers/Board/Board";
import Testbed from "./Test/Testbed";

import { CardSpec, gameStates, cardStates } from "./constants";

const DEBUG_FLAG = false;

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
      } @ ${selectedCard.location} visible: ${selectedCard.visible} clicked`;
      // if (selectedCard.tableau || selectedCard.column) {
      output += ` col: ${selectedCard.column} pos: ${selectedCard.position}`;
      // }
    } else {
      output = "no card selected";
    }
    console.log(output);
  }, [selectedCard]);

  const newDebugGame = (): void => {
    const tabSuites = [[0, 1], [0, 1]];
    const tabValues = [[1, 13], [1, 11]];
    const newTableaus: CardSpec[][] = [];
    for (let i = 0; i < tabSuites.length; i += 1) {
      newTableaus.push([]);
      for (let j = 0; j < tabSuites[i].length; j += 1) {
        newTableaus[i].push({
          suite: tabSuites[i][j],
          value: tabValues[i][j],
          visible: true
        });
      }
    }

    while (newTableaus.length < 7) {
      newTableaus.push([]);
    }

    const newDeck = [];
    for (let suite = 0; suite <= 3; suite += 1) {
      for (let value = 1; value <= 13; value += 1) {
        newDeck.push({
          suite: suite,
          value: value,
          visible: false
        });
      }
    }

    setDeck(newDeck);
    setWaste([]);
    setTableaus(newTableaus);
    setFoundations([[], [], [], []]);
    setGameState(gameStates.RUNNING);
    setSelectedCard(null);
  };

  const newGame = (): void => {
    if (DEBUG_FLAG) {
      newDebugGame();
      return;
    } else {
      // Generate all cards;
      const allCards = [];
      for (let suite = 0; suite <= 3; suite += 1) {
        for (let value = 1; value <= 13; value += 1) {
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
      setFoundations([[], [], [], []]);
      setGameState(gameStates.RUNNING);
      setSelectedCard(null);
    }
  };

  const cardClickHandler = (card: CardSpec | null): void => {
    // console.log("card clicked");
    // console.log(card);
    // If a card is already selected:
    // Unselect if same card
    // console.log(card);
    if (
      selectedCard &&
      card &&
      selectedCard.suite === card.suite &&
      selectedCard.value === card.value &&
      card.location !== cardStates.DECK
    ) {
      // console.log("unsetting card");
      setSelectedCard(null);
    } else {
      // Move selected card to position if move legal
      // If card is not selected:
      // Set clicked card as selected
      if (card) {
        switch (card.location) {
          // Draw new card from deck
          case cardStates.DECK:
            // console.log("deck click");
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
            setSelectedCard(card);
            break;
          // Move card (and daughters) if valid
          // Otherwise select new card
          case cardStates.TABLEAU:
            // IF top card and not flipped, flip on click
            if (
              card.column !== undefined &&
              !card.visible &&
              card.position === tableaus[card.column].length - 1
            ) {
              flipCard(card.column);
            }

            // If prev card selected and move is valid, move card (stack)
            else if (selectedCard && validMove(selectedCard, card)) {
              moveCard(selectedCard, card);
              // Otherwise set card as selected
            } else {
              setSelectedCard({ ...card });
            }
            break;
          // Move to empty tableau
          case cardStates.TABLEAU_BASE:
            if (selectedCard) {
              moveCard(selectedCard, card);
            }
            break;
          // Move prev selected card to foundation if selected and valid
          // Otherwise, select foundation card
          case cardStates.FOUNDATION:
            setSelectedCard({
              suite: card.suite,
              value: card.value,
              visible: card.visible,
              location: cardStates.FOUNDATION
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
      (target.value === 1 && source.value === 13);
    let targetPositionValid = true;
    if (
      target.location === cardStates.TABLEAU &&
      target.column &&
      target.column
    ) {
      if (target.column !== tableaus[target.column].length - 1) {
        targetPositionValid = false;
      }
    }

    return suiteValid && valueValid && targetPositionValid;
  };

  const moveCard = (source: CardSpec, target: CardSpec): void => {
    // tableau to tableau move
    if (
      source.location === cardStates.TABLEAU &&
      target.location === cardStates.TABLEAU &&
      source.column !== undefined &&
      source.column !== undefined &&
      target.column !== undefined &&
      target.column !== undefined
    ) {
      // console.log("moving card");
      let newSourceTableau = tableaus[source.column].splice(0);
      let newTargetTableau = tableaus[target.column].splice(0);

      let cardsToMove = newSourceTableau.splice(source.column);
      newTargetTableau = newTargetTableau.concat(cardsToMove);

      // console.log(`Soruce: ${newSourceTableau}`);
      // console.log(`Target: ${newTargetTableau}`);

      let newTableaus = tableaus.splice(0);
      newTableaus[source.column] = newSourceTableau;
      newTableaus[target.column] = newTargetTableau;

      setTableaus(newTableaus);
    }
    // waste to tableau move
    if (
      source.location === cardStates.WASTE &&
      target.location === cardStates.TABLEAU &&
      target.column !== undefined &&
      target.column !== undefined
    ) {
      // console.log("moving card");
      let newWaste = waste.splice(0);
      let newTargetTableau = tableaus[target.column].splice(0);

      let cardsToMove = newWaste.shift();
      if (cardsToMove) {
        newTargetTableau.push(cardsToMove);
      }

      let newTableaus = tableaus.splice(0);
      newTableaus[target.column] = newTargetTableau;

      setWaste(newWaste);
      setTableaus(newTableaus);
      setSelectedCard(null);
    }

    // Move to empty foundation
    if (
      target.column !== undefined &&
      target.location === cardStates.TABLEAU_BASE
    ) {
      // console.log("moving to empty tableau");
      // console.log(source);
      // console.log(target);
      if (source.value === 13 && source.visible) {
        // Move to empty tableau
        // console.log("move valid");
        if (source.column !== undefined && source.column !== undefined) {
          let newSourceTableau = tableaus[source.column].splice(0);
          let cardsToMv = newSourceTableau.splice(source.column);

          let newTableaus = tableaus.splice(0);

          newTableaus[source.column] = newSourceTableau;
          newTableaus[target.column] = cardsToMv;
          // console.log(
          //   `Moving ${cardsToMv.length} cards from tableau ${source.tableau} to tableau ${target.tableau}`
          // );
          setTableaus(newTableaus);
          setSelectedCard(null);
        }
        if (source.location === cardStates.WASTE) {
          // console.log("moving card from waste");
          let newWaste = waste.splice(0);
          let newTargetTableau = tableaus[target.column].splice(0);

          let cardsToMove = newWaste.shift();
          if (cardsToMove) {
            newTargetTableau.push(cardsToMove);
          }

          let newTableaus = tableaus.splice(0);
          newTableaus[target.column] = newTargetTableau;

          setWaste(newWaste);
          setTableaus(newTableaus);
          setSelectedCard(null);
        }
      }
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
    if (card && card.column !== undefined) {
      // Check if bottom of column
      if (card.column === tableaus[card.column].length - 1) {
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
            newTableaus[card.column].pop();

            setFoundations(newFoundations);
            setTableaus(newTableaus);
          }
        }
      }
    }
    // Move from waste if possible
    if (card && card.location === cardStates.WASTE) {
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

  const cardDropHandler = (item: any, targetID: number) => {
    console.log("card dropped");
    console.log(item);
    console.log(targetID);

    const targetCard = tableaus[targetID][tableaus[targetID].length - 1];
    if (validMove(item, targetCard)) {
      console.log("valid");
      moveCard(item, targetCard);
    } else {
      console.log("invalid");
    }
  };

  const deckReloadHandler = () => {
    const newDeck = waste.splice(0);
    setDeck(newDeck);
    setWaste([]);
  };

  if (gameState === gameStates.INITIAL) {
    newGame();
  }

  return (
    <div className="App">
      <Header newGameHandler={newGame} />
      <Switch>
        <Route path="/test" render={props => <Testbed />} />
        <Route
          path="/"
          render={props => (
            <Board
              cardClickHandler={cardClickHandler}
              cardDblClickHandler={cardDblClickHandler}
              cardDropHandler={cardDropHandler}
              deckReloadHandler={deckReloadHandler}
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
