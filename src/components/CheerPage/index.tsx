import { useState } from "react";
import cheerleaders from "../../assets/cheerleaders.png";
import devin from "../../assets/devin.png";
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
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Malesuada nibh
            congue fermentum auctor quis. Pulvinar justo turpis turpis
            adipiscing habitasse facilisis. Scelerisque et ante laoreet potenti
            nisi quisque convallis interdum. Iaculis imperdiet morbi natoque
            condimentum nullam fringilla suscipit adipiscing. Cursus enim
            vulputate suspendisse egestas integer eros. Dolor ridiculus nec
            ligula platea curae torquent aptent.
          </p>
          <p>
            Torquent per sociosqu molestie montes vestibulum eleifend praesent.
            Sapien nascetur bibendum varius interdum torquent. Montes laoreet
            praesent purus suscipit mattis class natoque mi. Aturpis tempus
            montes bibendum efficitur dapibus sapien fames. Tempus velit luctus
            morbi torquent purus natoque primis. Cras suspendisse integer magnis
            arcu sagittis fusce. Amet euismod nulla ante netus faucibus. Felis
            suspendisse maecenas imperdiet; odio class lectus justo molestie.
          </p>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="devin-container">
            <div className="devin-image">
              <img src={devin} alt="devin" />
            </div>
            <div className="devin-info">
              <h2>Cheerleading Coordinator - Devin Lockman</h2>
              <p>
                Devin has been a cheerleader for 10 years and has been the
                coordinator of Nordic Storm Cheerleaders since 2018. He is
                responsible for the team's training and performance schedule.
                Write something about Devin here. It can be a short paragraph
                about his background, experience, and role in the team. Maybe
                add a link to his social media profiles. That would be kinda
                cool I think?
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="devin-container">
            <div className="devin-info">
              <h2>Dance Coach - Nancy Põlluste</h2>
              <p>
                Nancy has been a professional dancer for 15 years and has been
                the dance coach of Nordic Storm Cheerleaders since 2019. She is
                responsible for the team's choreography and dance routines.
                Write something about Nancy here. It can be a short paragraph
                about her background, experience, and role in the team. Maybe
                add a link to her social media profiles. That would be kinda
                cool I think?
              </p>
            </div>
            <div className="devin-image">
              <img src={devin} alt="devin" />
            </div>
          </div>
        </Reveal>
        <Reveal
          styles={{ marginBottom: "50px", width: "80%", maxWidth: "1200px" }}
        >
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>
              For more information about Nordic Storm Cheerleaders, please
              contact us in the form below.
            </p>
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
