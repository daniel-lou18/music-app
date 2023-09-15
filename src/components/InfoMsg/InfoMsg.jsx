import styles from "./InfoMsg.module.css";
import Button from "../UI-elements/Button";

function InfoMsg({
  logo,
  heading,
  paragraph_1,
  paragraph_2,
  btnText,
  onClick,
}) {
  return (
    <div className={`${styles.infoContainer} infoContainer`}>
      {logo}
      <h2 className={styles.infoTitle}>{heading}</h2>
      <p className={styles.infoMsg}>{paragraph_1}</p>
      <p className={styles.infoTip}>{paragraph_2}</p>
      <Button text={btnText} onClick={onClick} />
    </div>
  );
}

export default InfoMsg;
