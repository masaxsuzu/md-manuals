import { toHand } from "../../services/ActionService";
import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import { chain, deck, ef, initCards, link } from "../services/ActionService";
import { getSnapshots } from "../services/SnapshotService";
import "../extensions/ActionExtension";

export class Manual2 implements Manual {
  getId(): number {
    return 0;
  }
  getSize(): number {
    return 2;
  }
  getAll(): Log[][] {
    return [...Array(2)].map((_, n) => this.getNth(n));
  }
  getNth(n: number): Log[] {
    switch (n) {
      case 0:
        return log1();
      case 1:
        return log2();
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
    deck(-14, "イーグルトークン"),
    deck(-13, "イーグルトークン"),
    deck(-12, "イーグルトークン"),
    deck(-11, "イーグルトークン"),
    deck(-24, "幻獣機トークン"),
    deck(-23, "幻獣機トークン"),
    deck(-22, "幻獣機トークン"),
    deck(-21, "幻獣機トークン"),
    deck(-31, "相剣トークン"),
    deck(1, "アシュナ"),
    deck(2, "アシュナ"),
    deck(3, "ヴィシュダ"),
    deck(4, "ヴィシュダ"),
    deck(5, "アラメシア"),
    deck(6, "グリフォンライダー"),
    deck(7, "グリフォンライダー"),
    deck(8, "オライオン"),
    deck(9, "オライオン"),
    deck(10, "ジェット・シンクロン"),
    deck(11, "ジェット・シンクロン"),
    deck(12, "リフン"),
    deck(13, "リフン"),
    deck(14, "泰阿"),
    deck(15, "プロートス"),
    deck(16, "アーダラ"),
    deck(17, "レッドローズ"),
    deck(18, "ロクスローズ"),
    deck(20, "龍相剣現"),
    deck(21, "芽吹き"),
    deck(31, "九支"),
    deck(100, "ハリファイバー"),
    deck(101, "アウローラドン"),
    deck(102, "アウローラドン"),
    deck(103, "トマホーク"),
    deck(104, "ボウテンコウ"),
    deck(105, "バロネス"),
    deck(106, "ガイザー"),
    deck(107, "赤霄"),
    deck(108, "チョウホウ"),
    deck(109, "承影"),
  ];
};

const any = card4("ANY");
const ashuna = card2("アシュナ");
const adara = card1("アーダラ");
const vishuda = card2("ヴィシュダ");
const tunerOl = card2("オライオン");
const tunerJs = card2("ジェット・シンクロン");
const tunerR = card2("リフン");
const rider = card1("グリフォンライダー");
const tomahawk = card1("トマホーク");
const radon = card2("アウローラドン");
const tokenE = card4("イーグルトークン");
const tokenG = card4("幻獣機トークン");
const tokenS = card1("相剣トークン");
const boutenko = card1("ボウテンコウ");
const kyushi = card1("九支");
const baroness = card1("バロネス");
const gaizer = card1("ガイザー");
const taia = card1("泰阿");
const sekishou = card1("赤霄");
const protos = card1("プロートス");
const kengen = card1("龍相剣現");
const chouhou = card1("チョウホウ");
const shouei = card1("承影");
const redRose = card1("レッドローズ");
const roxRose = card1("ロクスローズ");
const shoot = card1("芽吹き");
const hari = card1("ハリファイバー");

function log1(): Log[] {
  const actions: Action[] = [
    initCards([
      ashuna.a.toHand(0),
      rider.a.toHand(1),
      any.a.toHand(2),
      any.b.toHand(3),
      any.c.toHand(4),
    ]),
    chain([ashuna.a.ef([ashuna.a.ss(0)]), rider.a.ef([rider.a.ss(1)])]),
    tomahawk.a.xyzMain(0, [ashuna.a.toXyz(0), rider.a.toXyz(1)]),
    tomahawk.a.ef([
      ashuna.a.toCemetery(),
      rider.a.toCemetery(),
      tokenE.a.ss(1),
      tokenE.b.ss(2),
      tokenE.c.ss(3),
      tokenE.d.ss(4),
    ]),
    radon.a.linkEx(0, [
      tomahawk.a.toCemetery(),
      tokenE.a.toBanished(),
      tokenE.b.toBanished(),
    ]),
    radon.a.ef([tokenG.a.ss(0), tokenG.b.ss(1), tokenG.c.ss(2)]),
    radon.a.ef([radon.a.toCemetery(), tokenG.a.toBanished(), tunerOl.a.ss(0)]),
    boutenko.a.synchroEx(0, [tunerOl.a.toCemetery(), tokenG.b.toBanished()]),
    chain([
      boutenko.a.ef([kyushi.a.toHand(0)]),
      tunerOl.a.ef([tokenG.d.ss(1)]),
    ]),
    boutenko.a.ef([vishuda.a.toCemetery()]),
    baroness.a.synchroEx(0, [boutenko.a.toCemetery(), tokenG.d.toBanished()]),
    boutenko.a.ef([tunerR.a.ss(0)]),
    gaizer.a.synchroMain(0, [tunerR.a.toCemetery(), tokenE.c.toBanished()]),
    baroness.a.ef([gaizer.a.toCemetery()]),
    chain([gaizer.a.ef([taia.a.ss(0)]), tunerR.a.ef([tunerR.a.ss(1)])]),
    ashuna.a.ef([vishuda.b.ss(3)]),
    sekishou.a.synchroMain(1, [tunerR.a.toCemetery(), vishuda.b.toCemetery()]),
    sekishou.a.ef([kengen.a.toHand(1)]),
    kengen.a.toMagicAndTrap(0),
    kengen.a.ef([protos.a.toHand(1), kengen.a.toCemetery()]),
    taia.a.ef([kengen.a.toBanished(), tokenS.a.ss(3)]),
    kengen.a.ef([]),
    chouhou.a.synchroMain(0, [tokenS.a.toBanished(), taia.a.toCemetery()]),
    taia.a.ef([adara.a.toCemetery()]),
    adara.a.ef([adara.a.toBanished(), tunerR.a.toHand(5)]),
    tunerR.a.ns(3),
    shouei.a.synchroMain(3, [
      tunerR.a.toCemetery(),
      tokenG.c.toBanished(),
      tokenE.d.toBanished(),
    ]),
    protos.a.ef([
      radon.a.toBanished(),
      gaizer.a.toBanished(),
      boutenko.a.toBanished(),
      protos.a.ss(4),
    ]),
    kyushi.a.toMagicAndTrap(2),
  ];

  const logs = getSnapshots(init(), actions);
  logs.shift();

  return logs;
}

function log2(): Log[] {
  const actions: Action[] = [
    initCards([
      ashuna.a.toHand(0),
      redRose.a.toHand(1),
      any.a.toHand(2),
      any.b.toHand(3),
      any.c.toHand(4),
    ]),
    ashuna.a.ef([ashuna.a.ss(0)]),
    redRose.a.ns(1),
    baroness.a.synchroMain(0, [ashuna.a.toCemetery(), redRose.a.toCemetery()]),
    redRose.a.ef([roxRose.a.ss(1)]),
    redRose.a.ef([shoot.a.toHand(0)]),
    shoot.a.toMagicAndTrap(0),
    shoot.a.ef([redRose.a.ss(2), shoot.a.toCemetery()]),
    hari.a.synchroEx(0, [redRose.a.toCemetery(), roxRose.a.toCemetery()]),
    hari.a.ef([tunerJs.a.ss(1)]),
    radon.a.synchroEx(0, [hari.a.toCemetery(), tunerJs.a.toCemetery()]),
    radon.a.ef([tokenG.a.ss(1), tokenG.b.ss(2), tokenG.c.ss(3)]),
    tunerJs.a.ef([any.a.toCemetery(), tunerJs.a.ss(4)]),
    radon.a.ef([radon.a.toCemetery(), tunerJs.a.toBanished(), tunerOl.a.ss(4)]),
    boutenko.a.synchroEx(0, [tunerOl.a.toCemetery(), tokenG.c.toBanished()]),
    chain([
      boutenko.a.ef([kyushi.a.toHand(0)]),
      tunerOl.a.ef([tokenG.d.ss(3)]),
    ]),
    boutenko.a.ef([ashuna.b.toCemetery()]),
    shouei.a.synchroEx(0, [boutenko.a.toCemetery(), tokenG.a.toBanished()]),
    boutenko.a.ef([tunerR.a.ss(1)]),
    ashuna.a.ef([ashuna.a.toBanished(), vishuda.a.ss(4)]),
    gaizer.a.synchroMain(1, [
      tunerR.a.toCemetery(),
      tokenG.b.toBanished(),
      tokenG.d.toBanished(),
    ]),
    baroness.a.ef([gaizer.a.toCemetery()]),
    chain([gaizer.a.ef([taia.a.ss(1)]), tunerR.a.ef([tunerR.a.ss(2)])]),
    sekishou.a.synchroMain(2, [tunerR.a.toCemetery(), vishuda.a.toCemetery()]),
    sekishou.a.ef([kengen.a.toHand(1)]),
    kengen.a.toMagicAndTrap(0),
    kengen.a.ef([protos.a.toHand(1), kengen.a.toCemetery()]),
    taia.a.ef([kengen.a.toBanished(), tokenS.a.ss(3)]),
    kengen.a.ef([]),
    chouhou.a.synchroMain(1, [tokenS.a.toBanished(), taia.a.toCemetery()]),
    taia.a.ef([adara.a.toCemetery()]),
    protos.a.ef([protos.a.ss(4)]),
    protos.a.ef([]),
    kyushi.a.toMagicAndTrap(3),
  ];

  const logs = getSnapshots(init(), actions);
  logs.shift();

  return logs;
}
