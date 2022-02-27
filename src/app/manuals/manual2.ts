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
  return [
    manual21(),
    manual22(),
    manual23(),
    manual24(),
    manual25(),
    manual26(),
    manual27(),
    manual28(),
  ];
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

function manual22() {
  const actions: Action[] = [
    initCards([
      toHand(alpha.a, 0),
      toHand(zeta.a, 1),
      toHand(iva.a, 2),
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
    ef(benten.a, [toHand(orange.b, 5)]),
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

function manual23() {
  const actions: Action[] = [
    initCards([
      toHand(alpha.a, 0),
      toHand(delta.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(alpha.a, [
      toMainMonster(alpha.a, 0),
      toGraveyard(delta.a),
      toHand(benten.a, 0),
    ]),
    ef(delta.a, [toMainMonster(delta.a, 1), toGraveyard(benten.a)]),
    ef(benten.a, [toHand(diviner.a, 1)]),

    xyz(beta.a, "mainMonster", 0, [toXyz(alpha.a), toXyz(delta.a)]),
    ef(beta.a, [toGraveyard(zeta.a)]),
    ns(diviner.a, "mainMonster", 2),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(alt.a, 1)]),
    ef(zeta.a, [
      toMainMonster(zeta.a, 1),
      toGraveyard(alt.a),
      toHand(meteonis.a, 0),
    ]),
    ef(meteonis.a, [
      toGraveyard(alpha.a),
      toMainMonster(benten.a, 4),
      toGraveyard(meteonis.a),
    ]),
    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(diviner.a), toGraveyard(gamma.a)]),
    ef(meteonis.a, [toHand(meteonis.a, 0), toMainMonster(zeta.a, 1)]),
    ef(gamma.a, [
      toGraveyard(zeta.a),
      toMainMonster(gamma.a, 1),
      toMainMonster(zeta.a, 3),
    ]),
    link(carrier.a, "extraMonster", 0, [
      toGraveyard(gamma.a),
      toGraveyard(zeta.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),
    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(diviner.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual24() {
  const actions: Action[] = [
    initCards([
      toHand(alpha.a, 0),
      toHand(gamma.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(alpha.a, [
      toMainMonster(alpha.a, 0),
      toGraveyard(gamma.a),
      toHand(benten.a, 0),
    ]),
    ef(gamma.a, [
      toGraveyard(alpha.a),
      toMainMonster(gamma.a, 0),
      toMainMonster(alpha.a, 1),
    ]),

    xyz(beta.a, "mainMonster", 0, [toXyz(alpha.a), toXyz(gamma.a)]),
    ef(beta.a, [toGraveyard(zeta.a)]),

    ef(zeta.a, [
      toGraveyard(benten.a),
      toMainMonster(zeta.a, 1),
      toHand(meteonis.a),
    ]),
    ef(benten.a, [toHand(diviner.a, 1)]),

    ns(diviner.a, "mainMonster", 2),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(alt.a, 1)]),

    ef(meteonis.a, [toGraveyard(alpha.a), toMainMonster(benten.a, 3)]),

    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(diviner.a), toGraveyard(delta.a)]),

    ef(delta.a, [
      toGraveyard(alt.a),
      toMainMonster(delta.a, 3),
      toHand(any.d, 1),
    ]),

    link(carrier.a, "extraMonster", 0, [
      toGraveyard(zeta.a),
      toGraveyard(delta.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(diviner.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual25() {
  const actions: Action[] = [
    initCards([
      toHand(gamma.a, 0),
      toHand(delta.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(gamma.a, [
      toGraveyard(delta.a),
      toMainMonster(gamma.a, 0),
      toMainMonster(delta.a, 1),
    ]),

    xyz(beta.a, "mainMonster", 0, [toXyz(delta.a), toXyz(gamma.a)]),
    ef(beta.a, [toGraveyard(alpha.a)]),

    ef(alpha.a, [
      toGraveyard(beta.a),
      toGraveyard(delta.a),
      toGraveyard(gamma.a),
      toMainMonster(alpha.a, 0),
      toHand(benten.a, 0),
    ]),

    ef(delta.a, [toGraveyard(benten.a), toMainMonster(delta.a, 1)]),

    ef(benten.a, [toHand(diviner.a, 0)]),

    ns(diviner.a, "mainMonster", 2),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(meteonis.a, 0)]),

    ef(meteonis.a, [
      toGraveyard(alpha.a),
      toMainMonster(benten.a, 3),
      toGraveyard(meteonis.a),
    ]),

    ef(meteonis.a, [toMainMonster(delta.a, 1), toHand(meteonis.a)]),
    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(benten.a), toGraveyard(alt.a)]),

    link(carrier.a, "extraMonster", 0, [
      toGraveyard(beatrice.a),
      toGraveyard(diviner.a),
      toGraveyard(delta.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(diviner.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual26() {
  const actions: Action[] = [
    initCards([
      toHand(zeta.a, 0),
      toHand(gamma.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(gamma.a, [
      toGraveyard(zeta.a),
      toMainMonster(gamma.a, 0),
      toMainMonster(zeta.a, 1),
    ]),

    xyz(beta.a, "mainMonster", 0, [toXyz(zeta.a), toXyz(gamma.a)]),
    ef(beta.a, [toGraveyard(alpha.a)]),

    ef(alpha.a, [
      toGraveyard(beta.a),
      toGraveyard(zeta.a),
      toGraveyard(gamma.a),
      toMainMonster(alpha.a, 0),
      toHand(benten.a, 0),
    ]),

    ef(zeta.a, [
      toGraveyard(benten.a),
      toMainMonster(zeta.a, 1),
      toHand(meteonis.a),
    ]),
    ef(benten.a, [toHand(diviner.a, 1)]),

    ns(diviner.a, "mainMonster", 2),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(alt.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(alpha.a),
      toMainMonster(benten.a, 3),
      toGraveyard(meteonis.a),
    ]),
    ef(meteonis.a, [toMainMonster(zeta.a, 1), toHand(meteonis.a)]),

    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(diviner.a), toGraveyard(delta.a)]),

    ef(delta.a, [
      toGraveyard(alt.a),
      toMainMonster(delta.a, 0),
      toHand(any.d, 1),
    ]),

    link(carrier.a, "extraMonster", 0, [
      toGraveyard(delta.a),
      toGraveyard(zeta.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(diviner.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual27() {
  const actions: Action[] = [
    initCards([
      toHand(alpha.a, 0),
      toHand(benten.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(alpha.a, [
      toGraveyard(benten.a),
      toMainMonster(alpha.a, 0),
      toHand(benten.b),
    ]),

    ef(benten.a, [toHand(diviner.a, 1)]),

    ns(diviner.a, "mainMonster", 1),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(meteonis.a, 0)]),

    ef(meteonis.a, [
      toGraveyard(alpha.a),
      toMainMonster(benten.a, 0),
      toGraveyard(meteonis.a),
    ]),

    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(benten.a), toGraveyard(gamma.a)]),

    ef(gamma.a, [
      toGraveyard(benten.b),
      toMainMonster(gamma.a),
      toMainMonster(alpha.a, 1),
    ]),

    ef(benten.b, [toHand(alt.a, 1)]),

    ef(meteonis.a, [toMainMonster(gamma.a, 0), toHand(meteonis.a, 0)]),

    xyz(beta.a, "mainMonster", 0, [toXyz(gamma.a), toXyz(alpha.a)]),
    ef(beta.a, [toGraveyard(delta.a)]),

    ef(delta.a, [
      toGraveyard(alt.a),
      toMainMonster(delta.a, 1),
      toHand(any.d, 1),
    ]),

    link(carrier.a, "extraMonster", 0, [
      toGraveyard(delta.a),
      toGraveyard(beta.a),
      toGraveyard(gamma.a),
      toGraveyard(alpha.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(benten.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual28() {
  const actions: Action[] = [
    initCards([
      toHand(zeta.a, 0),
      toHand(benten.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    ef(zeta.a, [
      toGraveyard(benten.a),
      toMainMonster(zeta.a, 0),
      toHand(meteonis.a),
    ]),

    ef(benten.a, [toHand(diviner.a, 1)]),

    ns(diviner.a, "mainMonster", 1),
    ef(diviner.a, [toGraveyard(rainbow.a)]),
    ef(rainbow.a, [toHand(benten.b, 1)]),

    ef(meteonis.a, [
      toGraveyard(zeta.a),
      toMainMonster(benten.a, 0),
      toGraveyard(meteonis.a),
    ]),

    xyz(beatrice.a, "mainMonster", 2, [toXyz(diviner.a), toXyz(benten.a)]),
    ef(beatrice.a, [toGraveyard(benten.a), toGraveyard(gamma.a)]),

    ef(gamma.a, [
      toGraveyard(benten.b),
      toMainMonster(gamma.a),
      toMainMonster(zeta.a, 1),
    ]),

    ef(benten.b, [toHand(alt.a, 1)]),

    ef(meteonis.a, [toMainMonster(gamma.a, 0), toHand(meteonis.a, 0)]),

    xyz(beta.a, "mainMonster", 0, [toXyz(gamma.a), toXyz(zeta.a)]),
    ef(beta.a, [toGraveyard(delta.a)]),

    ef(delta.a, [
      toGraveyard(alt.a),
      toMainMonster(delta.a, 1),
      toHand(any.d, 1),
    ]),

    link(carrier.a, "extraMonster", 0, [
      toGraveyard(delta.a),
      toGraveyard(beta.a),
      toGraveyard(gamma.a),
      toGraveyard(alpha.a),
    ]),
    ef(carrier.a, [toSpellAndTrap(iva.a, 1)]),

    ef(meteonis.a, [
      toGraveyard(carrier.a),
      toGraveyard(iva.a),
      toMainMonster(alt.a, 4),
      toGraveyard(meteonis.a),
    ]),
    ef(iva.a, [
      toBanished(rainbow.a),
      toBanished(benten.a),
      toHand(orange.a, 5),
      toHand(diviner.b, 6),
    ]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
