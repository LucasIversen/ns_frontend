import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  footer: {
    backgroundColor: colors.darkBlue,
    height: "400px",
  },
  footerMobile: {
    backgroundColor: colors.darkBlue,
    height: "auto",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    height: "380px",
  },
  mainContentMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  contact: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "130px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "lighter",
    fontFamily: "Montserrat, sans-serif",
    paddingBottom: "10px",
    color: colors.offWhite,
    textTransform: "uppercase",
  },
  email: {
    fontSize: "16px",
    fontWeight: "lighter",
    fontFamily: "Montserrat, sans-serif",
    cursor: "pointer",
    color: colors.offWhite,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
  logo: {
    maxWidth: "440px",
    width: "80%",
  },
  socials: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "130px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "30px",
    width: "30px",
    margin: "10px",
    cursor: "pointer",
    color: colors.offWhite,
  },
  copyright: {
    backgroundColor: colors.darkBlue,
    display: "flex",
    justifyContent: "center",
    height: "25px",
    color: colors.offWhite,
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  },
};

export default styles;
