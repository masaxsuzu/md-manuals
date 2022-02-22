import { Location } from "./Location-model";

export interface CardStatus {
  id: number;
  name: string;
  order: number;
  location: Location;
}
