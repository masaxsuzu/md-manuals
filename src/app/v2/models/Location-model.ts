import { ZoneId } from "./Zone-id";

export interface Location {
  zone: ZoneId;
  at?: number;
}
