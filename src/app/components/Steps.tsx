import React from "react";
import { Log } from "../models/Log-model";
import { SnapShot } from "./Snapshot";
import * as styles from "./App.scss";
import MediaQuery from "react-responsive";

const width = 48;
const height = 67.56;

export const Steps = (props: { logs: Log[] }) => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <MediaQuery query="(max-width: 399px)">
        <SnapShot
          itemWidth={width * 0.75}
          itemHeight={height * 0.75}
          snapshot={props.logs[count].snapshot}
        ></SnapShot>
      </MediaQuery>
      <MediaQuery query="(min-width: 400px)">
        <SnapShot
          itemWidth={width}
          itemHeight={height}
          snapshot={props.logs[count].snapshot}
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
          if (count < props.logs.length - 1) {
            setCount(count + 1);
          }
        }}
      >
        Next
      </button>
      <button
        key="end"
        onClick={() => {
          setCount(props.logs.length - 1);
        }}
      >
        End
      </button>
      <br></br>
      <p className={styles.actionLog}>{props.logs[count].actionLog}</p>
    </div>
  );
};
