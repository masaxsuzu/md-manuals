import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CardStatus } from "../models/CardStatus-model";
import { Snapshot } from "../models/Snapshot-model";
import { Action } from "../models/Action-model";
import { getSnapshots } from "../services/SnapshotService";
import * as styles from "./App.scss";
import { SnapShot } from "./Snapshot";
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
} from "../services/ActionService";
import { deck } from "../services/CardService";
import { Steps } from "./Steps";
import { Summary } from "./Summary";
import { Log } from "../models/Log-model";
import { getManual } from "../services/ManualService";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/md-manuals";
console.log(`ROUTER_BASENAME=${ROUTER_BASENAME}`);
console.log(`ROUTER_BASENAME=${process.env.PUBLIC_URL}`);

export const App = () => {
  const routers = manual([0, 1, 2]);
  routers.push(
    <Route key={"0"} path={""} element={<Navigate to="2"></Navigate>}></Route>
  );
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
    var x = [...Array(m.getSize())].map((_, i) => {
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
