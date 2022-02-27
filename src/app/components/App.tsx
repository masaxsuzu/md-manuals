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
import { manual1 } from "../manuals/manual1";
import { Summary } from "./Summary";
import { manual2 } from "../manuals/manual2";
import { Log } from "../models/Log-model";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/md-manuals";
console.log(ROUTER_BASENAME);
console.log(process.env.PUBLIC_URL);

export const App = () => {
  const m1 = manual1();
  const m2 = manual2();
  const routers = manual([m1,m2]);
  routers.push(
    <Route key={"0"} path={""} element={<Navigate to="2"></Navigate>}></Route>
  );
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Routes>{routers}</Routes>
    </BrowserRouter>
  );
};

function manual(manuals: Log[][][]) {
  const routers: (JSX.Element | JSX.Element[])[] = [];
  manuals.forEach((m,i) => {
    const key = i + 1;
    routers.push(
    <Route
      key={`${key}`}
      path={`${key}`}
      element={<Summary id={key} manuals={m}></Summary>}
    ></Route>
    );
    routers.push(
      m.map((x, i) => {
        return (
          <Route
            key={`${key}/${i}`}
            path={`${key}/${i}`}
            element={<Steps logs={x}></Steps>}
          ></Route>
        );
      })
    );
  });
  return routers;
}
