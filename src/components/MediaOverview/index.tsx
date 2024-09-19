import React, { useEffect, useState } from "react";
import StockImage from "../../assets/stock_image.jpg";
import styles from "./styles";
import MediaOverviewItem from "./MediaOverviewItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const MediaOverview = () => {
  const [media, setMedia] = useState<any[]>([]);

  const fetchMedia = async () => {
    console.log("fetching");
    await getDocs(collection(db, "media"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMedia(newData);
        console.log(media, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.mediaPage}>
        {media.map((mediaItem, index) => (
          <MediaOverviewItem
            key={index}
            title={mediaItem.mediaName}
            mediaDate={mediaItem.date}
            mediaImage={mediaItem.images[0]}
            id={mediaItem.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaOverview;
