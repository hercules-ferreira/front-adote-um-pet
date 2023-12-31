import { useState } from "react";

import formStyles from "./Form.module.css";
import "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

// o btnText altera o título do texto dinamicamente
export default function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState(petData || {});
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
    setPet({ ...pet, images: [...e.target.files] });
  }

  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    console.log(pet);
    handleSubmit(pet);
  }
  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img src={image} alt={pet.name} key={`${pet.name}+${index}`} />
            ))}
      </div>

      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={false}
      />

      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome do Pet"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />

      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade do Pet"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />

      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso do Pet"
        handleOnChange={handleChange}
        value={pet.weight || ""}
      />
      <Select
        name="color"
        text="Selecione a cor do Pet"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />

      <input type="submit" value={btnText} />
    </form>
  );
}
