export interface CardSpec {
  suite: number;
  value: number;
  visible: boolean;
}

export interface CardHandlerFunc {
  (
    event: any,
    suite: number,
    value: number,
    position: string,
    opts?: Object
  ): void;
}

export const gameStates = {
  INITIAL: "initial",
  RUNNING: "running",
  ENDED: "ended"
};

export const cardStates = {
  DECK: "deck",
  WASTE: "waste",
  FOUNDATION: "foundation",
  TABLEAU: "tableau"
};
