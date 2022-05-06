import * as React from "react";
import { Images } from "../../models/Images-model";
import * as styles from "../../App.scss";

export const EmptyZone = (props: {
  images: Images;
  width: number;
  height: number;
}) => {
  return (
    <img
      className={styles.empty}
      src={props.images["NULL"]}
      width={props.width}
      height={props.height}
    ></img>
  );
};
