import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import { ef, ns, toCemetery, toHand } from "../services/ActionService";

declare module "../models/Card-model" {
  interface Card {
    toHand(at?: number): Action;
    toCemetery(at?: number): Action;
    ns(at: number): Action;
    ef(actions: Action[]): Action;
  }
}

Card.prototype.toHand = function (at?: number): any {
  return toHand(this.id, at);
};

Card.prototype.toCemetery = function (at?: number): any {
  return toCemetery(this.id, at);
};

Card.prototype.ns = function (at: number): any {
  return ns(this.id, "mainMonster", at);
};

Card.prototype.ef = function (actions: Action[]): any {
  return ef(this.id, actions);
};
