import api from "../../utils/api";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./PetDetails.module.css";

/* hooks */
import useFlashMessage from "../../hooks/useFlashMessage";
import RoundedImage from "../../components/layout/RoundedImage";

export function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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
  }

  return (
    <div className={styles.adopted_text_details_name}>
      <h1>
        {" "}
        <h3> Me chamo: {pet.name}</h3>{" "}
        {pet.name && (
          <section>
            <div>
              <h4>Me conhecendo melhor</h4>

              <h5 className={styles.cadastrar_pet} to="/pet/add">
                Se tiver interesse, marque uma visita com meu dono, para me
                conhecer!
                <div>
                  &nbsp;
                  <div>
                    <div className={styles.petslist_container}>
                      {pet.images.map((image, index) => (
                        <div key={pet._id} className={styles.petlist_row}>
                          <RoundedImage
                            src={`${process.env.REACT_APP_API_URL}/images/pets/${image}`}
                            alt={pet.name}
                            key={index}
                          />
                        </div>
                      ))}
                    </div>
                    <span>
                      <h5>Meu peso é: {pet.weight} kg(s) </h5>
                    </span>
                  </div>
                  <div>
                    <span>
                      <h5>Minha idade é: {pet.age} ano(s) </h5>
                    </span>
                  </div>
                  &nbsp;
                  {token ? (
                    <p>
                      {" "}
                      <div>
                        <button
                          onClick={schedule}
                          className={styles.button_visit}
                        >
                          Click aqui e marque uma vista
                        </button>
                      </div>
                    </p>
                  ) : (
                    <p>
                      Você precisa estar cadastrado,{" "}
                      <Link to="/register"> clique aqui, </Link>e faça sua conta
                      para marcar uma visita!
                    </p>
                  )}
                  &nbsp;
                </div>
              </h5>
            </div>
          </section>
        )}
      </h1>
    </div>
  );
}
