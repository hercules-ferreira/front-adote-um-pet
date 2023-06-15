import { Link } from "react-router-dom";
import "./register.css";
import "../../../components/ui/Button/styles.button.module.css";
import Input from "../../../components/form/Input";
import { useContext, useState } from "react";

import { Context } from "../../../context/UserContext";
import LogoCentralRegister from "../../../components/layout/LogoRegister/logoRegister";

export default function Register() {
  const [user, setUser] = useState({});

  // extrair do Context o método register
  // o useContext() é um hook, que recebe o próprio Context
  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // enviar o usuário para o banco
    // console.log(user);
    register(user);
  }

  return (
    <>
      <div>
        <LogoCentralRegister />
      </div>

      <div className="container-center">
        <div className="login-add">
          <form onSubmit={handleSubmit}>
            <h1>Cadastrar</h1>
            <Input
              text="Nome"
              type="text"
              name="name"
              placeholder="Digite o seu nome"
              handleOnChange={handleChange}
            />
            <Input
              text="Telefone"
              type="text"
              name="phone"
              placeholder="Digite o seu telefone"
              handleOnChange={handleChange}
            />

            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o seu melhor e-mail"
              handleOnChange={handleChange}
            />

            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              handleOnChange={handleChange}
            />

            <Input
              text="Confirm a sua senha"
              type="password"
              name="confirmpassword"
              placeholder="Confirme a sua senha"
              handleOnChange={handleChange}
            />
            <input type="submit" value="Entrar" className="button" />
          </form>
          <Link to="/login">Já possui cadastro? Faça login agora!</Link>
        </div>
      </div>
    </>
  );
}
