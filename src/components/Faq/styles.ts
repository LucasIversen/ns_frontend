import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: "80%",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    marginTop: "80px",
  },
  faqItem: {
    marginBottom: "10px",
    borderBottom: `1px solid ${colors.darkBlue}`,
  },
  question: {
    padding: "15px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
  },
  answer: {
    padding: "15px 20px",
    fontSize: "16px",
    lineHeight: "1.5",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
  },
  icon: {
    fontSize: "20px",
    marginLeft: "10px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${colors.darkBlue}`,
    marginBottom: "20px",
  },
  title: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginBottom: "10px",
    textTransform: "uppercase",
    padding: "15px 20px",
  },
};

export default styles;
