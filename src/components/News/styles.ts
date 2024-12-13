import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  newsOuterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "80px",
  },
  newsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "1200px",
    padding: "100px 0px",
  },
  newsTitleContainer: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${colors.darkBlue}`,
  },
  newsTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  newsDate: {
    fontSize: "12px",
    color: colors.darkBlue,
    marginBottom: "20px",
  },
  htmlBlock: {},
  htmlImageContainer: {},
  imageHtmlContainer: {},
  halfImage: {
    maxHeight: "500px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "20px 0px",
    maxHeight: "500px",
    width: "100%",
  },
  innerImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "20px",
    backgroundColor: "#e5e5e5",
  },
  image: {
    height: "100%",
    maxHeight: "500px",
    objectFit: "cover",
    width: "auto",
  },
  imageCaption: {
    fontSize: "12px",
    color: colors.darkBlue,
    textAlign: "center",
  },
  instagramContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "50px 0px",
  },
  instagramInnerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "500px",
  },
};

export default styles;
