import api from "../../utils/api";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Add.module.css";

import useFlashMessage from "../../hooks/useFlashMessage";
import { FishForm } from "../../components/form/FishForm";

export function EditFish() {
  const [fish, setFish] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/fishs/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFish(response.data);
      });
  }, [token, id]);
  console.log(fish);
  async function updateFish(fish) {
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
      .patch(`fishs/${fish._id}`, formData, {
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

    navigate("/fish/myfishs");
    msgType = "success";
    setFlashMessage(data.message, msgType);
  }
  // console.log(id);
  return (
    <section>
      <div className={styles.addfish_header}>
        <h1>Editando o Pássaro: {fish.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {fish.name && (
        <FishForm handleSubmit={updateFish} fishData={fish} btnText="Editar" />
      )}
    </section>
  );
}
