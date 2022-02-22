import { Images } from "../models/Images-model";
import images from "../../images/*.jpg";

export function getImages(): Images {
  return images;
}
