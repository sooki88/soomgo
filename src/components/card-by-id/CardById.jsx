import { format } from "date-fns";
import styles from "./CardById.module.scss";
import { changeColor } from "./changeColor";

export const CardById = ({
  sender,
  profileImageURL,
  relationship,
  content,
  createdAt,
  onClick,
}) => {
  const formatData = (date) => {
    return format(new Date(date), "yyyy.MM.dd");
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.sender}>
        <img src={profileImageURL} />
        <div className={styles.sender__text}>
          <h3>{sender}</h3>
          <span className={changeColor(relationship)}>{relationship}</span>
        </div>
      </div>
      <div className={styles.content}>
        <p>{content}</p>
        <span>{formatData(createdAt)}</span>
      </div>
    </div>
  );
};
