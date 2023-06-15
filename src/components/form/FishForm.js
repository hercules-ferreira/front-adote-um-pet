import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import styles from "./Add.module.css";

import formStyles from "./Form.module.css";

// import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../layout/HomeImage";
import RoundedImage from "../layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Select";

export function FishForm({ handleSubmit, fishData, btnText }) {
  const [fish, setFish] = useState(fishData || {});
  const [preview, setPreview] = useState([]);

  const colors = [
    "Branco",
    "Preto",
    "Marrom",
    "Cinza",
    "Caramelo",
    "Mesclado",
    "outra cor",
  ];

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setFish({ ...fish, images: [...e.target.files] });
  }

  function handleColor(e) {
    setFish({ ...fish, color: e.target.options[e.target.selectedIndex].text });
  }

  function handleChange(e) {
    setFish({ ...fish, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    console.log(fish);
    handleSubmit(fish);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={fish.name}
                key={`${fish.name}+${index}`}
              />
            ))
          : fish.images &&
            fish.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API_URL}/images/fishs/${image}`}
                alt={fish.name}
                key={`${fish.name}+${index}`}
              />
            ))}
      </div>

      <Input
        text="Imagens do Peixe"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />

      <Input
        text="Nome do Peixe"
        type="text"
        name="name"
        placeholder="Digite o nome do Peixe"
        handleOnChange={handleChange}
        value={fish.name || ""}
      />

      <Input
        text="Idade do fish"
        type="number"
        name="age"
        placeholder="Digite a idade do Peixe"
        handleOnChange={handleChange}
        value={fish.age || ""}
      />

      <Input
        text="Peso do Peixe"
        type="number"
        name="weight"
        placeholder="Digite o peso do Peixe"
        handleOnChange={handleChange}
        value={fish.weight || ""}
      />

      <Input
        text="Minhas curiosidades"
        type="text"
        name="description"
        placeholder="Digite minhas curiosidades"
        handleOnChange={handleChange}
        value={fish.description || ""}
      />

      <Select
        name="color"
        text="Selecione a cor do Peixe"
        options={colors}
        handleOnChange={handleColor}
        value={fish.color || ""}
      />

      <input type="submit" value={btnText} />
    </form>
  );
}
