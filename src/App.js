import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import { AuthProviderWrapper } from "./contexts/auth.context";

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProviderWrapper> */}
      {/* <ToastContainer autoClose={3000} /> */}
      <RoutesApp />
      {/* </AuthProviderWrapper> */}
    </BrowserRouter>
  );
}

export default App;
