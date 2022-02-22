import { Images } from "../models/Images-model";
import images from "../../images/*.jpg";
import { ZoneId } from "../models/Zone-id";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";
import { incrementOrder } from "./CardService";

export function initCards(actions: Action[]): Action {
  return new InitAction(actions);
}

export function ns(cardId: number, zone: ZoneId, at: number): Action {
  return new NormalSummonAction(cardId, incrementOrder(), {
    zone: zone,
    at: at,
  });
}
export function ss(cardId: number, zone: ZoneId, at: number): Action {
  return new SpecialSummonAction(cardId, incrementOrder(), {
    zone: zone,
    at: at,
  });
}

export function toHand(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), { zone: "hand", at: at });
}

export function toMainMonster(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "mainMonster",
    at: at,
  });
}

export function toSpellAndTrap(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "spellAndTrap",
    at: at,
  });
}

export function toGraveyard(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "graveyard",
    at: at,
  });
}

export function toBanished(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), { zone: "banished", at: at });
}

export function toXyz(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), { zone: "xyz", at: at });
}

export function ef(cardId: number, actions: Action[]): Action {
  return new EffectAction(cardId, actions);
}

export function inspect(): Action {
  return new InspectAction();
}

export function link(
  link: number,
  zone: ZoneId,
  at: number,
  actions: Action[]
): Action {
  return new LinkAction(link, { zone: zone, at: at }, actions);
}

export function xyz(
  xyz: number,
  zone: ZoneId,
  at: number,
  actions: Action[]
): Action {
  return new XYZAction(xyz, incrementOrder(), { zone: zone, at: at }, actions);
}

class InitAction implements Action {
  constructor(public actions: Action[]) {}
  run(cards: CardStatus[]) {
    for (const action of this.actions) {
      action.run(cards);
    }
    return `初期配置`;
  }
}

class NormalSummonAction implements Action {
  constructor(
    public cardId: number,
    public order: number,
    public to: { zone: ZoneId; at?: number }
  ) {}
  run(cards: CardStatus[]) {
    new MoveAction(this.cardId, this.order, this.to).run(cards);
    const card = cards.filter((c) => c.id === this.cardId)[0];
    return `${card.name}を通常召喚`;
  }
}

class SpecialSummonAction implements Action {
  constructor(
    public cardId: number,
    public order: number,
    public to: { zone: ZoneId; at?: number }
  ) {}
  run(cards: CardStatus[]) {
    new MoveAction(this.cardId, this.order, this.to).run(cards);
    const card = cards.filter((c) => c.id === this.cardId)[0];
    return `${card.name}を特殊召喚`;
  }
}

class MoveAction implements Action {
  constructor(
    public cardId: number,
    public order: number,
    public to: { zone: ZoneId; at?: number }
  ) {}
  run(cards: CardStatus[]) {
    const card = cards.filter((c) => c.id === this.cardId);
    if (card.length === 0) {
      return "Error";
    }
    card[0].location = this.to;
    card[0].order = this.order;
    const zoneName = getZoneName(card[0].location.zone);
    return `- ${card[0].name} -> ${zoneName}`;
  }
}

class EffectAction implements Action {
  constructor(public cardId: number, public actions: Action[]) {}
  run(cards: CardStatus[]) {
    let actionLogs = [];
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    const card = cards.filter((c) => c.id === this.cardId)[0];
    return `${card.name}の効果:\n${actionLogs.join("\n")}`;
  }
}

class XYZAction implements Action {
  constructor(
    public xyz: number,
    public order: number,
    public to: { zone: ZoneId; at: number },
    public actions: Action[]
  ) {}
  run(cards: CardStatus[]) {
    let actionLogs = [];
    const xyz = cards.filter((c) => c.id === this.xyz);
    if (xyz.length === 0) {
      return "Error";
    }
    xyz[0].location = this.to;
    xyz[0].order = this.order;
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `${xyz[0].name}をエクシーズ召喚:\n${actionLogs.join("\n")}`;
  }
}

class LinkAction implements Action {
  constructor(
    public link: number,
    public to: { zone: ZoneId; at: number },
    public actions: Action[]
  ) {}
  run(cards: CardStatus[]) {
    let actionLogs = [];
    const link = cards.filter((c) => c.id === this.link);
    if (xyz.length === 0) {
      return "Error";
    }
    link[0].location = this.to;
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `${link[0].name}をリンク召喚:\n${actionLogs.join("\n")}`;
  }
}

class InspectAction implements Action {
  constructor() {}
  run(cards: CardStatus[]) {
    const hand = cards.filter((c) => c.location.zone === "hand");
    const graveyard = cards.filter((c) => c.location.zone === "graveyard");
    const banished = cards.filter((c) => c.location.zone === "banished");

    return `現在の状態:\n- 手札:${hand
      .map((x) => x.name)
      .join(",")}\n- 墓地:${graveyard
      .map((x) => x.name)
      .join(",")}\n- 除外ゾーン:${banished.map((x) => x.name).join(",")}`;
  }
}

function getZoneName(zone: ZoneId) {
  switch (zone) {
    case "banished":
      return "除外ゾーン";
    case "extraDeck":
      return "EXデッキ";
    case "extraMonster":
      return "エクストラゾーン";
    case "field":
      return "フィールド";
    case "graveyard":
      return "墓地";
    case "hand":
      return "手札";
    case "mainDeck":
      return "デッキ";
    case "mainMonster":
      return "モンスターゾーン";
    case "spellAndTrap":
      return "魔法罠ゾーン";
    case "xyz":
      return "XYZ素材";
    default:
      break;
  }
}
