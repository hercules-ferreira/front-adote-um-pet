import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";

export function HomeBirds() {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    api.get("/birds").then((response) => {
      setBirds(response.data.birds);
      console.log(response);
    });
  }, []);
  return (
    <div className={styles.box}>
      <section>
        <div className={styles.pet_home_header}>
          <h1>Conheça o mudo dos Passarinhos</h1>
          <p>Veja os detalhes e as curiosidades de cada um de nós!</p>
        </div>
        <div className={styles.pet_container}>
          {birds.length > 0 &&
            birds.map((bird) => (
              <div className={styles.pet_card} key={bird._id}>
                <HomeImage src={bird.images[0]} alt={bird.name} width="px75" />

                <h3 className={styles.pet_card_h3}>{bird.name}</h3>
                <p>
                  <span className={styles.bold_Peso}>Peso:</span> {bird.weight}
                  kg
                </p>
                {bird.available ? (
                  <div className={styles.bt_container}>
                    <Link
                      className={styles.pet_card_a}
                      to={`/bird/${bird._id}`}
                    >
                      Mais detalhes
                    </Link>
                  </div>
                ) : (
                  <p className={styles.adopted_text}>Adotado!</p>
                )}
              </div>
            ))}
          {birds.length === 0 && (
            <p>Não há Birds cadastrados ou disponíveis no momento!</p>
          )}
        </div>
      </section>
    </div>
  );
}
