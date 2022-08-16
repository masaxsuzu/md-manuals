import { ZoneId } from "../models/Zone-id";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";

let order = 0;
export function incrementOrder() {
  return order++;
}

export function deck(id: number, name: string): CardStatus {
  return {
    id: id,
    name: name,
    order: incrementOrder(),
    location: { zone: "mainDeck" },
    head: false,
  };
}

export function exDeck(id: number, name: string): CardStatus {
  return {
    id: id,
    name: name,
    order: incrementOrder(),
    location: { zone: "extraDeck" },
    head: false,
  };
}

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
    head: true,
  });
}

export function toHand(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "hand",
    at: at,
    head: true,
  });
}

export function toExtraMonster(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "extraMonster",
    at: at,
  });
}

export function toMainMonster(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "mainMonster",
    at: at,
  });
}

export function toSpellAndTrap(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "magicAndTrap",
    at: at,
  });
}

export function toField(cardId: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "field",
  });
}

export function toScale(cardId: number, at: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "magicAndTrap",
    at: at > 0 ? 4 : 0,
    head: true,
  });
}

export function toExtraDeck(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "extraDeck",
    head: true,
  });
}

export function toCemetery(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "cemetery",
    at: at,
    head: true,
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

export function synchro(
  synchro: number,
  zone: ZoneId,
  at: number,
  actions: Action[]
): Action {
  return new SynchroAction(
    synchro,
    incrementOrder(),
    { zone: zone, at: at },
    actions
  );
}

export function pendulum(actions: Action[]): Action {
  return new PendulumAction(actions);
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
    public to: { zone: ZoneId; at?: number; head?: boolean }
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
    public to: { zone: ZoneId; at?: number; head?: boolean }
  ) {}
  run(cards: CardStatus[]) {
    const card = cards.filter((c) => c.id === this.cardId);
    if (card.length === 0) {
      return "Error";
    }
    card[0].location = this.to;
    card[0].order = this.order;
    if (this.to.head !== undefined) {
      card[0].head = this.to.head;
    }
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

class SynchroAction implements Action {
  constructor(
    public synchro: number,
    public order: number,
    public to: { zone: ZoneId; at: number },
    public actions: Action[]
  ) {}
  run(cards: CardStatus[]) {
    let actionLogs = [];
    const synchro = cards.filter((c) => c.id === this.synchro);
    if (synchro.length === 0) {
      return "Error";
    }
    synchro[0].location = this.to;
    synchro[0].order = this.order;
    synchro[0].head = true;
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `${synchro[0].name}をシンクロ召喚:\n${actionLogs.join("\n")}`;
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
    xyz[0].head = true;
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `${xyz[0].name}をエクシーズ召喚:\n${actionLogs.join("\n")}`;
  }
}

class PendulumAction implements Action {
  constructor(public actions: Action[]) {}
  run(cards: CardStatus[]) {
    let actionLogs = [];
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `ペンデュラム召喚:\n${actionLogs.join("\n")}`;
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
    link[0].head = true;
    for (const action of this.actions) {
      actionLogs.push(action.run(cards));
    }
    return `${link[0].name}をリンク召喚:\n${actionLogs.join("\n")}`;
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
    case "cemetery":
      return "墓地";
    case "hand":
      return "手札";
    case "mainDeck":
      return "デッキ";
    case "mainMonster":
      return "モンスターゾーン";
    case "magicAndTrap":
      return "魔法罠ゾーン";
    case "xyz":
      return "XYZ素材";
    default:
      break;
  }
}
