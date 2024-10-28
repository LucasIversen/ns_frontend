import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import Props from "./interfaces";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";

const OnlineEvent = (props: Props) => {
  const [event, setEvent] = useState<any | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const id = window.location.pathname.split("/")[2];
  const { i18n, t } = useTranslation();

  const fetchEvent = async () => {
    console.log("Fetching news item with ID:", id);
    const docRef = doc(db, "onlineEvent", id); // Reference to the specific document with the given ID

    try {
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (docSnap.exists()) {
        const newsItem = { ...docSnap.data(), id: docSnap.id } as any;
        console.log("Fetched news item:", newsItem);
        setEvent(newsItem); // Set the fetched news item to state
        console.log("Fetched news item:", newsItem);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document: ", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const signUp = async () => {
    const isEmailValid = email.includes("@") && email.includes(".");
    if (isEmailValid) {
      console.log("Signing up with email:", email);
      const docRef = await updateDoc(doc(db, "onlineEvent", id), {
        signupEmails: [...event.signupEmails, email],
      });
      setEmail("");
      alert(t("signedUp"));
    } else {
      alert(t("enterValidEmail"));
    }
  };

  const languageIsEnglish = i18n.language.includes("en");
  return (
    <div style={styles.eventOuterContainer}>
      {event ? (
        <div style={styles.eventContainer}>
          {languageIsEnglish ? (
            <div>
              <div style={styles.eventTitleContainer}>
                <div style={styles.eventTitle}>{event.eventNameEn}</div>
              </div>
              <div style={styles.eventDescription}>
                {event.eventDescriptionEn}
              </div>
            </div>
          ) : (
            <div>
              <div style={styles.eventTitleContainer}>
                <div style={styles.eventTitle}>{event.eventName}</div>
              </div>
              <div style={styles.eventDescription}>
                {event.eventDescription}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div style={styles.newsletterBar}>
        <div style={styles.newsletterTitle}>{t("eventSignUp")}</div>
        <div style={styles.newsletterInputContatiner}>
          <input
            style={styles.newsletterInput}
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={styles.newsletterButton} onClick={signUp}>
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

export default OnlineEvent;
