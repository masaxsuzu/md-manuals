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

export function manual1() {
  return [
    manual11(),
    manual121(),
    manual122(),
    manual131(),
    manual132(),
    manual14(),
    manual15(),
    manual16(),
    manual17(),
    manual18(),
    manual19(),
    manual1a(),
  ];
}

const init = () => {
  return [
    deck(-4, "ANY"),
    deck(-3, "ANY"),
    deck(-2, "ANY"),
    deck(-1, "ANY"),
    deck(0, "スケイル"),
    deck(1, "スケイル"),
    deck(2, "スケイル"),
    deck(3, "ブーツ"),
    deck(4, "ブーツ"),
    deck(5, "ブーツ"),
    deck(6, "ローブ"),
    deck(7, "ローブ"),
    deck(8, "ローブ"),
    deck(9, "グローブ"),
    deck(10, "グローブ"),
    deck(11, "グリーブ"),
    deck(12, "娘々"),
    deck(13, "サイキック"),
    deck(14, "未界域"),
    deck(15, "緊テレ"),
    deck(16, "翼"),
    deck(17, "霧剣"),
    deck(18, "霧剣"),
    deck(19, "霧剣"),
    exDeck(20, "ブリガンダイン"),
    exDeck(21, "バルディッシュ"),
    exDeck(22, "ブレイクソード"),
    exDeck(23, "ブレイクソード"),
    exDeck(24, "ブレイクソード"),
    exDeck(25, "リヴァイ"),
    exDeck(26, "リヴァイ"),
    exDeck(27, "ケルビーニ"),
    exDeck(28, "ナイトメア"),
    exDeck(29, "リダン"),
    exDeck(30, "未来皇"),
    exDeck(31, "未来龍皇"),
    exDeck(32, "抹殺"),
  ];
};

const スケイル = init().filter((c) => c.name === "スケイル")[0].id;
const スケイル2 = init().filter((c) => c.name === "スケイル")[0].id;
const ローブ = init().filter((c) => c.name === "ローブ")[0].id;
const ローブ2 = init().filter((c) => c.name === "ローブ")[1].id;
const ブーツ = init().filter((c) => c.name === "ブーツ")[0].id;
const ブーツ2 = init().filter((c) => c.name === "ブーツ")[1].id;
const グローブ = init().filter((c) => c.name === "グローブ")[0].id;
const グリーブ = init().filter((c) => c.name === "グリーブ")[0].id;
const 緊テレ = init().filter((c) => c.name === "緊テレ")[0].id;
const 娘々 = init().filter((c) => c.name === "娘々")[0].id;
const 未界域 = init().filter((c) => c.name === "未界域")[0].id;
const ブリガンダイン = init().filter((c) => c.name === "ブリガンダイン")[0].id;
const 翼 = init().filter((c) => c.name === "翼")[0].id;
const 霧剣 = init().filter((c) => c.name === "霧剣")[0].id;
const 霧剣2 = init().filter((c) => c.name === "霧剣")[1].id;
const 霧剣3 = init().filter((c) => c.name === "霧剣")[2].id;

const ケルビーニ = init().filter((c) => c.name === "ケルビーニ")[0].id;
const バルディッシュ = init().filter((c) => c.name === "バルディッシュ")[0].id;
const ブレイクソード = init().filter((c) => c.name === "ブレイクソード")[0].id;
const リダン = init().filter((c) => c.name === "リダン")[0].id;
const ナイトメア = init().filter((c) => c.name === "ナイトメア")[0].id;
const リヴァイ = init().filter((c) => c.name === "リヴァイ")[0].id;
const リヴァイ2 = init().filter((c) => c.name === "リヴァイ")[1].id;
const 未来皇 = init().filter((c) => c.name === "未来皇")[0].id;
const 未来龍皇 = init().filter((c) => c.name === "未来龍皇")[0].id;
const 抹殺 = init().filter((c) => c.name === "抹殺")[0].id;

