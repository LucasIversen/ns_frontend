import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: "80%",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
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
  messageInput: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  message: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontFamily: "Montserrat, sans-serif",
    color: colors.darkBlue,
    backgroundColor: colors.offWhite,
    borderRadius: "5px",
    border: "none",
    height: "250px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  emailAndSend: {
    display: "flex",
    justifyContent: "space-between",
  },
  email: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginRight: "10px",
    maxWidth: "500px",
    width: "60%",
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
