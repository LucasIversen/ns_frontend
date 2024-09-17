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
  navButtonPicked: {
    color: colors.darkBlue,
    fontSize: "24px",
    fontWeight: "semibold",
    marginRight: "20px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    borderBottom: `1px solid ${colors.darkBlue}`,
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
  mainContentMobile: {
    display: "flex",
    justifyContent: "space-between",
    height: "71px",
    width: "100%",
  },
  simpleLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "50px",
  },
  simpleLogoImage: {
    height: "50px",
  },
  burgerMenu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "50px",
  },
  burgerIcon: {
    cursor: "pointer",
    transition: "transform 0.5s",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.offWhite,
    position: "absolute",
    top: "78px", // Below the header
    left: 0,
    right: 0,
    padding: "10px 0",
    zIndex: 1000,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
  },
  mobileNavButtonPicked: {
    color: colors.darkBlue,
    fontSize: "24px",
    fontWeight: "semibold",
    marginRight: "20px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    borderBottom: `1px solid ${colors.darkBlue}`,
    marginTop: "10px",
  },
  mobileNavButton: {
    color: colors.darkBlue,
    fontSize: "24px",
    fontWeight: "semibold",
    paddingRight: "20px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    marginTop: "10px",
  },
  mobileSocials: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
};

export default styles;
