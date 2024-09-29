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
  video: {
    width: "80%",
    maxWidth: "800px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
  },
  mobileVideo: {
    width: "100%",
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
  imageTextMobile: {
    position: "absolute",
    fontSize: "24px",
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    textShadow: "2px 2px 4px #000000",
    letterSpacing: "5px",
    color: colors.offWhite,
  },
  newsBar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.offWhite,
  },
  newsTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginLeft: "50px",
    marginTop: "20px",
    marginBottom: "20px",
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
    marginBottom: "5px",
  },
  firstItem: {
    marginLeft: "50px",
    flexShrink: 0,
    marginBottom: "5px",
  },
  mediaBar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.offWhite,
  },
  mediaTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginLeft: "50px",
    marginTop: "20px",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  mediaItems: {
    display: "flex", // Makes the items lay out in a row
    overflowX: "auto", // Enables horizontal scrolling
    gap: "20px",
    marginBottom: "50px",
    scrollbarWidth: "none",
  },
  sponsorCarousel: {
    display: "flex",
    width: "100%",
    backgroundColor: colors.lighterBlue,
    height: "300px",
  },
  newsletterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 50px",
    backgroundColor: colors.lighterBlue,
  },
  newsletterBarMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 50px",
    backgroundColor: colors.lighterBlue,
  },
  newsletterTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.offWhite,
    textTransform: "uppercase",
  },
  newsletterInputContatiner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newsletterInput: {
    padding: "10px",
    borderRadius: "25px",
    border: "none",
    marginRight: "10px",
    width: "300px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: colors.darkBlue,
    backgroundColor: colors.offWhite,
    fontSize: "16px",
  },
  newsletterButton: {
    padding: "10px",
    cursor: "pointer",
  },
};

export default styles;
