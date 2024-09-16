import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  header: {
    height: "78px",
    width: "100%",
  },
  borderBottom: {
    display: "flex",
    width: "100%",
    height: "7px",
    background: `linear-gradient(to right, ${colors.white} 0%, ${colors.darkBlue} 50%, ${colors.white} 100%)`,
  },
  mainContent: {
    display: "grid",
    height: "71px",
    width: "100%",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "50px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: "50px",
  },
  navButton: {
    color: colors.darkBlue,
    fontSize: "24px",
    fontWeight: "semibold",
    paddingRight: "20px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
  },
  socialsAndLanguage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "50px",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    height: "30px",
    width: "30px",
    margin: "10px",
    cursor: "pointer",
  },
  language: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  languageText: {
    color: colors.darkBlue,
    fontSize: "24px",
    fontWeight: "semibold",
    paddingRight: "10px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
  },
};

export default styles;
