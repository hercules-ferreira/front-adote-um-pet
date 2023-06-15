import { Link } from "react-router-dom";
import LogoCentral from "../Logo/logo";
import { Context } from "../../context/UserContext";
import { useContext } from "react";
import styles from "./Navbar.module.css";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Inter:wght@200;400;600;800&family=Lobster&display=swap');
</style>;

export default function Navbar() {
  const { authenticated, logout } = useContext(Context);
  return (
    <nav className={styles.navibar}>
      <div>
        <LogoCentral />
      </div>
      <ul>
        <button className={styles.buttonNav}>
          <li>
            <Link to="/">Home Adotar</Link>
          </li>
        </button>

        {/* se logado, mostre "logado", caso contrário mostre entrar e cadastrar  */}
        {authenticated ? (
          <>
            {/*  */}

            <div>
              <button className={styles.buttonNav}>
                <li>
                  <Link to="/birds">
                    <h6>New</h6>Mundo dos Pássaros
                  </Link>
                </li>
              </button>
            </div>

            <div>
              <button className={styles.buttonNav}>
                <li>
                  <Link to="/fishs">
                    <h6>New</h6>Mundo dos Peixes
                  </Link>
                </li>
              </button>
            </div>

            {/*  */}

            <button className={styles.buttonNav}>
              <li>
                <Link to="/pet/myadoptions">Minhas adoções</Link>
              </li>
            </button>
            <button className={styles.buttonNav}>
              <li>
                <Link to="/pet/mypets">Meus Pets</Link>
              </li>
            </button>

            <button className={styles.buttonNav}>
              <li>
                <Link to="/bird/mybirds">Meus Pássaros</Link>
              </li>
            </button>

            <button className={styles.buttonNav}>
              <li>
                <Link to="/fish/myfishs">Meus Peixes</Link>
              </li>
            </button>

            <button className={styles.buttonNav}>
              <li>
                <Link to="/user/profile">Perfil</Link>
              </li>
            </button>

            <button className={styles.buttonNav}>
              <li onClick={logout}>Sair</li>
            </button>
          </>
        ) : (
          <>
            <button className={styles.buttonNav}>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
            </button>

            <button className={styles.buttonNav}>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </button>
          </>
        )}
      </ul>
    </nav>
  );
}
