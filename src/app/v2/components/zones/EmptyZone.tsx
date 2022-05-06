import * as React from "react";
import { Images } from "../../../models/Images-model";
import * as styles from "../../../App.scss";
import { getTileStyle } from "../../services/StyleService";

export const EmptyZone = (props: {
  images: Images;
  width: number;
  height: number;
}) => {
  const tileStyle = getTileStyle(props.width, props.height, false);
  return (
    <img
      style={tileStyle}
      className={styles.empty2}
      src={props.images["NULL"]}
      width={props.width}
      height={props.height}
    ></img>
  );
};
