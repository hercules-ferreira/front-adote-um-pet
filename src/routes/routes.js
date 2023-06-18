import { Route, Routes } from "react-router-dom";

import Message from "../components/layout/Message";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectRoutes from "../hooks/protectRoutes";
import { UserProvider } from "../context/UserContext";

import { Home } from "../pages/Home/home";
import Register from "../pages/Auth/Register/register";
import { Login } from "../pages/Auth/Login/login";
import { MyPets } from "../pages/Pet/MyPets";
import { Profile } from "../pages/Profile/profile";
import { AddPets } from "../pages/Pet/AddPet";
import { EditPet } from "../pages/Pet/EditPet";
import { PetDetails } from "../pages/Pet/PetDetails";
import { MyAdoptions } from "../pages/Pet/MyAdoptions";
import { BirdsDetails } from "../pages/Bird/BirdDetailsNew";
import { AddNewBirds } from "../pages/Bird/AddBirdNewImage";
import { HomeFishs } from "../pages/HomeFish/homeFishs";
import { AddNewFishs } from "../pages/Fish/AddNewFishs";
import { FishsDetails } from "../pages/Fish/FishDetails";
import { MyBirds } from "../pages/Bird/MyBirds";
import { EditBird } from "../pages/Bird/EditBird";
import { MyFishs } from "../pages/Fish/MyFishs";
import { EditFish } from "../pages/Fish/EditFish";
import { HomeBirdNew } from "../pages/HomeBirds/homeBirdNew";

function RoutesApp() {
  return (
    <>
      <UserProvider>
        <Container>
          <Navbar />
          <Message />

          <Routes>
            {/* Routes Public */}

            <Route path="/birds" element={<HomeBirdNew />} />
            <Route path="/fishs" element={<HomeFishs />} />

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="*" element={<div>não encontrado</div>} />

            {/* Routes Private */}

            <Route
              path="/user/profile"
              element={<ProtectRoutes component={Profile} />}
            />

            <Route
              path="/fish/edit/:id"
              element={<ProtectRoutes component={EditFish} />}
            />
            <Route
              path="/fish/myfishs"
              element={<ProtectRoutes component={MyFishs} />}
            />

            <Route
              path="/addnewfishs"
              element={<ProtectRoutes component={AddNewFishs} />}
            />

            <Route
              path="/fish/:id"
              element={<ProtectRoutes component={FishsDetails} />}
            />

            <Route
              path="/bird/mybirds"
              element={<ProtectRoutes component={MyBirds} />}
            />

            <Route
              path="/bird/edit/:id"
              element={<ProtectRoutes component={EditBird} />}
            />

            <Route
              path="/addnewbirds"
              element={<ProtectRoutes component={AddNewBirds} />}
            />

            <Route
              path="/bird/:id"
              element={<ProtectRoutes component={BirdsDetails} />}
            />
            {/*  */}

            <Route
              path="/pet/mypets"
              element={<ProtectRoutes component={MyPets} />}
            />
            <Route
              path="/pet/add"
              element={<ProtectRoutes component={AddPets} />}
            />
            <Route
              path="/pet/edit/:id"
              element={<ProtectRoutes component={EditPet} />}
            />

            <Route
              path="/pet/myadoptions"
              element={<ProtectRoutes component={MyAdoptions} />}
            />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </>
  );
}

export default RoutesApp;
