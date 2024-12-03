import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { colors } from "../../assets/colors";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const NewsletterUnsubscripe = () => {
  const [email, setEmail] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsletterUnsubscripe = async () => {
    console.log("Unsubscribing with email:", email);

    const q = query(
      collection(db, "newsletterSignups"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot.docs);

    if (querySnapshot.empty) {
      alert(t("noEmailFound"));
    } else {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      alert(t("unsubscribed"));
      setEmail("");
    }
  };

  const isMobile = windowWidth <= 920;
  return (
    <div>
      <div style={isMobile ? styles.newsletterBarMobile : styles.newsletterBar}>
        <div style={styles.newsletterTitle}>
          {"Uncubscripe from the Nordic Storm newsletter"}
        </div>
        <div style={styles.newsletterDescription}>
          {
            "Not interested in recieving information about the Storm? We hate to see you go."
          }
        </div>
        <div style={styles.newsletterInputContatiner}>
          <input
            style={styles.newsletterInput}
            type="email"
            placeholder={"Your email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={styles.newsletterButton} onClick={newsletterUnsubscripe}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              color={colors.darkBlue}
              size="2x"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterUnsubscripe;
