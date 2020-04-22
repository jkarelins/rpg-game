import React from "react";
import { SPRITE_SIZE } from "../../config/constants";

import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 5:
      return "rock";
    case 6:
      return "tree";
    default:
  }
}

function MapRow(props) {
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE,
      }}
    >
      {props.tiles.map((tile, i) => (
        <MapTile key={i} tile={tile} />
      ))}
    </div>
  );
}

function MapTile(props) {
  console.log(SPRITE_SIZE);
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    />
  );
}

function Map(props) {
  return (
    <div
      style={{
        width: "800px",
        height: "400px",
        border: "4px solid white",
        margin: "10px auto",
      }}
    >
      {props.tiles.map((row, i) => (
        <MapRow tiles={row} key={i} />
      ))}
    </div>
  );
}

export default Map;
