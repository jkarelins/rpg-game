import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(player) {
  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return dispatchMove("LEFT");
      case 38:
        return dispatchMove("UP");
      case 39:
        return dispatchMove("RIGHT");
      case 40:
        return dispatchMove("DOWN");
      default:
        console.log(e.keyCode);
    }

    function getNewPosition(direction) {
      const oldPos = store.getState().player.position;
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
      return newPos[0] >= 0 &&
        newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
        newPos[1] >= 0 &&
        newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
        ? newPos
        : oldPos;
    }

    function dispatchMove(direction) {
      const oldPos = store.getState().player.position;
      store.dispatch({
        type: "MOVE_PLAYER",
        payload: {
          position: observeBoundaries(oldPos, getNewPosition(direction)),
        },
      });
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });
  return player;
}
