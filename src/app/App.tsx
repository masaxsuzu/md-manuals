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
import { Steps as Steps1 } from "../app/components/Steps";
import { Summary as Summary1 } from "../app/components/Summary";
import { getManual } from "../app/services/ManualService";
import { getManual as getManual2 } from "../app/v2/services/ManualService";
import { Steps as Steps2 } from "../app/v2/components/Steps";
import { Summary as Summary2 } from "../app/v2/components/Summary";
const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/md-manuals";
console.log(`ROUTER_BASENAME=${ROUTER_BASENAME}`);
console.log(`ROUTER_BASENAME=${process.env.PUBLIC_URL}`);

export const App = () => {
  console.log("X");
  const routers = manual1([0, 1, 2, 3]);
  routers.push(
    <Route
      key={"0"}
      path={""}
      element={<Navigate to="v2/1"></Navigate>}
    ></Route>
  );
  manual2([0]).forEach((x) => {
    routers.push(x);
  });
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Routes>{routers}</Routes>
    </BrowserRouter>
  );
};

function manual1(ns: number[]) {
  const routers: (JSX.Element | JSX.Element[])[] = [];
  ns.map((n) => {
    const key = n + 1;
    const m = getManual(n);
    routers.push(
      <Route
        key={`${key}`}
        path={`${key}`}
        element={<Summary1 id={key} manual={m}></Summary1>}
      ></Route>
    );
    let x = [...Array(m.getSize())].map((_, i) => {
      return (
        <Route
          key={`${key}/${i}`}
          path={`${key}/${i}`}
          element={<Steps1 manual={m} n={i}></Steps1>}
        ></Route>
      );
    });
    routers.push(x);
  });
  return routers;
}

export function manual2(ns: number[]) {
  const routers: (JSX.Element | JSX.Element[])[] = [];
  ns.map((n) => {
    const key = n + 1;
    const m = getManual2(n);
    routers.push(
      <Route
        key={`${key}`}
        path={`v2/${key}`}
        element={<Summary2 id={key} manual={m}></Summary2>}
      ></Route>
    );
    let x = [...Array(m.getSize())].map((_, i) => {
      return (
        <Route
          key={`${key}/${i}`}
          path={`v2/${key}/${i}`}
          element={<Steps2 manual={m} n={i}></Steps2>}
        ></Route>
      );
    });
    routers.push(x);
  });
  return routers;
}
