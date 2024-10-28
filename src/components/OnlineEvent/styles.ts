import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  eventOuterContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  eventContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "1200px",
    padding: "100px 0px",
  },
  eventTitleContainer: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${colors.darkBlue}`,
  },
  eventTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  eventDate: {
    fontSize: "12px",
    color: colors.darkBlue,
    marginBottom: "20px",
  },
  eventDescription: {
    fontSize: "18px",
    color: colors.darkBlue,
    textShadow: "none",
    marginTop: "20px",
  },
  newsletterBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  newsletterTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
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
