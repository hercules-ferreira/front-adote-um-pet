// 1 - faz  o  useAuth();
// 2 - depois o createContext();
// 3 - exporta ele para o routes.js para envolver todas as rotas

import { createContext } from "react";
import useAuth from "../hooks/useAuth";

// criação do context
const Context = createContext();

// criação do provedor que dará esse context para outras entidades (o provedor ou provider é um funcionário)
// o {children} é para o userProvider saber o que tem que ser impresso dentro dele (manual de regras)
function UserProvider({ children }) {
  // desestrutura o Auth, passando o {register}
  const { authenticated, register, logout, login } = useAuth();

  // no return tem que prover esse contexto,
  // os componentes feitos, como, register, authenticated, logout, ou outros, devem ser exportados onde foram feitos,
  // depois importados aqui para "proteção" e só assim poder ser exportados novamente pelo  Context.Provider, para ser usados onde precisar.
  // assim,  tudo que estiver dentro dele, pode receber o context
  // e dentro do value tem tudo que está disponível dentro desse Context.Provider
  // assim quem puder acessar o Context.Provider, pode também acessar o que está passado dentro do value
  // em outras palavras, tudo dentro do Context.Provider pode ser visto/acessado, ou seja, seus filhos. Mas o que exatamente pode ser visto ou acessado?
  // tudo que estiver dentro do value
  // Context da acesso ao métodos
  // Provider gera a possibilidade de acesso
  return (
    <Context.Provider value={{ authenticated, register, logout, login }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
