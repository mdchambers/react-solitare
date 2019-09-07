# Solitare

A simple solitare game built with React hooks and Redux

## Component Structure

* App
  * Handles game state (win/lose conditions)
  * State
    * deck
      * Cards in draw deck
    * waste
      * Cards in waste deck
      * 
* Header
  * Info and controls
* Board
* Deck
  * onClick => deal
* Waste
  * onClick => Drag
* Tableau
  * Column
    * onClick => drag
    * onDrop => check if valid and update card state
* Foundations
  * onDrop => check if valid and update card state
* Card


## Development Steps

* Board
  * Set grid structure
  * Position elements
* Cards
  * Set type
  * Render
* Controls
  * Drag and Drop
    * Implement for tableaus first