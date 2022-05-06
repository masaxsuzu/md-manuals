import React from "react";
import { Images } from "../models/Images-model";
import { Snapshot } from "../models/Snapshot-model";
import { Tile } from "../models/Tile-model";
import { EmptyZone } from "./zones/EmptyZone";
import { TileZone } from "./zones/TileZone";

export const SnapShot = (props: {
  itemWidth: number;
  itemHeight: number;
  images: Images;
  snapshot: Snapshot;
}) => {
  let rows1 = toRows1(
    props.itemWidth,
    props.itemHeight,
    props.images,
    props.snapshot
  );

  let rows2 = toRows2(
    props.itemWidth,
    props.itemHeight,
    props.images,
    props.snapshot
  );

  let rows3 = toRows3(
    props.itemWidth,
    props.itemHeight,
    props.images,
    props.snapshot
  );

  let rows4 = toRows4(
    props.itemWidth,
    props.itemHeight,
    props.images,
    props.snapshot
  );

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

const toRows1 = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  props: {
    extraMonsters: Tile[];
    vanished: Tile[];
  }
) => {
  let rows = [];
  rows.push(
    <EmptyZone
      key={0}
      width={itemWidth}
      height={itemHeight}
      images={images}
    ></EmptyZone>
  );
  rows.push(
    <EmptyZone
      key={1}
      width={itemWidth}
      height={itemHeight}
      images={images}
    ></EmptyZone>
  );

  if (props.extraMonsters.length > 0) {
    rows.push(
      <TileZone
        key={2}
        width={itemWidth}
        height={itemHeight}
        images={images}
        tiles={[props.extraMonsters[0]]}
        isRotated={false}
      ></TileZone>
    );
  } else {
    rows.push(
      <TileZone
        key={2}
        width={itemWidth}
        height={itemHeight}
        images={images}
        tiles={[]}
        isRotated={false}
      ></TileZone>
    );
  }

  rows.push(
    <EmptyZone
      key={3}
      width={itemWidth}
      height={itemHeight}
      images={images}
    ></EmptyZone>
  );

  if (props.extraMonsters.length > 1) {
    rows.push(
      <TileZone
        key={4}
        width={itemWidth}
        height={itemHeight}
        images={images}
        tiles={[props.extraMonsters[1]]}
        isRotated={false}
      ></TileZone>
    );
  } else {
    rows.push(
      <TileZone
        key={4}
        width={itemWidth}
        height={itemHeight}
        images={images}
        tiles={[]}
        isRotated={false}
      ></TileZone>
    );
  }

  rows.push(
    <EmptyZone
      key={5}
      width={itemWidth}
      height={itemHeight}
      images={images}
    ></EmptyZone>
  );

  rows.push(
    <TileZone
      key={6}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={props.vanished}
      isRotated={true}
    ></TileZone>
  );
  return rows;
};

const toRows2 = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  props: {
    field: Tile[];
    mainMonsters: Tile[];
    cemetery: Tile[];
  }
) => {
  let rows = [];
  rows.push(
    <TileZone
      key={0}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={props.field}
      isRotated={false}
    ></TileZone>
  );

  rows.push(toMainCards(itemWidth, itemHeight, images, props.mainMonsters));

  rows.push(
    <TileZone
      key={6}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={props.cemetery}
      isRotated={false}
    ></TileZone>
  );

  return rows;
};

const toRows3 = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  props: {
    magicAndTraps: Tile[];
  }
) => {
  let rows = [];
  rows.push(
    <TileZone
      key={0}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={[]}
      isRotated={false}
    ></TileZone>
  );

  rows.push(toMainCards(itemWidth, itemHeight, images, props.magicAndTraps));

  rows.push(
    <TileZone
      key={6}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={[]}
      isRotated={false}
    ></TileZone>
  );

  return rows;
};

const toRows4 = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  props: {
    hands: Tile[];
  }
) => {
  let rows = [];

  rows.push(toHands(itemWidth, itemHeight, images, props.hands));

  return rows;
};

const toMainCards = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  cards: Tile[]
) => {
  let tile1 = cards.filter((c) => c.location === 1);
  let tile2 = cards.filter((c) => c.location === 2);
  let tile3 = cards.filter((c) => c.location === 3);
  let tile4 = cards.filter((c) => c.location === 4);
  let tile5 = cards.filter((c) => c.location === 5);

  let tiles = [tile1, tile2, tile3, tile4, tile5];

  return tiles.map((t, key) => (
    <TileZone
      key={key + 1}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={t}
      isRotated={false}
    ></TileZone>
  ));
};

const toHands = (
  itemWidth: number,
  itemHeight: number,
  images: Images,
  cards: Tile[]
) => {
  let tile1 = cards.filter((c) => c.location === 1);
  let tile2 = cards.filter((c) => c.location === 2);
  let tile3 = cards.filter((c) => c.location === 3);
  let tile4 = cards.filter((c) => c.location === 4);
  let tile5 = cards.filter((c) => c.location === 5);
  let tile6 = cards.filter((c) => c.location === 6);
  let tile7 = cards.filter((c) => c.location === 7);

  let tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7];

  return tiles.map((t, key) => (
    <TileZone
      key={key}
      width={itemWidth}
      height={itemHeight}
      images={images}
      tiles={t}
      isRotated={false}
    ></TileZone>
  ));
};
