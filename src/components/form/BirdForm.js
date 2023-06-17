import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import styles from "./Add.module.css";

import formStyles from "./Form.module.css";

// import styles from "../../components/layout/HomeImage.module.css";
import HomeImage from "../../components/layout/HomeImage";
import RoundedImage from "../../components/layout/RoundedImage";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Select";

export function BirdForm({ handleSubmit, birdData, btnText }) {
  const [bird, setBird] = useState(birdData || {});
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
    setBird({ ...bird, images: [...e.target.files] });
  }

  function handleColor(e) {
    setBird({ ...bird, color: e.target.options[e.target.selectedIndex].text });
  }

  function handleChange(e) {
    setBird({ ...bird, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    console.log(bird);
    handleSubmit(bird);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={bird.name}
                key={`${bird.name}+${index}`}
              />
            ))
          : bird.images &&
            bird.images.map((image, index) => (
              <img src={image} alt={bird.name} key={`${bird.name}+${index}`} />
            ))}
      </div>

      <Input
        text="Imagens do Pássaro"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />

      <Input
        text="Nome do Pássaro"
        type="text"
        name="name"
        placeholder="Digite o nome do Bird"
        handleOnChange={handleChange}
        value={bird.name || ""}
      />

      <Input
        text="Idade do Pássaro"
        type="number"
        name="age"
        placeholder="Digite a idade do Bird"
        handleOnChange={handleChange}
        value={bird.age || ""}
      />

      <Input
        text="Peso do Pássaro"
        type="number"
        name="weight"
        placeholder="Digite o peso do Pássaro"
        handleOnChange={handleChange}
        value={bird.weight || ""}
      />

      <Input
        text="Minhas curiosidades"
        type="text"
        name="description"
        placeholder="Digite minhas curiosidades"
        handleOnChange={handleChange}
        value={bird.description || ""}
      />

      <Select
        name="color"
        text="Selecione a cor do Pássaro"
        options={colors}
        handleOnChange={handleColor}
        value={bird.color || ""}
      />

      <input type="submit" value={btnText} />
    </form>
  );
}
