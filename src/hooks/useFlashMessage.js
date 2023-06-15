import bus from "../utils/bus";

export default function useFlashMessage() {
  // essa função faz um bus.emit emitindo uma mensagem quem pode ser captada e formatada para aparecer para o usuário
  // aqui nos parâmetros, passa a mensagem e o tipo: mensagem de erro,  mensagem de sucesso, alerta, etc
  function setFlashMessage(msg, type) {
    bus.emit("flash", {
      message: msg,
      type: type,
    });
  }
  return { setFlashMessage };
}
