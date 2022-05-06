import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { toHand } from "../services/ActionService";

declare module "../models/Card-model" {
  interface Card {
    toHand(at?: number): Action;
  }
}

Card.prototype.toHand = function (at?: number): any {
  return toHand(this.id, at);
};
