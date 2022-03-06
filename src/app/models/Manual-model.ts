import { CardStatus } from "./CardStatus-model";
import { Location } from "./Location-model";
import { Log } from "./Log-model";

export interface Manual {
  getId(): number;
  getSize(): number;
  getAll(): Log[][];
  getNth(n: number): Log[];
}
