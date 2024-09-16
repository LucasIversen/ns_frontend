import React from "react";
import Props from "./interfaces";
import styles from "./styles";

const NewsItem = (props: Props) => {
  return (
    <div style={styles.card}>
      <img src={props.articleImage} alt="News" style={styles.image} />

      <div style={styles.content}>
        <div style={styles.date}>{props.newsDate}</div>
        <div style={styles.title}>{props.title}</div>
        <div style={styles.description}>{props.description}...</div>
      </div>
    </div>
  );
};

export default NewsItem;
