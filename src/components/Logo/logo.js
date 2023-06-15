import LogoDog from "../../assets/logo/logo-dog-3-menor.jpg";
import "./logo.css";

export default function LogoCentral() {
  return (
    <div className="login-logo">
      <img
        className="image"
        src={LogoDog}
        style={{ width: "100px" }}
        alt="logo"
      />
    </div>
  );
}
