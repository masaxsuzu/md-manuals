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
  const rows2: Tile[] = [
    {
      head: true,
      location: 1,
      name: "NULL",
    },
    {
      head: true,
      location: 2,
      name: "デスフェニ",
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
    {
      head: false,
      location: 6,
      name: "ANY",
    },
    {
      head: true,
      location: 7,
      name: "NULL",
    },
  ];
  const rows4: Tile[] = [
    {
      head: true,
      location: 1,
      name: "NULL",
    },
    {
      head: false,
      location: 3,
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
    {
      head: false,
      location: 6,
      name: "ANY",
    },
    {
      head: true,
      location: 7,
      name: "NULL",
    },
  ];
  let zones = [];
  zones.push(
    <SnapShot
      itemHeight={h}
      itemWidth={w}
      images={images}
      extraMonsters={[]}
      vanished={[]}
      field={[]}
      mainMonsters={rows2}
      cemetery={[]}
      magicAndTraps={[]}
      hands={rows4}
      key={0}
    ></SnapShot>
  );
  return <div>{zones}</div>;
};
