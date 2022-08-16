import { Tile } from "./Tile-model";

export interface Snapshot {
  extraMonsters: Tile[];
  banished: Tile[];
  field: Tile[];
  mainMonsters: Tile[];
  cemetery: Tile[];
  magicAndTraps: Tile[];
  hands: Tile[];
}
