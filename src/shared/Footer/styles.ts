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
  },
  logo: {
    height: "120px",
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
    alignItems: "center",
    height: "20px",
    color: colors.offWhite,
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  },
};

export default styles;
