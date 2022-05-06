import * as React from "react";
import { Images } from "../../../models/Images-model";
import * as styles from "../../../App.scss";
import { getCardStyle } from "../../services/StyleService";

export const EmptyZone = (props: {
  images: Images;
  width: number;
  height: number;
}) => {
  const tileStyle = getCardStyle(props.width, props.height, false);
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
