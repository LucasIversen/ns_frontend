import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./styles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Media = () => {
  const [media, setMedia] = useState<any>(undefined);
  const id = window.location.pathname.split("/")[2];

  const fetchSingleMedia = async () => {
    const docRef = doc(db, "media", id); // Reference to the specific document with the given ID

    try {
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (docSnap.exists()) {
        const mediaItem = { ...docSnap.data(), id: docSnap.id };
        setMedia(mediaItem); // Set the fetched news item to state
        console.log("Fetched news item:", mediaItem);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document: ", error);
    }
  };

  useEffect(() => {
    fetchSingleMedia();
  }, []);

  return (
    <div style={styles.mediaOuterContainer}>
      {media ? (
        <div style={styles.mediaContainer}>
          <div style={styles.mediaTitleContainer}>
            <div style={styles.mediaTitle}>{media.mediaName}</div>
            <div style={styles.mediaDate}>{media.date}</div>
          </div>

          <div style={styles.imageSlideShow}>
            <Slide autoplay={true} infinite={true}>
              {media.images.map((image: string, index: number) => (
                <div style={styles.slide} key={index}>
                  <img style={styles.image} src={image} />
                </div>
              ))}
            </Slide>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Media;
