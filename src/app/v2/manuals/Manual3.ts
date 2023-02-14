import { toHand } from "../../services/ActionService";
import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import { chain, deck, ef, initCards, link } from "../services/ActionService";
import { getSnapshots } from "../services/SnapshotService";
import "../extensions/ActionExtension";

export class Manual3 implements Manual {
  getId(): number {
    return 0;
  }
  getSize(): number {
    return 1;
  }
  getAll(): Log[][] {
    return [...Array(this.getSize())].map((_, n) => this.getNth(n));
  }
  getNth(n: number): Log[] {
    switch (n) {
      case 0:
        return log1();
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
    deck(0, "スプライト・ブルー"),
    deck(1, "スプライト・ブルー"),
    deck(2, "スプライト・ブルー"),
  ];
};

const any = card4("ANY");
const blue = card3("スプライト・ブルー");

function log1(): Log[] {
  const actions: Action[] = [
    initCards([
      blue.a.toHand(0),
      any.a.toHand(1),
      any.b.toHand(2),
      any.c.toHand(3),
      any.d.toHand(4),
    ]),
  ];

  const logs = getSnapshots(init(), actions);
  logs.shift();

  return logs;
}
