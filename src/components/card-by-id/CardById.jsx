import styles from "./CardById.module.scss";
import { format } from "date-fns";

export const CardById = ({
  sender,
  profileImageURL,
  relationship,
  content,
  createdAt,
  onClick,
}) => {
  const changeColor = (relationship) => {
    switch (relationship) {
      case "친구":
        return styles.blue;
      case "가족":
        return styles.green;
      case "동료":
        return styles.purple;
      case "지인":
        return styles.orange;
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), "yyyy.MM.dd");
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.sender}>
        <img src={profileImageURL} alt="프로필 이미지" />
        <div className={styles.sender__text}>
          <h3>From. {sender}</h3>
          <p className={changeColor(relationship)}>{relationship}</p>
        </div>
      </div>
      <p>{content}</p>
      <span>{formatDate(createdAt)}</span>
    </div>
  );
};
