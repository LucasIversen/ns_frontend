import Props from "./interfaces";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MediaItem = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate("/media/" + props.id)}>
      <img src={props.image} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.date}</div>
        <div style={styles.title}>{props.title.substring(0, 40)}</div>
      </div>
    </div>
  );
};

export default MediaItem;
