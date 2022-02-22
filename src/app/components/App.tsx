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

export const App = () => {
  const m1 = manual1();
  const routers = [];
  routers.push(
    <Route key={"0"} path={""} element={<Navigate to="1"></Navigate>}></Route>
  );
  routers.push(
    <Route
      key={`1`}
      path={`1`}
      element={<Summary id={1} manuals={m1}></Summary>}
    ></Route>
  );
  routers.push(
    m1.map((x, i) => {
      return (
        <Route
          key={`1/${i}`}
          path={`1/${i}`}
          element={<Steps logs={x}></Steps>}
        ></Route>
      );
    })
  );
  return (
    <BrowserRouter>
      <Routes>{routers}</Routes>
    </BrowserRouter>
  );
};
