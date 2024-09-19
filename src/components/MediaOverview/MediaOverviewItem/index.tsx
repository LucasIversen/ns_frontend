import Props from "./interfaces";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsItem = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate("/media/" + props.id)}>
      <img src={props.mediaImage} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.mediaDate}</div>
        <div style={styles.title}>{props.title}</div>
        <div style={styles.description}>{t("readMore")}</div>
      </div>
    </div>
  );
};

export default NewsItem;
