import { Images } from "../models/Images-model";
import images from "../../../images/v2/*.jpg";

export function getImages(): Images {
  return images;
}
