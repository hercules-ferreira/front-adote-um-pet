import api from "../../utils/api";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";

import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";
// import RoundedImage2 from "../../components/layout/RoundedImage";

export function FishsDetails() {
  const [fish, setFish] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/fishs/${id}`).then((response) => {
      setFish(response.data);
    });
  }, [id]);

  return (
    <div className={styles.adopted_text_details_name}>
      {" "}
      <h3> Me chamo: {fish.name}</h3>{" "}
      {fish.name && (
        <section>
          <div>
            <h3>Me conhecendo melhor</h3>

            <h3>Veja mais sobre mim! </h3>
            <div>
              {fish.images.map((image, index) => (
                <div key={fish._id}>
                  <RoundedImage
                    src={`${process.env.REACT_APP_API_URL}/images/${image}`}
                    alt={fish.name}
                    key={index}
                  />
                </div>
              ))}
            </div>
            <div>
              &nbsp;
              <div>
                <span>
                  <h3>Meu peso é: {fish.weight} kg(s) </h3>
                </span>
              </div>
              <div>
                <span>
                  <h3>Minha idade é: {fish.age} ano(s) </h3>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3>Minhas curiosidades: {fish.description} </h3>
          </div>
        </section>
      )}
    </div>
  );
}
