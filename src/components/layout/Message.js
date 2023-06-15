import React, { useEffect, useState } from "react";
import bus from "../../utils/bus";
import styles from "./Message.module.css";
import "../ui/Button/styles.button.module.css";

export default function Message() {
  //tornar a mensagem de erro visível
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 5000);
    });
  }, []);

  return (
    visibility && (
      //o type aqui veio do useState, e aqui se torna uma variável dinâmica
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
}
