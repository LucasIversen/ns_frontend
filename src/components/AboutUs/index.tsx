import { useTranslation } from "react-i18next";
import styles from "./styles";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <div style={styles.title}>{t("aboutUs")}</div>
      </div>
      <div style={styles.section}>{t("aboutUsOne")}</div>
      <div style={styles.section}>{t("aboutUsTwo")}</div>
      <div style={styles.section}>{t("aboutUsThree")}</div>
      <div style={styles.section}>{t("aboutUsFour")}</div>
      <div style={styles.section}>{t("aboutUsFive")}</div>
    </div>
  );
};

export default AboutUs;
