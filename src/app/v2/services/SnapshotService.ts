import { Snapshot } from "../models/Snapshot-model";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
import { Log } from "../models/Log-model";
import { Tile } from "../models/Tile-model";

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
  const magicAndTraps = state
    .filter((c) => c.location.zone === "magicAndTrap")
    .sort((a, b) => a.id - b.id);
  const hands = state
    .filter((c) => c.location.zone === "hand")
    .sort((a, b) => a.id - b.id);
  const cemetery = state
    .filter((c) => c.location.zone === "cemetery")
    .sort((a, b) => a.order - b.order);
  const banished = state
    .filter((c) => c.location.zone === "banished")
    .sort((a, b) => a.order - b.order);
  const extraMonsters = state
    .filter((c) => c.location.zone === "extraMonster")
    .sort((a, b) => a.id - b.id);

  return {
    banished: toTile(banished),
    extraMonsters: toTile(extraMonsters),
    cemetery: toTile(cemetery),
    hands: toTile(hands),
    mainMonsters: toTile(mainMonsters),
    magicAndTraps: toTile(magicAndTraps),
    field: toTile(field),
  };
}

function toTile(stats: CardStatus[]): Tile[] {
  return stats.map((c) => {
    return {
      name: c.name,
      location: c.location.at === undefined ? 0 : c.location.at,
      head: c.head,
    };
  });
}
