import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  homepage: {
    display: "flex",
    flexDirection: "column",
    marginTop: "50px",
  },
  bannerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "50px",
  },
  image: {
    width: "80%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
  },
  imageText: {
    position: "absolute",
    fontSize: "48px",
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    textShadow: "2px 2px 4px #000000",
    letterSpacing: "10px",
    color: colors.offWhite,
  },
  newsBar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.lighterBlue,
  },
  newsTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.offWhite,
    marginLeft: "50px",
    marginTop: "20px",
    marginBottom: "20px",
    textShadow: "2px 2px 4px #000000",
    textTransform: "uppercase",
  },
  newsItems: {
    display: "flex", // Makes the items lay out in a row
    overflowX: "auto", // Enables horizontal scrolling
    gap: "20px",
    marginBottom: "50px",
    scrollbarWidth: "none",
  },
  item: {
    flexShrink: 0,
  },
  firstItem: {
    marginLeft: "50px",
    flexShrink: 0,
  },
  mediaBar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.lightBlue,
  },
  mediaTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginLeft: "50px",
    marginTop: "20px",
    marginBottom: "20px",
    textShadow: "2px 2px 4px #000000",
    textTransform: "uppercase",
  },
  mediaItems: {
    display: "flex", // Makes the items lay out in a row
    overflowX: "auto", // Enables horizontal scrolling
    gap: "20px",
    marginBottom: "50px",
    scrollbarWidth: "none",
  },
  SponsorCarousel: {
    display: "flex",
    width: "100%",
    backgroundColor: colors.lighterBlue,
    height: "300px",
  },
};

export default styles;
