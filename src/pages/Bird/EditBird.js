import api from "../../utils/api";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Add.module.css";

// import BirdForm from "../../components/form/BirdForm";
// import BirdForm from "../../components/form/BirdForm";

import useFlashMessage from "../../hooks/useFlashMessage";
import { BirdForm } from "../../components/form/BirdForm";

export function EditBird() {
  const [bird, setBird] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/birds/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
        setBird(response.data);
      });
  }, [token, id]);
  console.log(bird);
  async function updateBird(bird) {
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
      .patch(`birds/${bird._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    navigate("/bird/mybirds");
    msgType = "success";
    setFlashMessage(data.message, msgType);
  }
  // console.log(id);
  return (
    <section>
      <div className={styles.addbird_header}>
        <h1>Editando o Pássaro: {bird.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {bird.name && (
        <BirdForm handleSubmit={updateBird} birdData={bird} btnText="Editar" />
      )}
    </section>
  );
}
