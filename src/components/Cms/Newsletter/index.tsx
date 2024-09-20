import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import styles from "./styles";

const Newsletter = () => {
  const [signups, setSignups] = useState<any[]>([]);

  const fetchNewsletter = async () => {
    console.log("fetching newsletter signups");
    await getDocs(collection(db, "newsletterSignups"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSignups(newData);
        console.log(signups, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNewsletter();
  }, []);

  return (
    <div style={styles.newsletterList}>
      {signups.map((signup) => (
        <div key={signup.id} style={styles.newsletterItem}>
          {signup.email}
        </div>
      ))}
    </div>
  );
};

export default Newsletter;
