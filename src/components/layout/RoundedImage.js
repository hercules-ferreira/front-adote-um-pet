import styles from "./RoundedImage.module.css";

//  nos parâmetros é passado 3 props
// em {`${styles.rounded_image} ==> é a classe da própria imagem
// em  ${styles[width]} ===> são classes dinâmicas da imagem
export default function RoundedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
}
