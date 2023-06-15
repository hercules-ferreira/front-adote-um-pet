import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Add.module.css";

// import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";
import { FishForm } from "../../components/form/FishForm";

export function AddNewFishs() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  navigate("/fishs");

  async function registerFish(fish) {
    let msgType = "success";
    const formData = new FormData();

    await Object.keys(fish).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < fish[key].length; i++) {
          formData.append("images", fish[key][i]);
        }
      } else {
        formData.append(key, fish[key]);
      }
    });
    const data = await api
      .post("/fishs/create", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== "error") {
      navigate("/fishs  ");
    }
  }

  return (
    <section>
      <div>
        <h1>Cadastre um novo Peixe</h1>
      </div>

      <FishForm handleSubmit={registerFish} btnText="Cadastrar Peixe" />
    </section>
  );
}
