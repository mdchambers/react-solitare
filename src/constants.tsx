export interface CardSpec {
  suite: number;
  value: number;
  visible?: boolean;
  position?: string;
  tableau?: number;
  column?: number;
}

export interface CardHandlerFunc {
  (
    event: any,
    suite: number,
    value: number,
    position: string,
    opts?: { tableauID: number; columnID: number }
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
