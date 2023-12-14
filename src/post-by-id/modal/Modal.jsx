import styles from "./Modal.module.scss";

export const Modal = ({ post }) => {
  const { profileImageURL, sender, relationship, content, createdAt } = post;

  const changeColor = (relationship) => {
    switch (relationship) {
      case "친구":
        return styles.blue;
      case "가족":
        return styles.orange;
      case "지인":
        return styles.purple;
      case "동료":
        return styles.green;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sender}>
        <img src={profileImageURL} alt="프로필 이미지" />
        <div className={styles.sender__text}>
          <h3>From. {sender}</h3>
          <p className={changeColor(relationship)}>{relationship}</p>
        </div>
      </div>
      <p>{content}</p>
      <span>{createdAt}</span>
    </div>
  );
};
