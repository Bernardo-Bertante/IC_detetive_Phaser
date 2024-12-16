import Phaser from "phaser";

export default class PC extends Phaser.Scene {
  constructor() {
    super("PC_on");
  }

  preload() {
    this.load.image("PC_on", "assets/PC.png");
    this.load.image("chatScreen", "assets/ChatWindown.png");
    this.load.image("button", "assets/Button.png");
    this.load.image("mainScreen", "assets/GeneralScreen.png");
  }

  create() {
    this.add.image(640, 360, "mainScreen");
    this.add.image(640, 360, "PC_on");
    this.add.image(640, 360, "chatScreen");
    this.add.image(640, 360, "button");

    const chatContainer = this.createScrollableChat(996, 312, 874, 290);
    const playerInput = this.createTextArea(980, 499, 540, 58);

    // Dicionário de respostas predefinidas
    const respostas = {
      'print("qual a arma do crime?")':
        "Ah, jovem, você é muito apressado. Não sou desse tipo que responde de primeira. Insista mais!",
      'resposta = false\nwhile not resposta:\n    print("qual roupa ele usava?")\n    resposta = true':
        "Você é insistente, hein? Tudo bem, vou dizer! Ele usava um terno cinza, mas tinha uma gravata vermelha chamativa. Agora pare de me atormentar!",
      'resposta = false\nwhile resposta == false:\n    print("onde você estava?")':
        "Ei, jovem, seu código nunca vai parar assim! Eu sou insistente, mas até eu sei que preciso de uma condição para acabar com a conversa! Tente de novo, e talvez eu responda.",
      'resposta = false\ntentativas = 0\nwhile not resposta:\n    print("qual era o motivo do crime?")\n    tentativas += 1\n    if tentativas == 3:\n        resposta = true':
        "Você me cansou, garoto! O motivo do crime foi inveja, pura e simples. Agora pare de me fazer repetir!",
    };

    // Botão para enviar mensagem
    const sendButton = this.add.zone(980, 525, 100, 100);
    sendButton.setInteractive();

    sendButton.on("pointerdown", () => {
      let text = playerInput.value.trim(); // Captura o texto digitado
      if (text) {
        // Normaliza o texto do jogador
        const codigo_normalizado = text.trim().replace(/\t/g, "").toLowerCase();

        // Verifica se há uma resposta predefinida
        if (respostas[codigo_normalizado]) {
          this.addMessageToChat(chatContainer, `Você: ${text}`, "white");
          this.addMessageToChat(
            chatContainer,
            `Sr. Willow While: ${respostas[codigo_normalizado]}`,
            "yellow"
          );
        } else {
          this.addMessageToChat(chatContainer, `Você: ${text}`, "white");
          this.addMessageToChat(
            chatContainer,
            "Sr. Willow While: Desculpe, não entendi sua mensagem.",
            "yellow"
          );
        }

        playerInput.value = ""; // Limpa o campo de texto
      }
    });
  }

  createScrollableChat(x, y, width, height) {
    const chatDiv = document.createElement("div");
    chatDiv.style.position = "absolute";
    chatDiv.style.left = `${x - width / 2}px`;
    chatDiv.style.top = `${y - height / 2}px`;
    chatDiv.style.width = `${width}px`;
    chatDiv.style.height = `${height}px`;
    chatDiv.style.overflowY = "auto";
    chatDiv.style.background = "#000";
    chatDiv.style.border = "2px solid #fff";
    chatDiv.style.padding = "10px";
    chatDiv.style.color = "#fff";
    chatDiv.style.fontSize = "16px";
    chatDiv.style.lineHeight = "1.5";
    chatDiv.style.boxSizing = "border-box";

    document.body.appendChild(chatDiv);

    this.events.on("shutdown", () => chatDiv.remove());
    this.events.on("destroy", () => chatDiv.remove());

    return chatDiv;
  }

  addMessageToChat(chatContainer, message, color) {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.style.color = color;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  createTextArea(x, y, width, height) {
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Digite sua mensagem...";
    textarea.style.position = "absolute";
    textarea.style.left = `${x - width / 2}px`;
    textarea.style.top = `${y - height / 2}px`;
    textarea.style.width = `${width}px`;
    textarea.style.height = `${height}px`;
    textarea.style.background = "#fff";
    textarea.style.border = "2px solid #000";
    textarea.style.fontSize = "20px";
    textarea.style.padding = "10px";
    textarea.style.resize = "none";

    document.body.appendChild(textarea);

    this.events.on("shutdown", () => textarea.remove());
    this.events.on("destroy", () => textarea.remove());

    return textarea;
  }
}
