import { CardStatus } from "../models/CardStatus-model";

let order = 0;
export function incrementOrder() {
  return order++;
}
export function deck(id: number, name: string): CardStatus {
  return {
    id: id,
    name: name,
    order: incrementOrder(),
    location: { zone: "mainDeck" },
    head: false,
  };
}

export function exDeck(id: number, name: string): CardStatus {
  return {
    id: id,
    name: name,
    order: incrementOrder(),
    location: { zone: "extraDeck" },
    head: false,
  };
}
