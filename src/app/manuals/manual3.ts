import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/manual-model";
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
} from "../services/ActionService";
import { deck, exDeck } from "../services/CardService";
import { getSnapshots } from "../services/SnapshotService";

export class Manual3 implements Manual {
  getId(): number {
    return 2;
  }
  getSize(): number {
    return 6;
  }
  getAll(): Log[][] {
    return [...Array(this.getSize())].map((_, n) => this.getNth(n));
  }
  getNth(n: number): Log[] {
    switch (n) {
      case 0:
        return manual31();
      case 1:
        return manual32();
      case 2:
        return manual33();
      case 3:
        return manual34();
      case 4:
        return manual35();
      case 5:
        return manual36();
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
    deck(0, "虹彩"),
    deck(1, "虹彩"),
    deck(2, "時空"),
    deck(3, "星霜"),
    deck(4, "ラスターP"),
    deck(5, "ペンマジ"),
    deck(6, "ペンマジ"),
    deck(7, "ペンマジ"),
    deck(8, "ドクロバット"),
    deck(9, "ドクロバット"),
    deck(10, "ドクロバット"),
    deck(11, "天空"),
    deck(12, "慧眼"),
    deck(13, "慧眼"),
    deck(14, "慧眼"),
    deck(15, "アストロ"),
    deck(16, "ダークヴルム"),
    deck(17, "黒牙"),
    deck(18, "黒牙"),
    deck(19, "黒牙"),
    deck(20, "紫毒"),
    deck(21, "紫毒"),
    deck(22, "紫毒"),
    deck(23, "調弦"),
    deck(24, "調弦"),
    deck(25, "賤竜"),
    deck(26, "賤竜"),
    deck(27, "賤竜"),
    deck(28, "時読"),
    deck(29, "オッドアイズシンクロン"),
    deck(70, "うらら"),
    deck(71, "うらら"),
    deck(72, "うらら"),
    exDeck(100, "エレクトラム"),
    exDeck(101, "スターヴ"),
    exDeck(102, "スターヴ"),
    exDeck(103, "スターヴ"),
    exDeck(104, "タイタニック"),
    exDeck(105, "ハリファイバー"),
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
const kousai = card1("虹彩");
const jikuu = card1("時空");
const seisou = card1("星霜");
const penmagi = card3("ペンマジ");
const luster = card1("ラスターP");
const dokuro = card3("ドクロバット");
const tenkuu = card1("天空");
const keigan = card3("慧眼");
const electrum = card1("エレクトラム");
const astro = card1("アストロ");
const kokuga = card3("黒牙");
const shidoku = card3("紫毒");
const urara = card3("うらら");
const chougen = card2("調弦");
const senryu = card3("賤竜");
const darkwurm = card1("ダークヴルム");
const starve = card3("スターヴ");
const titanic = card1("タイタニック");
const tokiyomi = card1("時読");
const hari = card1("ハリファイバー");
const oddEyesSynchron = card1("オッドアイズシンクロン");

function _luster(
  cardId: number,
  scale: number,
  got: { id: number; at: number }
) {
  return ef(cardId, [toExtraDeck(scale), toHand(got.id, got.at)]);
}

function manual31() {
  const actions: Action[] = [
    initCards([
      toHand(penmagi.a, 0),
      toHand(luster.a, 1),
      toHand(any.a, 2),
      toHand(any.b, 3),
      toHand(any.c, 4),
    ]),

    toScale(penmagi.a, 0),
    toScale(luster.a, 1),
    _luster(luster.a, penmagi.a, { id: penmagi.b, at: 0 }),
    toScale(penmagi.b, 0),

    pendulum([toMainMonster(penmagi.a)]),

    ef(penmagi.a, [
      toExtraDeck(penmagi.b),
      toExtraDeck(luster.a),
      toHand(dokuro.a, 0),
      toHand(tenkuu.a, 1),
    ]),

    ns(dokuro.a, "mainMonster", 1),
    ef(dokuro.a, [toHand(keigan.a, 0)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(penmagi.a),
      toExtraDeck(dokuro.a),
    ]),

    ef(electrum.a, [toExtraDeck(astro.a)]),

    toScale(tenkuu.a, 0),
    toScale(keigan.a, 1),

    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    ef(electrum.a, [toHand(any.d, 5)]),

    ef(electrum.a, [toExtraDeck(kousai.a), toHand(astro.a, 0)]),

    ef(astro.a, [toMainMonster(astro.a, 0), toHand(keigan.b, 0)]),

    ef(kousai.a, [toHand(jikuu.a, 1)]),

    toScale(keigan.b, 1),

    ef(keigan.b, [toExtraDeck(keigan.b), toScale(senryu.a, 1)]),

    ef(senryu.a, [toHand(keigan.a, 0)]),

    toSpellAndTrap(jikuu.a, 2),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual32() {
  const actions: Action[] = [
    initCards([
      toHand(penmagi.a, 0),
      toHand(luster.a, 1),
      toHand(kokuga.a, 2),
      toHand(darkwurm.a, 3),
      toHand(any.a, 4),
    ]),

    toScale(penmagi.a, 0),
    toScale(luster.a, 1),
    _luster(luster.a, penmagi.a, { id: penmagi.b, at: 0 }),
    toScale(penmagi.b, 0),

    pendulum([
      toExtraMonster(penmagi.a, 0),
      toMainMonster(kokuga.a, 3),
      toMainMonster(darkwurm.a, 4),
    ]),

    ef(penmagi.a, [
      toExtraDeck(penmagi.b),
      toExtraDeck(luster.a),
      toHand(dokuro.a, 0),
      toHand(tenkuu.a, 1),
    ]),

    ns(dokuro.a, "mainMonster", 1),
    ef(dokuro.a, [toHand(keigan.a, 0)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(penmagi.a),
      toExtraDeck(dokuro.a),
    ]),

    ef(electrum.a, [toExtraDeck(astro.a)]),

    toScale(tenkuu.a, 0),
    toScale(keigan.a, 1),

    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    ef(electrum.a, [toHand(any.d, 5)]),

    ef(electrum.a, [toExtraDeck(kousai.a), toHand(astro.a, 0)]),

    ef(astro.a, [toMainMonster(astro.a, 0), toHand(keigan.b, 0)]),

    ef(kousai.a, [toHand(seisou.a, 1)]),

    toSpellAndTrap(seisou.a, 2),
    toScale(keigan.b, 1),

    ef(keigan.b, [toExtraDeck(keigan.b), toScale(senryu.a, 1)]),
    ef(seisou.a, [toHand(chougen.a)]),

    ef(senryu.a, [toHand(kousai.a, 1)]),

    ef(starve.a, [
      toMainMonster(starve.a),
      toExtraDeck(astro.a),
      toExtraDeck(kokuga.a),
    ]),

    ef(starve.a, [toExtraMonster(electrum.a, 0)]),

    ef(starve.a, [toExtraDeck(senryu.a), toHand(astro.a, 2)]),

    ef(astro.a, [toMainMonster(astro.a, 1), toHand(keigan.c, 2)]),

    toScale(kousai.a, 1),

    ef(starve.b, [
      toMainMonster(starve.b, 1),
      toExtraDeck(astro.a),
      toExtraDeck(darkwurm.a),
    ]),
    ef(starve.b, [toExtraMonster(electrum.a, 0)]),

    ef(starve.b, [toExtraDeck(kousai.a), toHand(astro.a, 1)]),

    ef(astro.a, [toMainMonster(astro.a, 4), toHand(senryu.b, 1)]),

    ef(kousai.a, [toHand(jikuu.a, 3)]),

    xyz(titanic.a, "mainMonster", 1, [toXyz(starve.a), toXyz(starve.b)]),

    toScale(keigan.c, 1),
    ef(keigan.c, [toExtraDeck(keigan.c), toScale(shidoku.a, 1)]),
    toSpellAndTrap(jikuu.a, 3),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual33() {
  const actions: Action[] = [
    initCards([
      toHand(penmagi.a, 0),
      toHand(luster.a, 1),
      toHand(chougen.a, 2),
      toHand(any.a, 3),
      toHand(any.b, 4),
    ]),

    toScale(penmagi.a, 0),
    toScale(luster.a, 1),
    _luster(luster.a, penmagi.a, { id: penmagi.b, at: 0 }),
    toScale(penmagi.b, 0),

    pendulum([toExtraMonster(penmagi.a, 0), toMainMonster(chougen.a, 3)]),
    ef(chougen.a, [toMainMonster(tokiyomi.a, 4)]),
    ef(penmagi.a, [
      toExtraDeck(penmagi.b),
      toExtraDeck(luster.a),
      toHand(dokuro.a, 0),
      toHand(tenkuu.a, 1),
    ]),

    ns(dokuro.a, "mainMonster", 1),
    ef(dokuro.a, [toHand(keigan.a, 0)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(penmagi.a),
      toExtraDeck(dokuro.a),
    ]),

    ef(electrum.a, [toExtraDeck(astro.a)]),

    toScale(tenkuu.a, 0),
    toScale(keigan.a, 1),

    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    ef(electrum.a, [toHand(any.d, 5)]),

    ef(electrum.a, [toExtraDeck(kousai.a), toHand(astro.a, 0)]),

    ef(astro.a, [toMainMonster(astro.a, 0), toHand(keigan.b, 0)]),

    ef(kousai.a, [toHand(seisou.a, 1)]),

    toSpellAndTrap(seisou.a, 2),
    toScale(keigan.b, 1),

    ef(keigan.b, [toExtraDeck(keigan.b), toScale(senryu.a, 1)]),
    ef(seisou.a, [toHand(shidoku.a)]),

    ef(senryu.a, [toHand(kousai.a, 1)]),

    ef(starve.a, [
      toMainMonster(starve.a),
      toExtraDeck(astro.a),
      toExtraDeck(tokiyomi.a),
    ]),

    ef(starve.a, [toExtraMonster(electrum.a, 0)]),

    ef(starve.a, [toExtraDeck(senryu.a), toHand(astro.a, 2)]),

    ef(astro.a, [toMainMonster(astro.a, 1), toHand(keigan.c, 2)]),

    toScale(kousai.a, 1),
    link(hari.a, "extraMonster", 0, [
      toGraveyard(electrum.a),
      toExtraDeck(chougen.a),
    ]),
    ef(hari.a, [toMainMonster(oddEyesSynchron.a, 2)]),
    ef(starve.b, [
      toMainMonster(starve.b, 1),
      toExtraDeck(astro.a),
      toExtraDeck(oddEyesSynchron.a),
    ]),
    ef(starve.b, [toGraveyard(electrum.a, 0)]),

    ef(starve.b, [toExtraDeck(kousai.a), toHand(astro.a, 1)]),

    ef(astro.a, [toMainMonster(astro.a, 4), toHand(senryu.b, 1)]),

    ef(kousai.a, [toHand(jikuu.a, 6)]),

    xyz(titanic.a, "mainMonster", 1, [toXyz(starve.a), toXyz(starve.b)]),

    toScale(shidoku.a, 1),
    toSpellAndTrap(jikuu.a, 3),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual34() {
  const actions: Action[] = [
    initCards([
      toHand(penmagi.a, 0),
      toHand(luster.a, 1),
      toHand(keigan.a, 2),
      toHand(senryu.a, 3),
      toHand(any.a, 4),
    ]),

    toScale(senryu.a, 0),
    toScale(keigan.a, 1),
    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    pendulum([
      toExtraMonster(keigan.a, 0),
      toMainMonster(penmagi.a, 0),
      toMainMonster(luster.a, 1),
    ]),

    ef(penmagi.a, [toExtraDeck(kousai.a), toHand(dokuro.a)]),
    ef(kousai.a, [toHand(seisou.a, 1)]),
    toSpellAndTrap(seisou.a, 2),
    ns(dokuro.a, "mainMonster", 2),
    ef(dokuro.a, [toHand(keigan.b, 0)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(penmagi.a),
      toExtraDeck(keigan.a),
    ]),

    ef(electrum.a, [toExtraDeck(astro.a)]),

    toScale(keigan.b, 1),

    ef(keigan.b, [toExtraDeck(keigan.b), toScale(shidoku.a, 1)]),

    ef(electrum.a, [toHand(any.d, 5)]),
    ef(seisou.a, [toHand(chougen.a)]),

    ef(senryu.a, [toHand(kousai.a, 1)]),
    ef(electrum.a, [toExtraDeck(senryu.a), toHand(astro.a, 2)]),

    ef(astro.a, [toMainMonster(astro.a, 0), toHand(keigan.c, 2)]),

    toScale(kousai.a, 0),

    ef(starve.a, [
      toMainMonster(starve.a),
      toExtraDeck(astro.a),
      toExtraDeck(dokuro.a),
    ]),

    ef(starve.a, [toExtraMonster(electrum.a, 0)]),

    ef(starve.a, [toExtraDeck(kousai.a), toHand(astro.a, 1)]),

    ef(astro.a, [toMainMonster(astro.a, 2), toHand(senryu.b, 1)]),
    ef(kousai.a, [toHand(jikuu.a, 3)]),
    link(hari.a, "extraMonster", 0, [
      toGraveyard(electrum.a),
      toExtraDeck(luster.a),
    ]),
    ef(hari.a, [toMainMonster(oddEyesSynchron.a, 1)]),
    ef(starve.b, [
      toMainMonster(starve.b, 1),
      toExtraDeck(astro.a),
      toExtraDeck(oddEyesSynchron.a),
    ]),
    ef(starve.b, [toGraveyard(electrum.a, 0)]),

    ef(starve.b, [toExtraDeck(shidoku.a), toHand(astro.a, 6)]),

    ef(astro.a, [toMainMonster(astro.a, 4), toHand(shidoku.b, 6)]),

    xyz(titanic.a, "mainMonster", 1, [toXyz(starve.a), toXyz(starve.b)]),

    toScale(shidoku.b, 1),
    toSpellAndTrap(jikuu.a, 3),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual35() {
  const actions: Action[] = [
    initCards([
      toHand(keigan.a, 0),
      toHand(senryu.a, 1),
      toHand(dokuro.a, 2),
      toHand(kokuga.a, 3),
      toHand(any.a, 4),
    ]),

    ns(dokuro.a, "mainMonster", 2),
    ef(dokuro.a, [toHand(penmagi.a, 2)]),

    toScale(senryu.a, 0),
    toScale(keigan.a, 1),
    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    pendulum([
      toExtraMonster(keigan.a, 0),
      toMainMonster(penmagi.a, 0),
      toMainMonster(kokuga.a, 1),
    ]),

    ef(penmagi.a, [toExtraDeck(kousai.a), toHand(tenkuu.a)]),
    ef(kousai.a, [toHand(seisou.a, 1)]),
    toSpellAndTrap(seisou.a, 2),
    toScale(tenkuu.a, 1),

    ef(senryu.a, [toHand(kousai.a)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(penmagi.a),
      toExtraDeck(keigan.a),
    ]),

    ef(electrum.a, [toExtraDeck(senryu.a), toHand(astro.a, 1)]),
    ef(astro.a, [toMainMonster(astro.a, 0), toHand(senryu.b, 1)]),
    ef(seisou.a, [toHand(keigan.b, 2)]),

    ef(electrum.a, [toHand(any.d, 5)]),
    toScale(kousai.a, 0),

    ef(starve.a, [
      toMainMonster(starve.a),
      toExtraDeck(astro.a),
      toExtraDeck(kokuga.a),
    ]),

    ef(starve.a, [toExtraMonster(electrum.a, 0)]),

    ef(starve.a, [toExtraDeck(kousai.a), toHand(astro.a, 0)]),

    ef(astro.a, [toMainMonster(astro.a, 1), toHand(senryu.c, 0)]),
    ef(kousai.a, [toHand(jikuu.a, 3)]),
    toScale(keigan.b, 0),
    ef(keigan.b, [toExtraDeck(keigan.b), toHand(shidoku.a, 2)]),
    ef(starve.b, [
      toMainMonster(starve.b, 1),
      toExtraDeck(astro.a),
      toExtraDeck(dokuro.a),
    ]),
    ef(starve.b, [toExtraMonster(electrum.a, 0)]),

    ef(starve.b, [toExtraDeck(tenkuu.a), toHand(astro.a, 6)]),

    ef(astro.a, [toMainMonster(astro.a, 2), toHand(keigan.c, 6)]),

    xyz(titanic.a, "mainMonster", 1, [toXyz(starve.a), toXyz(starve.b)]),

    toScale(shidoku.a, 0),
    toSpellAndTrap(jikuu.a, 3),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual36() {
  const actions: Action[] = [
    initCards([
      toHand(keigan.a, 0),
      toHand(senryu.a, 1),
      toHand(chougen.a, 2),
      toHand(kokuga.a, 3),
      toHand(any.a, 4),
    ]),

    toScale(senryu.a, 0),
    toScale(keigan.a, 1),
    ef(keigan.a, [toExtraDeck(keigan.a), toScale(kousai.a, 1)]),

    pendulum([toMainMonster(chougen.a, 0), toMainMonster(kokuga.a, 1)]),

    ef(chougen.a, [toMainMonster(tokiyomi.a, 4)]),

    link(electrum.a, "extraMonster", 0, [
      toExtraDeck(kokuga.a),
      toExtraDeck(tokiyomi.a),
    ]),

    ef(electrum.a, [toExtraDeck(kousai.a), toHand(astro.a, 0)]),
    ef(astro.a, [toMainMonster(astro.a, 1), toHand(keigan.b, 0)]),

    ef(electrum.a, [toHand(any.d, 5)]),
    ef(kousai.a, [toHand(seisou.a, 1)]),
    toSpellAndTrap(seisou.a, 2),

    toScale(keigan.b, 1),
    ef(keigan.b, [toExtraDeck(keigan.b), toScale(shidoku.a, 1)]),
    ef(seisou.a, [toHand(tenkuu.a)]),

    ef(senryu.a, [toHand(kousai.a, 1)]),
    ns(tenkuu.a, "mainMonster", 2),
    ef(tenkuu.a, []),
    ef(starve.a, [
      toMainMonster(starve.a, 1),
      toExtraDeck(astro.a),
      toExtraDeck(tenkuu.a),
    ]),

    ef(starve.a, [toExtraMonster(electrum.a, 0)]),
    ef(starve.a, [toExtraDeck(senryu.a), toHand(astro.a, 0)]),
    ef(astro.a, [toMainMonster(astro.a, 2), toHand(senryu.c, 0)]),
    toScale(kousai.a, 0),

    link(hari.a, "extraMonster", 0, [
      toGraveyard(electrum.a),
      toExtraDeck(chougen.a),
    ]),
    ef(hari.a, [toMainMonster(oddEyesSynchron.a, 0)]),
    ef(starve.b, [
      toMainMonster(starve.b, 0),
      toExtraDeck(astro.a),
      toExtraDeck(oddEyesSynchron.a),
    ]),
    ef(starve.b, [toGraveyard(electrum.a, 0)]),

    ef(starve.b, [toExtraDeck(kousai.a), toHand(astro.a, 1)]),

    ef(astro.a, [toMainMonster(astro.a, 2), toHand(keigan.c, 6)]),
    ef(kousai.a, [toHand(jikuu.a, 7)]),
    xyz(titanic.a, "mainMonster", 1, [toXyz(starve.a), toXyz(starve.b)]),

    toSpellAndTrap(jikuu.a, 3),

    ef(tenkuu.a, [toHand(kokuga.b, 7)]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
