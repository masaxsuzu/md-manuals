import * as React from "react";
import { Images } from "../../models/Images-model";
import { Tile } from "../../models/Tile-model";
import * as styles from "../App.scss";

export const ExtraDeckZone = (props: {
  images: Images;
  width: number;
  height: number;
  tiles: Tile[];
}) => {
  const src = props.tiles.length > 0 ? "裏" : "NULL";
  return (
    <img
      className={styles.card}
      src={props.images[src]}
      width={props.width}
      height={props.height}
    ></img>
  );
};
