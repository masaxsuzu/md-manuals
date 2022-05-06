import React from "react";
import { SnapShot } from "./Snapshot";
import MediaQuery from "react-responsive";
import { Manual } from "../models/Manual-model";
import { getImages } from "../services/ImageService";
import * as styles from "../../App.scss";

const width = 48;
const height = 68;
const images = getImages();

export const Steps = (props: { manual: Manual; n: number }) => {
  const logs = props.manual.getNth(props.n);
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <MediaQuery query="(max-width: 399px)">
        <SnapShot
          itemWidth={width * 0.75}
          itemHeight={height * 0.75}
          images={images}
          snapshot={logs[count].snapshot}
        ></SnapShot>
      </MediaQuery>
      <MediaQuery query="(min-width: 400px)">
        <SnapShot
          itemWidth={width}
          itemHeight={height}
          images={images}
          snapshot={logs[count].snapshot}
        ></SnapShot>
      </MediaQuery>
      <button
        key="start"
        onClick={() => {
          setCount(0);
        }}
      >
        Start
      </button>
      <button
        key="back"
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
      >
        Back
      </button>
      <button
        key="next"
        onClick={() => {
          if (count < logs.length - 1) {
            setCount(count + 1);
          }
        }}
      >
        Next
      </button>
      <button
        key="end"
        onClick={() => {
          setCount(logs.length - 1);
        }}
      >
        End
      </button>
      <br></br>
      <p className={styles.actionLog}>{logs[count].actionLog}</p>
    </div>
  );
};