function manual11() {
  const actions: Action[] = [
    initCards([
      toHand(0, 0),
      toHand(3, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    ef(3, [toMainMonster(3, 1)]),
    link(27, "extraMonster", 0, [toGraveyard(0), toGraveyard(3)]),
    ef(27, [toGraveyard(6)]),
    ef(3, [toBanished(3), toHand(20)]),
    ef(0, [toMainMonster(0, 0)]),
    toSpellAndTrap(20, 0),
    ef(20, [toMainMonster(20, 1)]),
    link(21, "extraMonster", 0, [toGraveyard(27), toGraveyard(20)]),
    ef(21, [toGraveyard(20), toSpellAndTrap(17, 0)]),
    ef(9, [toBanished(9), toGraveyard(16)]),
    ef(16, [toBanished(16), toMainMonster(6, 1)]),
    xyz(22, "mainMonster", 0, [toXyz(0), toXyz(6)]),
    ef(21, [toGraveyard(0), toGraveyard(6), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(6, 1)]),

    xyz(28, "mainMonster", 4, [toXyz(0), toXyz(6)]),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual121() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(6, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    ef(0, [toGraveyard(6), toGraveyard(9)]),
    ef(6, [toBanished(6), toHand(3, 1)]),
    ef(3, [toMainMonster(3, 1)]),
    link(27, "extraMonster", 0, [toGraveyard(0), toGraveyard(3)]),
    ef(27, [toGraveyard(12)]),
    ef(3, [toBanished(3), toHand(20, 0)]),
    toSpellAndTrap(20, 0),
    ef(20, [toMainMonster(20, 0)]),
    link(21, "extraMonster", 0, [toGraveyard(27), toGraveyard(20)]),
    ef(21, [toGraveyard(7), toSpellAndTrap(17)]),
    ef(9, [toBanished(9), toGraveyard(16)]),
    ef(0, [toMainMonster(0, 0)]),
    ef(12, [toMainMonster(12, 1)]),
    xyz(22, "mainMonster", 0, [toXyz(0), toXyz(12)]),
    ef(21, [toGraveyard(0), toGraveyard(12), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(6, 1)]),
    xyz(28, "mainMonster", 4, [toXyz(0), toXyz(6)]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual122() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(9, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    ef(0, [toGraveyard(9), toGraveyard(6)]),
    ef(6, [toBanished(6), toHand(3, 1)]),
    ef(3, [toMainMonster(3, 1)]),
    link(27, "extraMonster", 0, [toGraveyard(0), toGraveyard(3)]),
    ef(27, [toGraveyard(12)]),
    ef(3, [toBanished(3), toHand(20, 0)]),
    toSpellAndTrap(20, 0),
    ef(20, [toMainMonster(20, 0)]),
    link(21, "extraMonster", 0, [toGraveyard(27), toGraveyard(20)]),
    ef(21, [toGraveyard(7), toSpellAndTrap(17)]),
    ef(9, [toBanished(9), toGraveyard(16)]),
    ef(0, [toMainMonster(0, 0)]),
    ef(12, [toMainMonster(12, 1)]),
    xyz(22, "mainMonster", 0, [toXyz(0), toXyz(12)]),
    ef(21, [toGraveyard(0), toGraveyard(12), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(6, 1)]),
    xyz(28, "mainMonster", 4, [toXyz(0), toXyz(6)]),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual131() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(13, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    ef(13, [toMainMonster(13, 1)]),
    link(27, "extraMonster", 0, [toGraveyard(0), toGraveyard(13)]),
    ef(27, [toGraveyard(6)]),
    ef(6, [toBanished(6), toHand(3, 0)]),
    ef(0, [toMainMonster(0, 0)]),
    ef(3, [toMainMonster(3, 1)]),
    link(21, "extraMonster", 0, [toGraveyard(3), toGraveyard(27)]),
    ef(21, [toGraveyard(9), toSpellAndTrap(17, 0)]),

    _boot(3, 18, 0),
    _scale(0, 18, 7),
    _globe(9, 16),
    ef(18, [toBanished(18), toMainMonster(7, 1)]),

    xyz(22, "mainMonster", 0, [toXyz(0), toXyz(7)]),
    ef(21, [toGraveyard(0), toGraveyard(7), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(7, 1)]),
    xyz(28, "mainMonster", 4, [toXyz(0), toXyz(7)]),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual132() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(14, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    _scale(0, 14, 6),
    ef(14, [toMainMonster(14, 1)]),
    _robe(6, 3, 0),
    _ss(3, 2),
    link(27, "extraMonster", 0, [toGraveyard(0), toGraveyard(3)]),
    ef(27, [toGraveyard(12)]),
    link(21, "extraMonster", 0, [toGraveyard(14), toGraveyard(27)]),
    ef(21, [toGraveyard(9), toSpellAndTrap(17, 0)]),
    _globe(9, 16),
    ef(0, [toMainMonster(0, 0)]),
    ef(14, [toMainMonster(14, 1)]),
    xyz(22, "mainMonster", 0, [toXyz(0), toXyz(14)]),
    ef(21, [toGraveyard(0), toGraveyard(14), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(3, 1)]),
    xyz(28, "mainMonster", 4, [toXyz(0), toXyz(3)]),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function _ss(cardId: number, at: number) {
  return ef(cardId, [toMainMonster(cardId, at)]);
}
function _scale(cardId: number, cost: number, fromDeck: number) {
  return ef(cardId, [toGraveyard(cost), toGraveyard(fromDeck)]);
}
function _boot(cardId: number, fromDeck: number, at: number) {
  return ef(cardId, [toBanished(cardId), toHand(fromDeck, at)]);
}
function _robe(cardId: number, fromDeck: number, at: number) {
  return ef(cardId, [toBanished(cardId), toHand(fromDeck, at)]);
}
function _globe(cardId: number, fromDeck: number) {
  return ef(cardId, [toBanished(cardId), toGraveyard(fromDeck)]);
}
function _linkEx(cardId: number, at: number, m1: number, m2: number) {
  return link(cardId, "extraMonster", at, [toGraveyard(m1), toGraveyard(m2)]);
}

function _xyzMain(cardId: number, at: number, m1: number, m2: number) {
  return xyz(cardId, "mainMonster", at, [toXyz(m1), toXyz(m2)]);
}

function manual14() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(12, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(0, "mainMonster", 0),
    _scale(0, 12, 6),
    _robe(6, 3, 0),
    _ss(3, 1),
    _linkEx(27, 0, 0, 3),
    ef(27, [toGraveyard(9)]),
    _globe(9, 17),
    _ss(0, 0),
    link(21, "extraMonster", 0, [toGraveyard(27), toBanished(0)]),
    ef(21, [toGraveyard(1), toSpellAndTrap(18, 0)]),
    ef(17, [toBanished(17), toMainMonster(1, 0)]),
    ef(12, [toMainMonster(12, 1)]),
    _xyzMain(22, 0, 1, 12),

    ef(21, [toGraveyard(1), toGraveyard(12), toGraveyard(22)]),
    ef(22, [toMainMonster(1, 0), toMainMonster(3, 1)]),
    _xyzMain(28, 4, 1, 3),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual15() {
  const actions = [
    initCards([
      toHand(0, 0),
      toHand(-1, 1),
      toHand(-2, 2),
      toHand(-3, 3),
      toHand(-4, 4),
    ]),
    ns(0, "mainMonster", 0),
    _scale(0, -1, 6),
    _robe(6, 3, 0),
    _ss(3, 1),
    _linkEx(27, 0, 0, 3),
    ef(27, [toGraveyard(12)]),
    _boot(3, 20, 0),
    toSpellAndTrap(20, 0),
    ef(20, [toMainMonster(20, 0)]),
    _linkEx(21, 0, 27, 20),
    ef(21, [toGraveyard(9), toSpellAndTrap(17, 0)]),
    _globe(9, 4),
    _ss(0, 0),
    _ss(12, 1),

    _xyzMain(22, 0, 0, 12),

    ef(21, [toGraveyard(0), toGraveyard(12), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(6, 1)]),
    _xyzMain(28, 4, 0, 6),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
function manual16() {
  const actions = [
    initCards([
      toHand(3, 0),
      toHand(13, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(3, "mainMonster", 0),
    _ss(13, 1),
    _linkEx(27, 0, 3, 13),
    ef(27, [toGraveyard(0)]),
    _boot(3, 20, 0),
    _ss(0, 1),
    toSpellAndTrap(20, 0),
    _ss(20, 0),
    _linkEx(21, 0, 27, 20),
    ef(21, [toGraveyard(6), toSpellAndTrap(17, 0)]),
    _robe(6, 4, 0),
    _ss(4, 0),

    _xyzMain(22, 0, 4, 0),

    ef(21, [toGraveyard(4), toGraveyard(0), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(4, 1)]),
    _xyzMain(28, 4, 0, 4),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual17() {
  const actions = [
    initCards([
      toHand(15, 0),
      toHand(13, 1),
      toHand(-1, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ef(15, [toMainMonster(12), toGraveyard(15)]),
    _ss(13, 1),
    _linkEx(27, 0, 12, 13),
    ef(27, [toGraveyard(6)]),
    _robe(6, 0, 0),
    ns(0, "mainMonster", 0),

    _linkEx(21, 0, 27, 0),
    ef(21, [toGraveyard(9), toSpellAndTrap(17, 0)]),
    _globe(9, 7),
    _ss(0, 0),
    _ss(12, 1),

    _xyzMain(22, 0, 0, 12),

    ef(21, [toGraveyard(0), toGraveyard(12), toGraveyard(22)]),
    ef(22, [toMainMonster(0, 0), toMainMonster(7, 1)]),
    _xyzMain(28, 4, 0, 7),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual18() {
  const actions = [
    initCards([
      toHand(緊テレ, 0),
      toHand(ブーツ, 1),
      toHand(スケイル, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(スケイル, "mainMonster", 0),
    ef(緊テレ, [toMainMonster(娘々, 1), toGraveyard(緊テレ)]),
    _ss(ブーツ, 2),
    _linkEx(ケルビーニ, 0, スケイル, 娘々),
    ef(ケルビーニ, [toGraveyard(ローブ)]),
    _linkEx(バルディッシュ, 0, ケルビーニ, ブーツ),
    ef(バルディッシュ, [toGraveyard(グローブ), toSpellAndTrap(霧剣, 0)]),
    _robe(ローブ, グリーブ, 0),
    _boot(ブーツ, ブリガンダイン, 1),
    _ss(ブリガンダイン, 0),
    _ss(グリーブ, 1),
    _xyzMain(リダン, 4, グリーブ, ブリガンダイン),

    _globe(グローブ, ローブ2),
    _ss(スケイル, 0),
    _ss(娘々, 1),

    _xyzMain(ブレイクソード, 0, スケイル, 娘々),

    ef(バルディッシュ, [
      toGraveyard(スケイル),
      toGraveyard(娘々),
      toGraveyard(ブレイクソード),
    ]),
    ef(ブレイクソード, [toMainMonster(スケイル, 0), toMainMonster(ローブ2, 1)]),
    _xyzMain(ナイトメア, 2, スケイル, ローブ2),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual19() {
  const actions = [
    initCards([
      toHand(スケイル, 0),
      toHand(ブーツ, 1),
      toHand(未界域, 2),
      toHand(-2, 3),
      toHand(-3, 4),
    ]),
    ns(スケイル, "mainMonster", 0),
    ef(スケイル, [toGraveyard(未界域), toGraveyard(ローブ)]),
    _ss(未界域, 2),
    _ss(ブーツ, 1),
    _linkEx(ケルビーニ, 0, スケイル, ブーツ),
    ef(ケルビーニ, [toGraveyard(娘々)]),
    _robe(ローブ, グリーブ, 0),
    _ss(スケイル, 0),
    _ss(グリーブ, 1),

    _xyzMain(リヴァイ, 0, スケイル, グリーブ),
    ef(リヴァイ, [toGraveyard(スケイル), toMainMonster(ローブ, 1)]),
    _boot(ブーツ, 霧剣, 0),
    _xyzMain(リヴァイ2, 1, ローブ, 未界域),
    ef(リヴァイ2, [toGraveyard(ローブ), toMainMonster(ブーツ, 2)]),
    _xyzMain(未来皇, 0, リヴァイ, リヴァイ2),
    ef(未来龍皇, [
      toGraveyard(ローブ),
      toGraveyard(未界域),
      toXyz(未来皇),
      toMainMonster(未来龍皇),
    ]),
    _linkEx(バルディッシュ, 0, ブーツ, ケルビーニ),
    ef(バルディッシュ, [toGraveyard(グローブ), toSpellAndTrap(霧剣2, 0)]),
    _globe(グローブ, 翼),
    ef(翼, [toBanished(翼), toMainMonster(ブーツ, 1)]),
    _ss(娘々, 2),
    _xyzMain(ブレイクソード, 2, ブーツ, 娘々),
    ef(バルディッシュ, [
      toGraveyard(ブーツ),
      toGraveyard(娘々),
      toGraveyard(ブレイクソード),
    ]),
    ef(ブレイクソード, [toMainMonster(ブーツ, 1), toMainMonster(ローブ, 2)]),
    _xyzMain(ナイトメア, 4, ブーツ, ローブ),
    toSpellAndTrap(霧剣, 1),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}

function manual1a() {
  const actions = [
    initCards([
      toHand(スケイル, 0),
      toHand(ローブ, 1),
      toHand(緊テレ, 2),
      toHand(抹殺, 3),
      toHand(-3, 4),
    ]),

    ns(スケイル, "mainMonster", 0),
    ef(スケイル, [toGraveyard(ローブ), toGraveyard(翼)]),
    ef(緊テレ, [toGraveyard(緊テレ), toMainMonster(娘々, 1)]),
    _linkEx(ケルビーニ, 0, スケイル, 娘々),
    ef(ケルビーニ, [toGraveyard(グローブ)]),
    _robe(ローブ, ブーツ, 0),
    _ss(スケイル, 0),
    _ss(ブーツ, 1),
    _xyzMain(リヴァイ, 0, スケイル, ブーツ),
    ef(リヴァイ, [toGraveyard(スケイル), toMainMonster(ローブ, 1)]),
    _globe(グローブ, 霧剣),
    ef(霧剣, [toBanished(霧剣), toMainMonster(スケイル, 2)]),
    _xyzMain(リヴァイ2, 1, スケイル, ローブ),
    ef(リヴァイ2, [toGraveyard(スケイル), toMainMonster(グローブ, 2)]),
    _xyzMain(未来皇, 0, リヴァイ, リヴァイ2),
    ef(未来龍皇, [
      toGraveyard(ローブ),
      toGraveyard(ブーツ),
      toXyz(未来皇),
      toMainMonster(未来龍皇),
    ]),
    _linkEx(バルディッシュ, 0, ケルビーニ, グローブ),
    ef(バルディッシュ, [toGraveyard(ローブ2), toSpellAndTrap(霧剣2, 0)]),
    ef(翼, [toBanished(翼), toMainMonster(ローブ2, 1)]),
    _ss(娘々, 2),
    _xyzMain(ブレイクソード, 2, ローブ2, 娘々),
    ef(バルディッシュ, [
      toGraveyard(ローブ2),
      toGraveyard(娘々),
      toGraveyard(ブレイクソード),
    ]),
    ef(ブレイクソード, [toMainMonster(ローブ2, 1), toMainMonster(グローブ, 2)]),
    _xyzMain(ナイトメア, 4, ローブ2, グローブ),
    _boot(ブーツ, 霧剣3, 1),
    toSpellAndTrap(霧剣3, 1),
    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
