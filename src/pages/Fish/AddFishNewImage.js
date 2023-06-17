import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import styles from "./AddPet.module.css";
import { useState } from "react";
// import RoundedImage from "../../layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";

import { FishForm } from "../../components/form/FishForm";

export function AddNewFishs() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerFish(fish) {
    let msgType = "success";

    const formData = new FormData();

    const fishFormData = await Object.keys(fish).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < fish[key].length; i++) {
          formData.append(`images`, fish[key][i]);
        }
      } else {
        formData.append(key, fish[key]);
      }
    });

    formData.append("fish", fishFormData);

    const data = await api
      .post(`fishs/createfish`, formData, {
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
      navigate("/fish/myfishs");
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Peixe</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <FishForm handleSubmit={registerFish} btnText="Cadastrar" />
    </section>
  );
}
