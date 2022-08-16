import { toHand } from "../../services/ActionService";
import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import { deck, initCards, link } from "../services/ActionService";
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
    deck(3, "ヴァイオン"),
    deck(4, "ヴァイオン"),
    deck(5, "ヴァイオン"),
    deck(6, "ヴァイオン"),
    deck(7, "シャドーミスト"),
    deck(8, "シャドーミスト"),
    deck(9, "シャドーミスト"),
    deck(10, "ディアボリックガイ"),
    deck(11, "ディアボリックガイ"),
    deck(12, "ディナイアルガイ"),
    deck(13, "ディナイアルガイ"),
    deck(30, "融合"),
    deck(100, "デッドリーガイ"),
    deck(101, "アナコンダ"),
    deck(102, "デスフェニ"),
    deck(103, "デスフェニ"),
  ];
};

const any = card4("ANY");
const vyon = card3("ヴァイオン");
const shadowMist = card3("シャドーミスト");
const malicious = card2("ディアボリックガイ");
const denier = card2("ディナイアルガイ");
const fusion = card1("融合");

const deathPhoenix = card3("デスフェニ");
const dangerous = card1("デッドリーガイ");
const anaconda = card1("アナコンダ");

function a(): Log[] {
  const actions: Action[] = [
    initCards([vyon.a.toHand(0), any.a.toHand(1)]),
    vyon.a.ns(0),
    vyon.a.ef([shadowMist.a.toCemetery(0)]),
    shadowMist.a.ef([malicious.a.toHand(0)]),
    vyon.a.ef([shadowMist.a.toBanished(),fusion.a.toHand(2)]),
    fusion.a.toMagicAndTrap(0),
    fusion.a.ef([dangerous.a.ss(0), vyon.a.toCemetery(), malicious.a.toCemetery(), fusion.a.toCemetery()]),
    malicious.a.ef([malicious.a.toBanished(), malicious.b.ss(1)]),
    dangerous.a.ef([any.a.toCemetery(), denier.a.toCemetery()]),
    anaconda.a.linkEx(0, [dangerous.a.toCemetery(), malicious.b.toCemetery()])
  ];

  const logs = getSnapshots(init(), actions);
  logs.shift();

  return logs;
}
