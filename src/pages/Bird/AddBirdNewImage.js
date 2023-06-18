import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import styles from "./AddPet.module.css";

import styles from "../Pet/AddPet.module.css";

import { useState } from "react";
// import RoundedImage from "../../layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";

import { BirdForm } from "../../components/form/BirdForm";

export function AddNewBirds() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerBird(bird) {
    let msgType = "success";

    const formData = new FormData();

    const birdFormData = await Object.keys(bird).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < bird[key].length; i++) {
          formData.append(`images`, bird[key][i]);
        }
      } else {
        formData.append(key, bird[key]);
      }
    });

    formData.append("bird", birdFormData);

    const data = await api
      .post(`birds/createbird`, formData, {
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
      navigate("/bird/mybirds");
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pássaro</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <BirdForm handleSubmit={registerBird} btnText="Cadastrar" />
    </section>
  );
}
