import { ExtraDeckZone } from "../components/zones/ExtraDeckZone";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import {
  initCards,
  ef,
  ns,
  ss,
  xyz,
  link,
  inspect,
  toHand,
  toMainMonster,
  toGraveyard,
  toBanished,
  toSpellAndTrap,
  toXyz,
  toExtraDeck,
  toScale,
  pendulum,
  toExtraMonster,
  toField,
  synchro,
} from "../services/ActionService";
import { deck, exDeck } from "../services/CardService";
import { getSnapshots } from "../services/SnapshotService";

export class Manual4 implements Manual {
  getId(): number {
    return 3;
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
        return manual31();
      default:
        return [];
    }
  }
}

const init = () => {
  return [
    deck(-4, "ANY"),
    deck(-3, "ANY"),
    deck(-2, "ANY"),
    deck(-1, "ANY"),
    deck(0, "アチチ"),
    deck(1, "アチチ"),
    deck(2, "アチチ"),
    deck(3, "ピカリ"),
    deck(4, "ピカリ"),
    deck(5, "ピカリ"),
    deck(6, "ヒヤリ"),
    deck(7, "ドシン"),
    deck(8, "ブルル"),
    deck(9, "ドヨン"),
    deck(10, "ダンマリ"),
    deck(11, "ガッチリ"),
    deck(12, "めぐりAi"),
    deck(13, "めぐりAi"),
    deck(14, "めぐりAi"),
    deck(15, "キAi"),
    deck(16, "Aiランド"),
    deck(17, "Aiドリング"),

    exDeck(100, "ダークインファント"),
    exDeck(101, "ダークインファント"),
    exDeck(102, "ダークナイト"),
    exDeck(103, "アライバル"),
    exDeck(104, "ウィキッド"),
    exDeck(105, "トランスコードトーカー"),
    exDeck(106, "ウィンドペガサス"),
  ];
};

const card1 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: cards[0].id,
  };
};
const card2 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: cards[0].id,
    b: cards[1].id,
  };
};
const card3 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: cards[0].id,
    b: cards[1].id,
    c: cards[2].id,
  };
};

const card4 = (name: string) => {
  const cards = init().filter((c) => c.name === name);
  return {
    a: cards[0].id,
    b: cards[1].id,
    c: cards[2].id,
    d: cards[3].id,
  };
};

const any = card4("ANY");
const achichi = card3("アチチ");
const pikari = card3("ピカリ");
const doyon = card1("ドヨン");
const bururu = card1("ブルル");
const dannmari = card1("ダンマリ");
const darkInfant = card2("ダークインファント");
const aiLand = card1("Aiランド");
const meruriAi = card1("めぐりAi");
const wikid = card1("ウィキッド");
const transCode = card1("トランスコードトーカー");
const darkKnight = card1("ダークナイト");
const windPegasus = card1("ウィンドペガサス");

function manual31() {
  const actions: Action[] = [
    initCards([
      toHand(achichi.a, 0),
      toHand(any.a, 1),
      toHand(any.b, 2),
      toHand(any.c, 3),
      toHand(any.d, 4),
    ]),

    ns(achichi.a, "mainMonster", 0),
    ef(achichi.a, [toHand(pikari.a, 5)]),

    link(darkInfant.a, "extraMonster", 0, [toGraveyard(achichi.a)]),

    ef(darkInfant.a, [toHand(aiLand.a, 6)]),

    toField(aiLand.a),

    ef(aiLand.a, [ss(pikari.a, "mainMonster", 0)]),

    ef(pikari.a, [toHand(meruriAi.a, 5)]),

    toSpellAndTrap(meruriAi.a),
    ef(meruriAi.a, [toHand(doyon.a, 5), toGraveyard(meruriAi.a)]),

    link(wikid.a, "extraMonster", 0, [
      toGraveyard(darkInfant.a),
      toGraveyard(pikari.a),
    ]),

    ef(aiLand.a, [ss(doyon.a, "mainMonster", 1)]),

    ef(wikid.a, [toBanished(darkInfant.a), toHand(bururu.a, 5)]),

    ef(doyon.a, [toHand(achichi.b, 6)]),

    link(transCode.a, "extraMonster", 0, [
      toGraveyard(wikid.a),
      toGraveyard(doyon.a),
    ]),

    ef(aiLand.a, [ss(bururu.a, "mainMonster", 0)]),

    ef(bururu.a, [toGraveyard(dannmari.a)]),

    ef(transCode.a, [ss(wikid.a, "extraMonster", 1)]),

    link(darkKnight.a, "extraMonster", 1, [
      toGraveyard(wikid.a),
      toGraveyard(bururu.a),
    ]),

    ef(aiLand.a, [ss(achichi.b, "mainMonster", 0)]),

    link(darkInfant.b, "mainMonster", 2, [
      toGraveyard(transCode.a),
      toGraveyard(achichi.b),
    ]),

    ef(darkKnight.a, [
      toMainMonster(achichi.a, 0),
      toMainMonster(bururu.a, 1),
      toMainMonster(pikari.a, 3),
    ]),

    ef(darkInfant.b, [toMainMonster(darkInfant.b, 2)]),

    synchro(windPegasus.a, "mainMonster", 1, [
      toGraveyard(bururu.a),
      toGraveyard(pikari.a),
    ]),

    ef(bururu.a, [ss(pikari.a, "mainMonster", 3)]),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
