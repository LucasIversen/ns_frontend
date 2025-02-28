import { useContext, useEffect } from "react";
import styles from "./styles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useTranslation } from "react-i18next";
import CacheContext from "../../shared/CacheContext";

const Media = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }
  const { media, fetchMedia } = cacheContext;
  useEffect(() => {
    if (!media) {
      fetchMedia();
    }
  }, [media, fetchMedia]);

  const id = window.location.pathname.split("/")[2];
  const { i18n } = useTranslation();
  const languageIsEnglish = i18n.language.includes("en");

  const pickedMedia = media?.find((media) => media.id === id);

  return (
    <div style={styles.mediaOuterContainer}>
      {media ? (
        <div style={styles.mediaContainer}>
          <div style={styles.mediaTitleContainer}>
            <div style={styles.mediaTitle}>
              {languageIsEnglish
                ? pickedMedia.mediaNameEn
                : pickedMedia.mediaName}
            </div>
            <div style={styles.mediaDate}>{pickedMedia.date}</div>
          </div>

          <div style={styles.imageSlideShow}>
            <Slide autoplay={true} infinite={true}>
              {pickedMedia.images.map((image: string, index: number) => (
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
