import * as React from "react";
import { Images } from "../../models/Images-model";
import { Tile } from "../../models/Tile-model";
import * as styles from "../App.scss";

export const CardZone = (props: {
  images: Images;
  width: number;
  height: number;
  item: Tile | null | undefined;
}) => {
  if (props.item) {
    return (
      <img
        className={styles.card}
        src={props.images[props.item.name]}
        width={props.width}
        height={props.height}
      ></img>
    );
  } else {
    return (
      <img
        className={styles.card}
        src={props.images["NULL"]}
        width={props.width}
        height={props.height}
      ></img>
    );
  }
};
