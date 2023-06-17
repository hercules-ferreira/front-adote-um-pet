// import "./Profile.css";
import formStyles from "../../components/form/Form.module.css";
import styles from "./Profile.css";
import Input from "../../components/form/Input";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import RoundedImage from "../../components/layout/RoundedImage";

export function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  // check user pelo token, função eita no back
  // converte o token do localStorage para leitura
  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();
    // usa-se formaData ==> porque ele poderá deixar subir imagens
    // o formData não é acessado, cria os valores, pegando a chave dele(key) do User e com o forEach,
    // faz um append(), preenchendo os campos do formulário com os dados do User
    // e depois os altera, depois em:        .patch(`/users/edit/${user._id}`, formData, { ====> altera as informações necessária,
    // e as envia com o formulário passado aqui  formData ===>> , formData, {
    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key])
    );

    formData.append("user", userFormData);

    const data = await api
      .patch(`/users/editimage/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("imagem:", response.data.image);

        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className={styles.profile_header}>
        {(user.image || preview) && (
          <RoundedImage
            src={preview ? URL.createObjectURL(preview) : user.image}
            alt={user.name}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
          value={user.password || ""}
        />

        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}
