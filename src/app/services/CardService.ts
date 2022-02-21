import { Images } from "../models/Images-model";
import images from "../../images/*.jpg";
import { ZoneId } from "../models/Zone-id";
import { Action } from "../models/Action-model";
import { CardStatus } from "../models/CardStatus-model";

let order = 0;
export function incrementOrder() {
    return order++;
}
export function deck(id: number, name: string): CardStatus {
    return { id: id, name: name, order: incrementOrder(), location: { zone: 'mainDeck' } };
}

export function exDeck(id: number, name: string): CardStatus {
    return { id: id, name: name, order: incrementOrder(), location: { zone: 'extraDeck' } };
}
