import store from "../../config/store";
import { SPRITE_SIZE } from "../../config/constants";

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

    function dispatchMove(direction) {
      store.dispatch({
        type: "MOVE_PLAYER",
        payload: {
          position: getNewPosition(direction),
        },
      });
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });
  return player;
}
