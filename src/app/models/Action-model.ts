import { CardStatus } from "./CardStatus-model";
import { Location } from "./Location-model";

export interface Action {
  run(cards: CardStatus[]): string;
}
