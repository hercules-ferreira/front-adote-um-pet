import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
// import RoundedImage2 from "../../components/layout/RoundedImage";

export function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <div className={styles.box}>
      <section>
        <div className={styles.pet_home_header}>
          <h1>Adote um Pet</h1>
          <p>Veja os detalhes de cada um e conheça o tutor deles</p>
        </div>
        <div className={styles.pet_container}>
          {pets.length > 0 &&
            pets.map((pet) => (
              <div key={pet._id}>
                <HomeImage
                  src={`${process.env.REACT_APP_API_URL}/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                  width="px75"
                />

                {/* 
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}>
                </div>

 */}

                <h3 className={styles.pet_card_h3}>{pet.name}</h3>
                <p>
                  <span className={styles.bold_Peso}>Peso:</span> {pet.weight}kg
                </p>
                {pet.available ? (
                  <div className={styles.bt_container}>
                    <Link className={styles.pet_card_a} to={`/pet/${pet._id}`}>
                      Mais detalhes
                    </Link>
                  </div>
                ) : (
                  <p className={styles.adopted_text}>Adotado!</p>
                )}
              </div>
            ))}
          {pets.length === 0 && (
            <p>
              Não há pets cadastrados ou disponíveis para adoção no momento!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
