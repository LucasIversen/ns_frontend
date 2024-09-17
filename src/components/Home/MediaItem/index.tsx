import React from "react";
import Props from "./interfaces";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const MediaItem = (props: Props) => {
  const { t, i18n } = useTranslation();

  return (
    <div style={styles.card}>
      <img src={props.image} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.date}</div>
        <div style={styles.title}>{props.title}</div>
        <div style={styles.description}>{t("readMore")}</div>
      </div>
    </div>
  );
};

export default MediaItem;
