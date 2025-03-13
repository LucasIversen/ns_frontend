import { useState } from "react";
import cheerleaders from "../../assets/cheerleaders.png";
import devin from "../../assets/devin.png";
import nancy from "../../assets/nancy.jpeg";
import Reveal from "../../shared/Reveal";
import "./styles.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";
import emailjs from "emailjs-com";

const CheerPage = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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
          "template_qc6zgph",
          templateParams,
          "PAus3tozKlYEIZWPK"
        )
        .then(
          () => {
            setEmail("");
            setMessage("");
          },
          () => {
            alert("Failed to send the message, please try again.");
          }
        );
    } else {
      alert(t("emailError"));
    }
  };

  return (
    <div className="container">
      <div className="banner-image">
        <img src={cheerleaders} alt="cheer" />
        <motion.div
          className="floating-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3, // Slow and smooth pulsing
            ease: "easeInOut",
          }}
        >
          <h1 style={{ backgroundImage: `url(${cheerleaders})` }}>
            Nordic Storm <br /> Cheerleaders
          </h1>
        </motion.div>
      </div>
      <div className="content">
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <p>{t("cheer_page.cheer_info1")}</p>
          <p>{t("cheer_page.cheer_info2")}</p>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="devin-container">
            <div className="devin-image">
              <img src={devin} alt="devin" />
            </div>
            <div className="devin-info">
              <h2>{t("cheer_page.devin")}</h2>
              <p>{t("cheer_page.devin1")}</p>
              <p>{t("cheer_page.devin2")}</p>
              <p>{t("cheer_page.devin3")}</p>
            </div>
          </div>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="nancy-container">
            <div className="devin-info">
              <h2>{t("cheer_page.nancy")}</h2>
              <p>{t("cheer_page.nancy1")}</p>
              <p>{t("cheer_page.nancy2")}</p>
              <p>{t("cheer_page.nancy3")}</p>
            </div>
            <div className="devin-image">
              <img src={nancy} alt="devin" />
            </div>
          </div>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="contact-info">
            <h2>{t("cheer_page.contact")}</h2>
            <p>{t("cheer_page.contact_info")}</p>
            <form className="contact-form">
              <textarea
                placeholder="Message"
                className="input"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="email-and-send">
                <input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="send-button" onClick={contact}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    color={colors.darkBlue}
                    size="2x"
                  />
                </div>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CheerPage;
