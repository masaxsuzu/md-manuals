import { Manual1 } from "../manuals/Manual1";
import { Manual } from "../models/Manual-model";

export function getManual(n: number): Manual {
  switch (n) {
    case 0:
      return new Manual1();
    default:
      return new Manual1();
  }
}
