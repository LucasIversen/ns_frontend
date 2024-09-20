import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import styles from "./styles";

const Media = () => {
  const [media, setmedia] = useState<any[]>([]);

  const fetchmedia = async () => {
    console.log("fetching media");
    await getDocs(collection(db, "media"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setmedia(newData);
        console.log(media, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchmedia();
  }, []);

  return (
    <div style={styles.mediaList}>
      <div style={styles.newmedia}>
        <div style={styles.newmediaButton}>Opret</div>
      </div>
      {media.map((mediaItem) => (
        <div key={mediaItem.id} style={styles.mediaItem}>
          <div style={styles.mediaTitle}>
            {mediaItem.mediaName} - {mediaItem.date}
          </div>
          <div style={styles.buttons}>
            <div style={styles.editButton}>Rediger</div>
            <div style={styles.deleteButton}>Slet</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Media;
