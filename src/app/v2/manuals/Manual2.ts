import { toHand } from "../../services/ActionService";
import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { Log } from "../models/Log-model";
import { Manual } from "../models/Manual-model";
import { deck, ef, initCards, link } from "../services/ActionService";
import { getSnapshots } from "../services/SnapshotService";
import "../extensions/ActionExtension";

export class Manual2 implements Manual {
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
    deck(20, "龍相剣現"),
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

function a(): Log[] {
  const actions: Action[] = [
    initCards([
      ashuna.a.toHand(0),
      rider.a.toHand(1),
      any.a.toHand(2),
      any.b.toHand(3),
      any.c.toHand(4),
    ]),
    rider.a.ef([rider.a.ss(1), ashuna.a.ef([ashuna.a.ss(0)])]),
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
    tunerOl.a.ef([tokenG.d.ss(1), boutenko.a.ef([kyushi.a.toHand(0)])]),
    boutenko.a.ef([vishuda.a.toCemetery()]),
    baroness.a.synchroEx(0, [boutenko.a.toCemetery(), tokenG.d.toBanished()]),
    boutenko.a.ef([tunerR.a.ss(0)]),
    gaizer.a.synchroMain(0, [tunerR.a.toCemetery(), tokenE.c.toBanished()]),
    baroness.a.ef([gaizer.a.toCemetery()]),
    gaizer.a.ef([taia.a.ss(0), tunerR.a.ef([tunerR.a.ss(1)])]),
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
