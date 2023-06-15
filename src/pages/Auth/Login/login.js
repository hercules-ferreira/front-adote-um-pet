import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Input from "../../../components/form/Input";
import "./login.css";
import { Context } from "../../../context/UserContext";
import LogoCentral from "../../../components/layout/Logo/logo";

export function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }
  return (
    <>
      <div>
        <LogoCentral />
      </div>
      <div className="container-center">
        <div className="login-add">
          <form onSubmit={handleSubmit}>
            <h1>Fazer login</h1>

            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              handleOnChange={handleChange}
            />

            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              handleOnChange={handleChange}
            />

            <input type="submit" value="Entrar" className="button" />
          </form>

          <div>
            <Link to="/register">
              Não possui cadastro? Crie sua conta agora!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
