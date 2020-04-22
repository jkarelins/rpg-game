const tiles = new Array(10).fill(new Array(20).fill(0)).map((row) =>
  row.map((tile) => {
    const rand = Math.random();
    if (rand < 0.05) {
      return (tile = 5);
    } else if (rand > 0.05 && rand < 0.1) {
      return (tile = 6);
    } else {
      return 0;
    }
  })
);

console.log(tiles);

export { tiles };
