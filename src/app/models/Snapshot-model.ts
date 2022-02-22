import { CardStatus } from "./CardStatus-model";

export interface Snapshot {
  mainDeck: CardStatus[];
  extraDeck: CardStatus[];
  extraMonsters: CardStatus[];
  mainMonsters: CardStatus[];
  field?: CardStatus;
  spellAndTraps: CardStatus[];
  graveyard: CardStatus[];
  banished: CardStatus[];
  hands: CardStatus[];
}
