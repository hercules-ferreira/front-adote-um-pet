import api from "../../utils/api";
import { Link } from "react-router-dom";
// import styles from "./Dashboard.module.css";
import styles from "../Pet/Dashboard.module.css";

import { useEffect, useState } from "react";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";

export function MyFishs() {
  const [fishs, setFishs] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/fishs/myfishs", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFishs(response.data.fishs);
      });
  }, [token]);

  async function removeFish(id) {
    const data = await api
      .delete(`/fishs/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })

      // essa const updateFishs, garante que após a exclusão do fish do back, a lista de fishs do front seja atualizada e mostrada para o usuário
      .then((response) => {
        const updatedFishs = fishs.filter((fish) => fish._id !== id);
        setFishs(updatedFishs);
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
      .patch(`/fishs/conclude/${id}`, {
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
          {fishs.length > 0 &&
            fishs.map((fish) => (
              <div key={fish._id} className={styles.petlist_row}>
                <RoundedImage
                  src={fish.images[0]}
                  alt={fish.name}
                  width="px75"
                />
                <span className={styles.bold_name_pet}>{fish.name}</span>
                <div className={styles.actions}>
                  {fish.available ? (
                    <>
                      {fish.adopter && (
                        <button
                          style={{ background: "#e7eaf5", color: "#3c2ced" }}
                          onClick={() => {
                            concludeAdoption(fish._id);
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}
                      <Link to={`/fish/edit/${fish._id}`}>Editar Peixe</Link>
                      <button
                        className="button"
                        onClick={() => {
                          removeFish(fish._id);
                        }}
                      >
                        Excluir Peixe
                      </button>
                    </>
                  ) : (
                    <p className={styles.adopted_text_my}>Peixe Já adotado</p>
                  )}
                </div>
              </div>
            ))}

          {fishs.length === 0 && <p>Eu ainda não cadastrei nenhum Pássaro</p>}
        </div>
      </section>
    </>
  );
}
