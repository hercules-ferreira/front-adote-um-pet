import api from "../../utils/api";
import { Link } from "react-router-dom";
// import styles from "./Dashboard.module.css";
import styles from "../Pet/Dashboard.module.css";

import { useEffect, useState } from "react";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";

export function MyBirds() {
  const [birds, setBirds] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/birds/mybirds", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setBirds(response.data.birds);
      });
  }, [token]);

  async function removeBird(id) {
    const data = await api
      .delete(`/birds/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })

      // essa const updateBirds, garante que após a exclusão do Bird do back, a lista de Birds do front seja atualizada e mostrada para o usuário
      .then((response) => {
        const updatedBirds = birds.filter((bird) => bird._id !== id);
        setBirds(updatedBirds);
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
      .patch(`/birds/conclude/${id}`, {
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
          {birds.length > 0 &&
            birds.map((bird) => (
              <div key={bird._id} className={styles.petlist_row}>
                <RoundedImage
                  src={`${process.env.REACT_APP_API_URL}/images/${bird.images[0]}`}
                  alt={bird.name}
                  width="px75"
                />
                <span className={styles.bold_name_pet}>{bird.name}</span>
                <div className={styles.actions}>
                  {bird.available ? (
                    <>
                      {bird.adopter && (
                        <button
                          style={{ background: "#e7eaf5", color: "#3c2ced" }}
                          onClick={() => {
                            concludeAdoption(bird._id);
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}
                      <Link to={`/bird/edit/${bird._id}`}>Editar Pássaro</Link>
                      <button
                        className="button"
                        onClick={() => {
                          removeBird(bird._id);
                        }}
                      >
                        Excluir Pássaro
                      </button>
                    </>
                  ) : (
                    <p className={styles.adopted_text_my}>Pássaro Já adotado</p>
                  )}
                </div>
              </div>
            ))}

          {birds.length === 0 && <p>Eu ainda não cadastrei nenhum Pássaro</p>}
        </div>
      </section>
    </>
  );
}
