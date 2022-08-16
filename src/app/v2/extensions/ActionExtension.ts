import { Action } from "../models/Action-model";
import { Card } from "../models/Card-model";
import {
  ef,
  link,
  ns,
  ss,
  synchro,
  toBanished,
  toCemetery,
  toHand,
  toSpellAndTrap,
  toXyz,
  xyz,
} from "../services/ActionService";

declare module "../models/Card-model" {
  interface Card {
    toHand(at?: number): Action;
    toDeck(at?: number): Action;
    toCemetery(at?: number): Action;
    toBanished(at?: number): Action;
    toMagicAndTrap(at?: number): Action;
    toXyz(at?: number): Action;
    ns(at: number): Action;
    ss(at: number): Action;
    synchroMain(at: number, actions: Action[]): Action;
    synchroEx(at: number, actions: Action[]): Action;
    xyzEx(at: number, actions: Action[]): Action;
    xyzMain(at: number, actions: Action[]): Action;
    linkEx(at: number, actions: Action[]): Action;
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

Card.prototype.toXyz = function (at?: number): any {
  return toXyz(this.id, at);
};

Card.prototype.ns = function (at: number): any {
  return ns(this.id, "mainMonster", at);
};

Card.prototype.ss = function (at: number): any {
  return ss(this.id, "mainMonster", at);
};

Card.prototype.synchroEx = function (at: number, actions: Action[]): any {
  return synchro(this.id, "extraMonster", at, actions);
};

Card.prototype.synchroMain = function (at: number, actions: Action[]): any {
  return synchro(this.id, "mainMonster", at, actions);
};

Card.prototype.xyzEx = function (at: number, actions: Action[]): any {
  return xyz(this.id, "extraMonster", at, actions);
};

Card.prototype.xyzMain = function (at: number, actions: Action[]): any {
  return xyz(this.id, "mainMonster", at, actions);
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
