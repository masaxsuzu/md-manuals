import { CardStatus } from "./CardStatus-model";

export interface Action {
  run(cards: CardStatus[]): string;
}
