import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CardStatus } from "../app/models/CardStatus-model";
import { Snapshot } from "../app/models/Snapshot-model";
import { Action } from "../app/models/Action-model";
import { getSnapshots } from "../app/services/SnapshotService";
import * as styles from "../app/App.scss";
import { SnapShot } from "../app/components/Snapshot";
import {
  initCards,
  ef,
  ns,
  ss,
  xyz,
  link,
  inspect,
  toHand,
  toMainMonster,
  toGraveyard,
  toBanished,
  toSpellAndTrap,
  toXyz,
} from "../app/services/ActionService";
import { deck } from "../app/services/CardService";
import { Steps } from "../app/components/Steps";
import { Summary } from "../app/components/Summary";
import { Log } from "../app/models/Log-model";
import { getManual } from "../app/services/ManualService";
import { App2 } from "./v2/App2";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/md-manuals";
console.log(`ROUTER_BASENAME=${ROUTER_BASENAME}`);
console.log(`ROUTER_BASENAME=${process.env.PUBLIC_URL}`);

export const App = () => {
  console.log("X");
  const routers = manual([0, 1, 2, 3]);
  routers.push(
    <Route key={"0"} path={""} element={<Navigate to="2"></Navigate>}></Route>
  );
  routers.push(<Route key={"v2"} path={"v2"} element={<App2></App2>}></Route>);
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Routes>{routers}</Routes>
    </BrowserRouter>
  );
};

function manual(ns: number[]) {
  const routers: (JSX.Element | JSX.Element[])[] = [];
  ns.map((n) => {
    const key = n + 1;
    const m = getManual(n);
    routers.push(
      <Route
        key={`${key}`}
        path={`${key}`}
        element={<Summary id={key} manual={m}></Summary>}
      ></Route>
    );
    let x = [...Array(m.getSize())].map((_, i) => {
      return (
        <Route
          key={`${key}/${i}`}
          path={`${key}/${i}`}
          element={<Steps manual={m} n={i}></Steps>}
        ></Route>
      );
    });
    routers.push(x);
  });
  return routers;
}
