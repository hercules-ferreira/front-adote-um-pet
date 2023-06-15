import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";
import { useContext } from "react";

function ProtectRoutes({ component: Component }) {
  //   const navigate = useNavigate;
  const { authenticated } = useContext(Context);
  // console.log(authenticated);
  if (authenticated) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectRoutes;
