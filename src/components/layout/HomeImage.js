import styles from "./HomeImage.module.css";

//  nos parâmetros é passado 3 props
// em {`${styles.rounded_image} ==> é a classe da própria imagem
// em  ${styles[width]} ===> são classes dinâmicas da imagem
export default function HomedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
}
