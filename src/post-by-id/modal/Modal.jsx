import { format } from "date-fns";
import styles from "./Modal.module.scss";
import { changeColor } from "../../components/card-by-id/changeColor";

export const Modal = ({ post, onClose }) => {
  const { sender, profileImageURL, relationship, content, createdAt } = post;

  const formatData = (date) => {
    return format(new Date(date), "yyyy.MM.dd");
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.sender}>
          <img src={profileImageURL} />
          <div className={styles.sender__text}>
            <h3>{sender}</h3>
            <span className={changeColor(relationship)}>{relationship}</span>
          </div>
          <button onClick={onClose}>닫기</button>
        </div>
        <div className={styles.content}>
          <p>{content}</p>
          <span>{formatData(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
