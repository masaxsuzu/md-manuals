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
  ];
};

const スケイル = init().filter((c) => c.name === "スケイル")[0].id;
const スケイル2 = init().filter((c) => c.name === "スケイル")[1].id;
const スケイル3 = init().filter((c) => c.name === "スケイル")[2].id;

function manual21() {
  const actions: Action[] = [
    initCards([
      toHand(0, 4),
      toHand(1, 5),
      toHand(2, 6),
    ]),

    inspect(),
  ];
  const logs = getSnapshots(init(), actions);
  logs.shift();
  return logs;
}
