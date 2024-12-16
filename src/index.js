import Phaser from "phaser";
import Game from "./scenes/game";
import PC from "./scenes/pc";

const config = {
  type: Phaser.AUTO,
  width: 1281,
  height: 720,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "contenedor",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: "#000000",
  scene: [Game, PC],
};

const game = new Phaser.Game(config);
