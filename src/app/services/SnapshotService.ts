import { Snapshot } from "../models/Snapshot-model";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
import { Log } from "../models/Log-model";

export function getSnapshots(state: CardStatus[], actions: Action[]): Log[] {
  const snapshots = [];
  snapshots.push({
    actionLog: "",
    snapshot: getSnapshot(state),
  });
  for (const action of actions) {
    let actionLog = action.run(state);
    snapshots.push({
      actionLog: actionLog,
      snapshot: getSnapshot(state),
    });
  }
  console.log(snapshots);
  return snapshots;
}

function getSnapshot(state: CardStatus[]): Snapshot {
  state = JSON.parse(JSON.stringify(state));
  const mainDeck = state
    .filter((c) => c.location.zone === "mainDeck")
    .sort((a, b) => a.id - b.id);
  const extraDeck = state
    .filter((c) => c.location.zone === "extraDeck")
    .sort((a, b) => a.order - b.order)
    .sort((a, b) => (a.head ? 1 : 0 - (b.head ? 1 : 0)));
  const mainMonsters = state
    .filter((c) => c.location.zone === "mainMonster")
    .sort((a, b) => a.order - b.order);
  const field = state
    .filter((c) => c.location.zone === "field")
    .sort((a, b) => a.id - b.id);
  const spellAndTrap = state
    .filter((c) => c.location.zone === "spellAndTrap")
    .sort((a, b) => a.id - b.id);
  const hands = state
    .filter((c) => c.location.zone === "hand")
    .sort((a, b) => a.id - b.id);
  const graveyard = state
    .filter((c) => c.location.zone === "graveyard")
    .sort((a, b) => a.order - b.order);
  const banished = state
    .filter((c) => c.location.zone === "banished")
    .sort((a, b) => a.order - b.order);
  const extraMonsters = state
    .filter((c) => c.location.zone === "extraMonster")
    .sort((a, b) => a.id - b.id);

  return {
    banished: banished,
    extraDeck: extraDeck,
    extraMonsters: extraMonsters,
    graveyard: graveyard,
    hands: hands,
    mainDeck: mainDeck,
    mainMonsters: mainMonsters,
    spellAndTraps: spellAndTrap,
    field: field.length > 0 ? field[0] : undefined,
  };
}
