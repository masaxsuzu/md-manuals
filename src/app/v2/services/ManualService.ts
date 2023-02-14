import { Manual1 } from "../manuals/Manual1";
import { Manual2 } from "../manuals/Manual2";
import { Manual3 } from "../manuals/Manual3";
import { Manual } from "../models/Manual-model";

export function getManual(n: number): Manual {
  switch (n) {
    case 0:
      return new Manual1();
    case 1:
      return new Manual2();
    case 2:
      return new Manual3();
    default:
      return new Manual1();
  }
}
