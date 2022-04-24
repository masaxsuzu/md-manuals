import React from "react";
import { Log } from "../models/Log-model";
import { SnapShot } from "./Snapshot";
import * as styles from "./App.scss";
import MediaQuery from "react-responsive";
import { Manual1 } from "../manuals/manual1";
import { Manual } from "../models/Manual-model";

const width = 48;
const height = 67.56;

export const Steps = (props: { manual: Manual; n: number }) => {
  const logs = props.manual.getNth(props.n);
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <MediaQuery query="(max-width: 399px)">
        <SnapShot
          itemWidth={width * 0.75}
          itemHeight={height * 0.75}
          snapshot={logs[count].snapshot}
        ></SnapShot>
      </MediaQuery>
      <MediaQuery query="(min-width: 400px)">
        <SnapShot
          itemWidth={width}
          itemHeight={height}
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
