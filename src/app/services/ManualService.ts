import { Manual } from "../models/Manual-model";
import { Manual1 } from "../manuals/manual1";
import { Manual2 } from "../manuals/manual2";
import { Manual3 } from "../manuals/manual3";
import { Manual4 } from "../manuals/manual4";

export function getManual(n: number): Manual {
  switch (n) {
    case 0:
      return new Manual1();
    case 1:
      return new Manual2();
    case 2:
      return new Manual3();
    case 3:
      return new Manual4();
    default:
      return new Manual2();
  }
}
