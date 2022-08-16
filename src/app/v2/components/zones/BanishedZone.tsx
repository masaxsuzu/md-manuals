import * as React from "react";
import { Images } from "../../models/Images-model";
import { Tile } from "../../models/Tile-model";
import * as styles from "../../../App.scss";
import { getTileStyle } from "../../services/StyleService";

export const BanishedZone = (props: {
  images: Images;
  width: number;
  height: number;
  tiles: Tile[];
}) => {
  const tile =
    props.tiles.length > 0 ? props.tiles[props.tiles.length - 1] : null;
  let src = tile == null ? "NULL" : tile.head ? tile.name : "ANY";
  const title = props.tiles.map((t) => t.name).join(" ");

  const tileStyle = getTileStyle(props.width, props.height, true);
  return (
    <img
      style={tileStyle}
      title={title}
      className={styles.empty2}
      src={props.images[src]}
      width={props.width}
      height={props.height}
    ></img>
  );
};
