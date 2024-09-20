import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import styles from "./styles";

const Newsletter = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  const fetchNewsletter = async () => {
    console.log("fetching newsletter signups");
    await getDocs(collection(db, "newsletterSignups"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setContacts(newData);
        console.log(contacts, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNewsletter();
  }, []);

  return (
    <div style={styles.list}>
      {contacts.map((contact) => (
        <div key={contact.id} style={styles.item}>
          <div style={styles.email}>{contact.email}</div>
          <div style={styles.message}>{contact.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Newsletter;
