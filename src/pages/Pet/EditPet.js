import api from "../../utils/api";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./AddPet.module.css";

import PetForm from "../../components/form/PetForm";

import useFlashMessage from "../../hooks/useFlashMessage";

export function EditPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response);
        setPet(response.data);
      });
  }, [token, id]);
  console.log(pet);
  async function updatePet(pet) {
    let msgType = "success";

    const formData = new FormData();

    const petFormData = await Object.keys(pet).forEach(
      (key) =>
        // if (key === "images") {
        // for (let i = 0; i < pet[key].length; i++) {
        formData.append(key, pet[key])
      // formData.append(`images`, pet[key]);
      // }
      // } else {
      // }
      // });
    );

    formData.append("pet", petFormData);

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
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

    navigate("/pet/mypets");
    msgType = "success";
    setFlashMessage(data.message, msgType);
  }
  // console.log(id);
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} petData={pet} btnText="Editar" />
      )}
    </section>
  );
}
