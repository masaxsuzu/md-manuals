import React from "react";
import { getImages } from "./services/ImageService";
import { TileZone } from "./components/zones/TileZone";
import { Tile } from "./models/Tile-model";
import { EmptyZone } from "../components/zones/EmptyZone";
import { SnapShot } from "./components/zones/Snapshot";
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
  const vanished: Tile[] = [
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
  zones.push(
    <SnapShot
      itemHeight={h}
      itemWidth={w}
      images={images}
      snapshot={{
        extraMonsters: extraMonsters,
        vanished: vanished,
        field: [],
        mainMonsters: mainMonsters,
        cemetery: cemetery,
        magicAndTraps: magicAndTraps,
        hands: hands,
      }}
      key={0}
    ></SnapShot>
  );
  return <div>{zones}</div>;
};
