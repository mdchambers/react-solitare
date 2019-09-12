export interface CardSpec {
  suite: number;
  value: number;
  visible?: boolean;
  position?: string;
  tableau?: number;
  column?: number;
}

export interface CardHandlerFunc {
  (card: CardSpec | null): void;
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
  TABLEAU: "tableau",
  TABLEAU_BASE: "tableau_base"
};
