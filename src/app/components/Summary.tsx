import React from "react";
import { Log } from "../models/Log-model";
import { SnapShot } from "./Snapshot";
import * as styles from "./App.scss";
import { Link } from "react-router-dom";
import { Manual } from "../models/Manual-model";

export const Summary = (props: { id: number; manual: Manual }) => {
  const manual = props.manual;
  const initHands = manual.getAll().map((x) => x[0].snapshot.hands);
  const summary = initHands
    .map((h) => `${h.map((c) => c.name).join(",")}`)
    .map((m, i) => (
      <li key={i}>
        <Link className={styles.actionLog} key={i} to={`/${props.id}/${i}`}>
          {m}
        </Link>
      </li>
    ));
  return <div> {summary}</div>;
};
