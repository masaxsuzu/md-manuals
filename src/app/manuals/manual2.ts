import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
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
} from "../services/ActionService";
import { deck, exDeck } from "../services/CardService";
import { getSnapshots } from "../services/SnapshotService";

export function manual2() {
  return [manual21()];
}

const init = () => {
  return [
    deck(-4, "ANY"),
    deck(-3, "ANY"),
    deck(-2, "ANY"),
    deck(-1, "ANY"),
    deck(0, "バン"),
    deck(1, "バン"),
    deck(2, "バン"),
    deck(3, "アル"),
    deck(4, "アル"),
    deck(5, "アル"),
    deck(6, "エル"),
    deck(7, "ルタ"),
    deck(8, "弁天"),
    deck(9, "弁天"),
    deck(10, "弁天"),
    deck(11, "神巫"),
    deck(12, "神巫"),
    deck(13, "神巫"),
    deck(14, "朱光"),
    deck(15, "朱光"),
    deck(16, "朱光"),
    deck(17, "イーバ"),
    deck(18, "イーバ"),
    deck(19, "崇光"),
    deck(20, "輝巧群"),
    deck(21, "竜輝巧"),
    deck(22, "竜輝巧"),
    deck(23, "竜輝巧"),
    exDeck(24, "ファフ"),
    exDeck(25, "ベアトリーチェ"),
    exDeck(26, "虹光"),
    exDeck(27, "虹光"),
    exDeck(28, "ユニオンキャリアー"),
    exDeck(29, "リンクリボー"),
    exDeck(30, "マスカレーナ"),
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
const alpha = card3("バン");
const zeta = card3("アル");
const gamma = card1("エル");
const delta = card1("ルタ");
const benten = card3("弁天");
const orange = card3("朱光");
const diviner = card3("神巫");
const iva = card2("イーバ");
const alt = card1("崇光");
const meteonis = card1("輝巧群");
const nova = card3("竜輝巧");
const beta = card1("ファフ");
const beatrice = card1("ベアトリーチェ");
const rainbow = card2("虹光");
const carrier = card1("ユニオンキャリアー");
const kuri = card1("リンクリボー");
const ip = card1("マスカレーナ");

function manual21() {
  const actions: Action[] = [
    initCards([
      toHand(alpha.a, 0),
      toHand(zeta.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(alpha.a, [
      toMainMonster(alpha.a, 0),
      toGraveyard(zeta.a),
      toHand(benten.a, 0),
    ]),
    ef(zeta.a, [
      toMainMonster(zeta.a, 1),
      toGraveyard(benten.a),
      toHand(meteonis.a),
    ]),
    ef(benten.a, [toHand(diviner.a, 1)]),
    ns(diviner.a, "mainMonster", 2),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(alt.a, 1)]),
    xyz(beta.a, "mainMonster", 0, [toXyz(alpha.a), toXyz(zeta.a)]),
    ef(beta.a, [toGraveyard(gamma.a)]),
    ef(meteonis.a, [
      toGraveyard(zeta.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(meteonis.a, [toHand(meteonis.a, 0)]),
    ef(meteonis.a, [
      toGraveyard(alpha.a),
      toMainMonster(benten.a, 1),
      toGraveyard(meteonis.a),
    ]),
    ef(gamma.a, [
      toGraveyard(benten.a),
      toMainMonster(gamma.a, 1),
      toMainMonster(alpha.a, 3),
    ]),
    ef(benten.a, [toHand(iva.a, 5)]),
    link(carrier.a, "extraMonster", 0, [
      toGraveyard(gamma.a),
      toGraveyard(alpha.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.b, 0)]),
    link(ip.a, "mainMonster", 1, [
      toGraveyard(beta.a),
      toGraveyard(diviner.a),
      toGraveyard(iva.b),
    ]),
    ef(iva.b, [
      toBanished(rainbow.a),
      toBanished(diviner.a),
      toHand(orange.a, 6),
      toHand(diviner.b, 7),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
