import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

import { useEffect, useState } from "react";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";

export function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })

      // essa const updatePets, garante que após a exclusão do pet do back, a lista de pets do front seja atualizada e mostrada para o usuário
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  }

  async function concludeAdoption(id) {
    let msgType = "success";
    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      <section>
        <div className={styles.petlist_header}>
          <div className={styles.petlist_header__pet}>
            <Link className={styles.cadastrar_pet} to="/pet/add">
              Cadastrar Pet
            </Link>
          </div>
        </div>

        <div className={styles.petlist_header}>
          <div className={styles.petlist_header__peixe}>
            <Link className={styles.cadastrar_pet} to="/addnewfishs">
              Cadastrar Peixe
            </Link>
          </div>
        </div>

        <div className={styles.petlist_header}>
          <div className={styles.petlist_header__passaro}>
            <Link className={styles.cadastrar_pet} to="/addnewbirds">
              Cadastrar Pássaro
            </Link>
          </div>
        </div>

        <div className={styles.petslist_container}>
          {pets.length > 0 &&
            pets.map((pet) => (
              <div key={pet._id} className={styles.petlist_row}>
                <RoundedImage src={pet.images[0]} alt={pet.name} width="px75" />
                <span className={styles.bold_name_pet}>{pet.name}</span>
                <div className={styles.actions}>
                  {pet.available ? (
                    <>
                      {pet.adopter && (
                        <button
                          style={{ background: "#e7eaf5", color: "#3c2ced" }}
                          onClick={() => {
                            concludeAdoption(pet._id);
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}
                      <Link to={`/pet/edit/${pet._id}`}>Editar Pet</Link>
                      <button
                        className="button"
                        onClick={() => {
                          removePet(pet._id);
                        }}
                      >
                        Excluir Pet
                      </button>
                    </>
                  ) : (
                    <p className={styles.adopted_text_my}>Pet Já adotado</p>
                  )}
                </div>
              </div>
            ))}

          {pets.length === 0 && <p>Eu ainda não cadastrei nenhum Pet</p>}
        </div>
      </section>
    </>
  );
}
