import { Tile } from "./Tile-model";

export interface Snapshot {
  extraMonsters: Tile[];
  vanished: Tile[];
  field: Tile[];
  mainMonsters: Tile[];
  cemetery: Tile[];
  magicAndTraps: Tile[];
  hands: Tile[];
}
