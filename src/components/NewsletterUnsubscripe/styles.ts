import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  newsletterBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 50px",
    height: "500px",
    backgroundColor: colors.offWhite,
  },
  newsletterBarMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 50px",
    backgroundColor: colors.lighterBlue,
  },
  newsletterTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.offWhite,
    textTransform: "uppercase",
  },
  newsletterInputContatiner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newsletterInput: {
    padding: "10px",
    borderRadius: "25px",
    border: "none",
    marginRight: "10px",
    width: "300px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: colors.darkBlue,
    backgroundColor: colors.offWhite,
    fontSize: "16px",
  },
  newsletterButton: {
    padding: "10px",
    cursor: "pointer",
  },
};

export default styles;
