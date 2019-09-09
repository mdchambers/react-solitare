export interface CardSpec {
  suite: number;
  value: number;
  visible: boolean;
}

export const gameStates = {
  INITIAL: "initial",
  RUNNING: "running",
  ENDED: "ended"
};