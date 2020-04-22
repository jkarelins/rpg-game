import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(player) {
  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return attemptMove("LEFT");
      case 38:
        return attemptMove("UP");
      case 39:
        return attemptMove("RIGHT");
      case 40:
        return attemptMove("DOWN");
      default:
        console.log(e.keyCode);
    }

    function getNewPosition(oldPos, direction) {
      switch (direction) {
        case "LEFT":
          return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
        case "RIGHT":
          return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
        case "UP":
          return [oldPos[0], oldPos[1] - SPRITE_SIZE];
        case "DOWN":
          return [oldPos[0], oldPos[1] + SPRITE_SIZE];
        default:
          return oldPos;
      }
    }

    function observeBoundaries(oldPos, newPos) {
      return (
        newPos[0] >= 0 &&
        newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
        newPos[1] >= 0 &&
        newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
      );
    }

    function observeBlockages(oldPos, newPos) {
      const tiles = store.getState().map.tiles;
      const y = newPos[1] / SPRITE_SIZE;
      const x = newPos[0] / SPRITE_SIZE;
      const nextTile = tiles[y][x];
      return nextTile < 5;
    }

    function attemptMove(direction) {
      const oldPos = store.getState().player.position;
      const newPos = getNewPosition(oldPos, direction);
      if (
        observeBoundaries(oldPos, newPos) &&
        observeBlockages(oldPos, newPos)
      ) {
        dispatchMove(newPos);
      }
    }

    function dispatchMove(newPos) {
      store.dispatch({
        type: "MOVE_PLAYER",
        payload: {
          position: newPos,
        },
      });
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });
  return player;
}
