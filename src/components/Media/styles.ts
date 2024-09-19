import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  mediaOuterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "1200px",
    padding: "100px 0px",
  },
  mediaTitleContainer: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${colors.darkBlue}`,
  },
  mediaTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  mediaDate: {
    fontSize: "12px",
    color: colors.darkBlue,
    marginBottom: "20px",
  },
  imageSlideShow: {
    width: "80%",
    height: "80vh",
    overflow: "hidden",
    margin: "50px auto",
    backgroundColor: colors.offWhite,
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    maxHeight: "80vh",
    maxWidth: "80%",
  },
};

export default styles;
