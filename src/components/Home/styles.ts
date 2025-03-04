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
    position: "relative",
    paddingBottom: "100px",
    backgroundColor: colors.offWhite,
  },
  image: {
    width: "80%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
  },
  video: {
    width: "100%",
    maxHeight: "60vh",
    objectFit: "cover",
  },
  mobileVideo: {
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
    textAlign: "center",
  },
  newsletterInputContatiner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newsletterInputMobileContatiner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  instagram: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20px",
    paddingBottom: "20px",
    backgroundColor: colors.offWhite,
  },
  instagramInnerContainer: {
    width: "80%",
    maxWidth: "600px",
  },
  nextGameBar: {
    position: "absolute", // Floats relative to bannerImage
    bottom: 40, // Moves it up into the video by 40px
    zIndex: 2, // Ensures it appears above the video
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  nextGameInfo: {
    width: "90%",
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr 2fr",
    height: "100px",
    backgroundColor: colors.white,
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  nextGameInfoMobile: {
    width: "90%",
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    height: "140px",
    backgroundColor: colors.white,
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  nextGameTopInfoMobile: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
  },
  nextGameTeam: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  nextGameLogo: {
    height: "80px",
    width: "auto",
  },
  timeAndDate: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    fontSize: "clamp(12px, 2vw, 18px)",
    textAlign: "center",
  },
  nextGameName: {
    fontSize: "clamp(12px, 2vw, 18px)",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  nextGameCountdown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "clamp(18px, 2vw, 24px)",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    textAlign: "center",
  },
  ticketsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 20px",
  },
  nextGameCountdownMobile: {
    display: "flex",
    height: "70px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "clamp(18px, 2vw, 24px)",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
  },
};

export default styles;
