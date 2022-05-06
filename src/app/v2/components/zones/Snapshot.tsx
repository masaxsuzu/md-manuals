import React from "react";
import { Images } from "../../models/Images-model";
import { Tile } from "../../models/Tile-model";
import { EmptyZone } from "./EmptyZone";
import { TileZone } from "./TileZone";

export const SnapShot = (props: {
  itemWidth: number;
  itemHeight: number;
  images: Images;
  extraMonsters: Tile[];
  vanished: Tile[];
  field: Tile[];
  mainMonsters: Tile[];
  cemetery: Tile[];
  magicAndTraps: Tile[];
  hands: Tile[];
}) => {
  let rows1 = [0, 1, 2, 3, 4, 5, 6].map((key) => (
    <EmptyZone
      width={props.itemWidth}
      height={props.itemHeight}
      key={key}
      images={props.images}
    ></EmptyZone>
  ));

  let rows2 = props.mainMonsters.map((m, key) => (
    <TileZone
      width={props.itemWidth}
      height={props.itemHeight}
      key={key}
      images={props.images}
      tiles={[m]}
      isRotated={false}
    ></TileZone>
  ));

  let rows3 = [0, 1, 2, 3, 4, 5, 6].map((key) => (
    <EmptyZone
      width={props.itemWidth}
      height={props.itemHeight}
      key={key}
      images={props.images}
    ></EmptyZone>
  ));

  let rows4 = props.hands.map((m, key) => (
    <TileZone
      width={props.itemWidth}
      height={props.itemHeight}
      key={key}
      images={props.images}
      tiles={[m]}
      isRotated={false}
    ></TileZone>
  ));

  return (
    <div>
      {rows1}
      <br></br>
      {rows2}
      <br></br>
      {rows3}
      <br></br>
      <br></br>
      {rows4}
    </div>
  );
};
