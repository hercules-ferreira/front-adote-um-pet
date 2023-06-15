// acessar a api

import api from "../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  // valida se o usuário está logado (Authorization) pegando o token do localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      console.log(data);
      await authUser(data);
    } catch (error) {
      // tratar o erro
      console.log(error);
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = "Cadastro realizado com sucesso!!!";
    let msgType = "success";
    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  // função que recebe dados do login ou registro de cadastro do usuário
  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  function logout() {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    // retira também o token da api
    api.defaults.headers.Authorization = undefined;
    navigate("/");

    setFlashMessage(msgText, msgType);
  }

  // o que estiver aqui no export, deverá ser importado no UseContext.js
  return { authenticated, register, logout, login };
}
