import { Log } from "./Log-model";

export interface Manual {
  getId(): number;
  getSize(): number;
  getAll(): Log[][];
  getNth(n: number): Log[];
}
