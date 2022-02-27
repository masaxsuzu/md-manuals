import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { CardStatus } from "../models/CardStatus-model";
import { Snapshot } from "../models/Snapshot-model";
import { Tile } from "../models/Tile-model";
import { ZoneId } from "../models/Zone-id";
import { getImages } from "../services/ImageService";
import { BanishedZone } from "./zones/BanishedZone";
import { FieldZone } from "./zones/FieldZone";
import * as styles from "./App.scss";
import { GraveyardZone } from "./zones/GraveyardZone";
import { ExtraDeckZone } from "./zones/ExtraDeckZone";
import { MainDeckZone } from "./zones/MainDeckZone";
import { CardZone } from "./zones/CardZone";
import { EmptyZone } from "./zones/EmptyZone";

const col = 7;
const images = getImages();

export const SnapShot = (props: {
  itemWidth: number;
  itemHeight: number;
  snapshot: Snapshot;
}) => {
  const width = props.itemWidth;
  const height = props.itemHeight;
  const rows = [
    toRow(width, height, "extraMonster", props.snapshot.extraMonsters),
    toRow(width, height, "mainMonster", props.snapshot.mainMonsters),
    toRow(width, height, "spellAndTrap", props.snapshot.spellAndTraps),
    toRow(width, height, "hand", props.snapshot.hands.filter(h => h.location.at ? h.location.at : 0  < 5)),
    toRow(width, height, "hand", props.snapshot.hands.filter(h => h.location.at ? h.location.at : 0 >= 5)),
  ];

  const banished = toRow(width, height, "banished", props.snapshot.banished);
  const field = props.snapshot.field
    ? toRow(width, height, "banished", [props.snapshot.field])
    : [];
  const graveyard = toRow(width, height, "graveyard", props.snapshot.graveyard);
  const extraDeck = toRow(width, height, "extraDeck", props.snapshot.extraDeck);
  const mainDeck = toRow(width, height, "mainDeck", props.snapshot.mainDeck);

  const tiles: any[] = [];
  for (let index = 0; index < col * 5; index++) {
    let row = rows[Math.floor(index / col)];
    const item = row ? row.find((x) => x.location === index) : null;
    if (
      [
        col * 0,
        col * 0 + 1,
        col * 0 + 3,
        col * 0 + 5,
        col * 3,
        col * 3 + (col - 1),
        col * 4 ,
        col * 4 + (col - 1),
      ].includes(index)
    ) {
      tiles.push(
        <EmptyZone
          key={index}
          images={images}
          width={width}
          height={height}
        ></EmptyZone>
      );
    } else if (index === col - 1) {
      //banished
      tiles.push(
        <BanishedZone
          key={index}
          images={images}
          width={width}
          height={height}
          tiles={banished}
        ></BanishedZone>
      );
    } else if (index === col) {
      //field
      tiles.push(
        <FieldZone
          key={index}
          images={images}
          width={width}
          height={height}
          tiles={field}
        ></FieldZone>
      );
    } else if (index === 2 * col - 1) {
      //graveyard
      tiles.push(
        <GraveyardZone
          key={index}
          images={images}
          width={width}
          height={height}
          tiles={graveyard}
        ></GraveyardZone>
      );
    } else if (index === 2 * col) {
      //extraDeck
      tiles.push(
        <ExtraDeckZone
          key={index}
          images={images}
          width={width}
          height={height}
          tiles={extraDeck}
        ></ExtraDeckZone>
      );
    } else if (index === 3 * col - 1) {
      //mainDeck
      tiles.push(
        <MainDeckZone
          key={index}
          images={images}
          width={width}
          height={height}
          tiles={mainDeck}
        ></MainDeckZone>
      );
    } else {
      // other cards
      tiles.push(
        <CardZone
          key={index}
          images={images}
          width={width}
          height={height}
          item={item}
        ></CardZone>
      );
    }
    if (index % col === col - 1) {
      tiles.push(<br key={"br" + index}></br>);
    }
  }
  const fields = <div>{tiles}</div>;

  return fields;
};

function toRow(
  width: number,
  height: number,
  zone: ZoneId,
  cards: CardStatus[]
): Tile[] {
  switch (zone) {
    case "extraMonster":
      return cards.map((c) => {
        return {
          name: c.name,
          width: width,
          height: height,
          location: c.location.at === 0 ? 2 : 4,
        };
      });
    case "mainMonster":
      return cards.map((c) => {
        let loc = c.location.at || 0;
        return {
          name: c.name,
          width: width,
          height: height,
          location: loc + col + 1,
        };
      });
    case "spellAndTrap":
    case "mainMonster":
      return cards.map((c) => {
        let loc = c.location.at || 0;
        return {
          name: c.name,
          width: width,
          height: height,
          location: loc + col * 2 + 1,
        };
      });
    case "hand":
      return cards.map((c) => {
        let loc = c.location.at || 0;
        return {
          name: c.name,
          width: width,
          height: height,
          location: loc < 5 
            ? loc + col * 3 + 1
            : loc - 5 + col*4 + 1,
        };
      });
    default:
      let loc = 0;
      switch (zone) {
        case "banished":
          loc = 6;
          break;
        case "field":
          loc = 7;
        case "graveyard":
          loc = 13;
        case "extraDeck":
          loc = 14;
        case "mainDeck":
          loc = 20;
        default:
          break;
      }
      return cards.map((c) => {
        return {
          name: c.name,
          width: width,
          height: height,
          location: loc,
        };
      });
  }
}
