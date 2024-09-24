import Props from "./interfaces";
import styles from "./styles";
import { useNavigate } from "react-router-dom";

const MediaItem = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate("/media/" + props.id)}>
      <img src={props.image} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.date}</div>
        <div style={styles.title}>{props.title}</div>
      </div>
    </div>
  );
};

export default MediaItem;
