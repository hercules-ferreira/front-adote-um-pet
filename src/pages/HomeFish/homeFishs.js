import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";

export function HomeFishs() {
  const [fishs, setFishs] = useState([]);

  useEffect(() => {
    api.get("/fishs").then((response) => {
      setFishs(response.data.fishs);
      console.log(response);
    });
  }, []);
  return (
    <div className={styles.box}>
      <section>
        <div className={styles.pet_home_header}>
          <h1>Conheça o mudo dos Peixes</h1>
          <p>Veja os detalhes e as curiosidades de cada um de nós!</p>
        </div>
        <div className={styles.pet_container}>
          {fishs.length > 0 &&
            fishs.map((fish) => (
              <div className={styles.pet_card} key={fish._id}>
                <HomeImage
                  src={`${process.env.REACT_APP_API_URL}/images/${fish.images[0]}`}
                  alt={fish.name}
                  width="px75"
                />

                <h3 className={styles.pet_card_h3}>{fish.name}</h3>
                <p>
                  <span className={styles.bold_Peso}>Peso:</span> {fish.weight}
                  kg
                </p>
                {fish.available ? (
                  <div className={styles.bt_container}>
                    <Link
                      className={styles.pet_card_a}
                      to={`/fish/${fish._id}`}
                    >
                      Mais detalhes
                    </Link>
                  </div>
                ) : (
                  <p className={styles.adopted_text}>Adotado!</p>
                )}
              </div>
            ))}
          {fishs.length === 0 && (
            <p>Não há Peixes cadastrados ou disponíveis no momento!</p>
          )}
        </div>
      </section>
    </div>
  );
}
