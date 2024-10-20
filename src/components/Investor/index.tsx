import { useTranslation } from "react-i18next";
import styles from "./styles";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";
import emailjs from "emailjs-com";

const Investor = () => {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();

  const contact = () => {
    if (email && message) {
      const templateParams = {
        from_email: email,
        message: message,
      };

      emailjs
        .send(
          "service_cdqkopm",
          "template_rqiiusd",
          templateParams,
          "PAus3tozKlYEIZWPK"
        )
        .then(
          (result) => {
            setEmail("");
            setMessage("");
          },
          (error) => {
            alert("Failed to send the message, please try again.");
          }
        );
    } else {
      alert(t("emailError"));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <div style={styles.title}>{t("investorInfo")}</div>
      </div>
      <div style={styles.section}>{t("investorInfoDescriotion")}</div>
      <div style={styles.section}>{t("investorInfoContact")}</div>
      <div style={styles.messageInput}>
        <textarea
          style={styles.message}
          placeholder={t("message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div style={styles.emailAndSend}>
        <input
          style={styles.email}
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={styles.newsletterButton} onClick={contact}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            color={colors.darkBlue}
            size="2x"
          />
        </div>
      </div>
    </div>
  );
};

export default Investor;
