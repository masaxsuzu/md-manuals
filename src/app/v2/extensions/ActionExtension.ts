import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import {
  ef,
  link,
  ns,
  ss,
  toBanished,
  toCemetery,
  toHand,
  toSpellAndTrap,
} from "../services/ActionService";

declare module "../models/Card-model" {
  interface Card {
    toHand(at?: number): Action;
    toCemetery(at?: number): Action;
    toBanished(at?: number): Action;
    toMagicAndTrap(at?: number): Action;
    ns(at: number): Action;
    ss(at: number): Action;
    linkEx(at: number, actions: Action[]): Action;
    linkMain(at: number, actions: Action[]): Action;
    ef(actions: Action[]): Action;
  }
}

Card.prototype.toHand = function (at?: number): any {
  return toHand(this.id, at);
};

Card.prototype.toMagicAndTrap = function (at?: number): any {
  return toSpellAndTrap(this.id, at);
};

Card.prototype.toCemetery = function (at?: number): any {
  return toCemetery(this.id, at);
};

Card.prototype.toBanished = function (at?: number): any {
  return toBanished(this.id, at);
};

Card.prototype.ns = function (at: number): any {
  return ns(this.id, "mainMonster", at);
};

Card.prototype.ss = function (at: number): any {
  return ss(this.id, "mainMonster", at);
};

Card.prototype.linkEx = function (at: number, actions: Action[]): any {
  return link(this.id, "extraMonster", at, actions);
};

Card.prototype.linkMain = function (at: number, actions: Action[]): any {
  return link(this.id, "mainMonster", at, actions);
};

Card.prototype.ef = function (actions: Action[]): any {
  return ef(this.id, actions);
};
