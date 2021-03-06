import * as React from "react";
import { Images } from "../../models/Images-model";
import { Tile } from "../../models/Tile-model";
import * as styles from "../../App.scss";

export const BanishedZone = (props: {
  images: Images;
  width: number;
  height: number;
  tiles: Tile[];
}) => {
  const src =
    props.tiles.length > 0 ? props.tiles[props.tiles.length - 1].name : "NULL";
  const title = props.tiles.map((t) => t.name).join(" ");
  return (
    <img
      title={title}
      className={styles.card}
      src={props.images[src]}
      width={props.width}
      height={props.height}
    ></img>
  );
};
