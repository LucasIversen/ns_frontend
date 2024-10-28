import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  newsOuterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: "60%",
    height: "auto",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0px",
  },
  image: {
    width: "100%",
    height: "auto",
  },
};

export default styles;
