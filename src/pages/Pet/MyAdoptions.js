import styles from "./Dashboard.module.css";

import api from "../../utils/api";
import { useEffect, useState } from "react";
import RoundedImage from "../../components/layout/RoundedImage";

export function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Minhas adoções</h1>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API_URL}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className={styles.bold_name_pet}>{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className={styles.bold_name_pet}>Ligue para:</span>{" "}
                  {pet.user.phone}
                </p>
                <p>
                  <span className={styles.bold_name_pet}>Fale com:</span>{" "}
                  {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets adotados!</p>}
      </div>
    </section>
  );
}
