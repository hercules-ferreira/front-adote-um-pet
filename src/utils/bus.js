//  ==> esse events é para pegar as respostas do console, como erro do axios, e mostrar para o usuário.
// por exemplo, foi feito a conexão com o axios, mas no cadastro não foi passado o nome no input ===> no console o axios:
//  emitiu uma resposta que foi cadastrada backend:
// ===> O nome é obrigatório

// 1 -  npm i events
// 2 - importa o events
// 3 - export
// 4 - importar essa  função EventEmitter(); ===> no useFlashMessage.js
// 5 - depois do import, e fazer a função, dentro do useFlashMessage.js, ela poderá ser chamada usada

import EventEmitter from "events";
export default new EventEmitter();
