import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Add.module.css";

// import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";
import { BirdForm } from "../../components/form/BirdForm";

export function AddNewBirds() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  navigate("/birds");

  async function registerBird(bird) {
    let msgType = "success";
    const formData = new FormData();

    await Object.keys(bird).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < bird[key].length; i++) {
          formData.append("images", bird[key][i]);
        }
      } else {
        formData.append(key, bird[key]);
      }
    });
    const data = await api
      .post("/birds/create", formData, {
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
      navigate("/birds  ");
    }
  }

  return (
    <section>
      <div>
        <h1>Cadastre um novo Pássaro</h1>
      </div>
      <BirdForm handleSubmit={registerBird} btnText="Cadastrar Pássaro" />
    </section>
  );
}
