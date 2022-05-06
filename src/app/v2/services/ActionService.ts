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

export function toHand(cardId: number, at?: number): Action {
  return new MoveAction(cardId, incrementOrder(), {
    zone: "hand",
    at: at,
    head: true,
  });
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
