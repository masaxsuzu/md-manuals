import { Manual } from "../models/manual-model";
import { Manual1 } from "../manuals/manual1";
import { Manual2 } from "../manuals/manual2";

export function getManual(n: number): Manual {
  switch (n) {
    case 0:
      return new Manual1();
    case 1:
      return new Manual2();
    default:
      return new Manual2();
  }
}
