import Props from "./interfaces";
import styles from "./styles";
import { useNavigate } from "react-router-dom";

const NewsItem = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate("/news/" + props.id)}>
      <img src={props.articleImage || ""} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.newsDate}</div>
        <div style={styles.title}>{props.title}</div>
        <div style={styles.description}>{props.description}</div>
      </div>
    </div>
  );
};

export default NewsItem;
