import logoCentral from "../../../assets/logo/logo-dog-3-menor.jpg";
import "./logo.css";

export default function LogoCentral() {
  return (
    <>
      <div className="bg"></div>{" "}
      <div className="login-logo__central">
        <img className="image__login" src={logoCentral} alt="logo" />{" "}
      </div>
    </>
  );
}
