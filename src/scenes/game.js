import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("InicialScene");
  }

  preload() {
    this.load.image("ambience", "assets/GameScenario-Sheet.png");
  }

  create() {
    // Adiciona a imagem do PC desligado
    const pc = this.add.image(640, 360, "ambience");

    const onButton = this.add.zone(855, 485, 100, 50); // x, y, largura, altura
    onButton.setOrigin(0.5); // Centraliza a zona
    onButton.setInteractive(); // Torna a zona interativa

    // Adiciona um evento de clique para a zona
    onButton.on("pointerdown", () => {
      this.scene.start("PC_on"); // Troca para a CenaLigado
    });
  }
}
