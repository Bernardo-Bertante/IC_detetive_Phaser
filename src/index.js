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
  parent: "contenedor", // ID do div no index.html onde o jogo será renderizado
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: "#000000", // Cor de fundo do jogo
  scene: [Game, PC], // As cenas que você está usando no seu jogo
};

const game = new Phaser.Game(config);
