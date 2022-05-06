import { toHand } from "../../services/ActionService";
import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import { deck, initCards } from "../services/ActionService";
import { getSnapshots } from "../services/SnapshotService";
import "../extensions/ActionExtension";

export class Manual1 implements Manual {
  getId(): number {
    return 0;
  }
  getSize(): number {
    return 1;
  }
  getAll(): Log[][] {
    return [...Array(1)].map((_, n) => this.getNth(n));
  }
  getNth(n: number): Log[] {
    switch (n) {
      case 0:
        return a();
      case 1:
      default:
        return [];
    }
  }
}

const card1 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: new Card(cards[0].id),
  };
};
const card2 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: new Card(cards[0].id),
    b: new Card(cards[1].id),
  };
};
const card3 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: new Card(cards[0].id),
    b: new Card(cards[1].id),
    c: new Card(cards[2].id),
  };
};

const card4 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: new Card(cards[0].id),
    b: new Card(cards[1].id),
    c: new Card(cards[2].id),
    d: new Card(cards[3].id),
  };
};

const init = () => {
  return [
    deck(-4, "ANY"),
    deck(-3, "ANY"),
    deck(-2, "ANY"),
    deck(-1, "ANY"),
    deck(0, "デスフェニ"),
    deck(1, "デスフェニ"),
    deck(2, "デスフェニ"),
  ];
};

const any = card4("ANY");
const deathPhoenix = card3("デスフェニ");

function a(): Log[] {
  const actions: Action[] = [
    initCards([
      deathPhoenix.a.toHand(1),
      deathPhoenix.b.toHand(2),
      deathPhoenix.c.toHand(3),
    ]),
    any.b.toHand(4),
    any.b.toHand(5),
  ];

  const logs = getSnapshots(init(), actions);
  logs.shift();

  return logs;
}
