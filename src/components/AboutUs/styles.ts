import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: "80%",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    marginTop: "80px",
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
  section: {
    marginBottom: "15px",
    fontSize: "18px",
    lineHeight: "1.5",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
  },
};

export default styles;
