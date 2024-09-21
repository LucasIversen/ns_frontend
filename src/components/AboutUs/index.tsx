import { useTranslation } from "react-i18next";
import styles from "./styles";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <div style={styles.title}>{t("ourStory")}</div>
      </div>
      <div style={styles.section}>{t("aboutUsOne")}</div>
      <div style={styles.section}>{t("aboutUsTwo")}</div>
      <div style={styles.section}>{t("aboutUsThree")}</div>
      <div style={styles.section}>{t("aboutUsFour")}</div>
      <div style={styles.section}>{t("aboutUsFive")}</div>
      <div style={styles.section}>{t("aboutUsSix")}</div>
      <div style={styles.section}>{t("aboutUsSeven")}</div>
      <div style={styles.section}>{t("aboutUsEight")}</div>
      <div style={styles.section}>{t("aboutUsNine")}</div>
      <div style={styles.section}>{t("aboutUsTen")}</div>
      <div style={styles.section}>{t("aboutUsEleven")}</div>
      <div style={styles.section}>{t("aboutUsTwelve")}</div>
    </div>
  );
};

export default AboutUs;
