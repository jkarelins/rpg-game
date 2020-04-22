import React from "react";
import World from "./features/world";

function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "400px",
        margin: "20px auto",
      }}
    >
      <World />
    </div>
  );
}

export default App;
