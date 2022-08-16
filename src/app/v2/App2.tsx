import React from "react";
import { getImages } from "./services/ImageService";
import { Tile } from "./models/Tile-model";
import { Manual1 } from "./manuals/Manual1";
import { Steps } from "./components/Steps";
const images = getImages();

export const App2 = () => {
  const w = 48;
  const h = 68;
  const extraMonsters: Tile[] = [
    {
      head: true,
      location: 1,
      name: "デスフェニ",
    },
  ];
  const banished: Tile[] = [
    {
      head: true,
      location: 1,
      name: "デスフェニ",
    },
    {
      head: true,
      location: 1,
      name: "デスフェニ",
    },
  ];
  const mainMonsters: Tile[] = [
    {
      head: true,
      location: 3,
      name: "デスフェニ",
    },
  ];

  const cemetery: Tile[] = [
    {
      head: true,
      location: 1,
      name: "デスフェニ",
    },
    {
      head: true,
      location: 2,
      name: "デスフェニ",
    },
  ];
  const magicAndTraps: Tile[] = [
    {
      head: false,
      location: 1,
      name: "ANY",
    },
    {
      head: false,
      location: 4,
      name: "ANY",
    },
  ];
  const hands: Tile[] = [
    {
      head: false,
      location: 1,
      name: "ANY",
    },
    {
      head: false,
      location: 2,
      name: "ANY",
    },
    {
      head: false,
      location: 3,
      name: "ANY",
    },
    {
      head: false,
      location: 4,
      name: "ANY",
    },
    {
      head: false,
      location: 5,
      name: "ANY",
    },
  ];
  let zones = [];
  const m1 = new Manual1();
  zones.push(<Steps key={0} manual={m1} n={0}></Steps>);
  return <div>{zones}</div>;
};
