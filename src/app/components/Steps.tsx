import React from "react";
import { Log } from "../models/Log-model";
import { SnapShot } from "./Snapshot";
import * as styles from "./App.scss";

export const Steps = (props: { logs: Log[] }) => {
    const [count, setCount] = React.useState(0);
    return (<div>
        <SnapShot snapshot={props.logs[count].snapshot}></SnapShot>
        <button key='start' onClick={() => {
            setCount(0);
        }}>Start</button>
        <button key='back' onClick={() => {
            if (count > 0) {
                setCount(count - 1);
            }
        }}>Back</button>
        <button key='next' onClick={() => {
            if (count < props.logs.length - 1) {
                setCount(count + 1);
            }
        }}>Next</button>
        <button key='end' onClick={() => {
            setCount(props.logs.length -1);
        }}>End</button>
        <br></br>
        <p className={styles.actionLog}>
            {props.logs[count].actionLog}
        </p>
    </div>);
}
