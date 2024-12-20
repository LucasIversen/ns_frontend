import { CSSProperties } from "react";
import { colors } from "../../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  card: {
    backgroundColor: colors.white,
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
    width: "250px", // Adjust the width as needed
    height: "340px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    borderRadius: "10px",
    height: "170px",
    width: "90%",
    objectFit: "cover",
    border: "1px solid #ededed",
    marginTop: "10px",
  },
  content: {
    width: "80%",
    paddingTop: "15px",
  },
  date: {
    fontSize: "12px",
    color: colors.darkBlue,
    marginBottom: "10px",
    //no textShadow
    textShadow: "none",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: colors.darkBlue,
    margin: "5px 0",
    textShadow: "none",
  },
  smallTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: colors.darkBlue,
    margin: "5px 0",
    textShadow: "none",
  },
  description: {
    fontSize: "16px",
    color: colors.darkBlue,
    textShadow: "none",
  },
};

export default styles;
