import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  list: {
    width: "80%",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  },
  item: {
    marginBottom: "10px",
    borderBottom: "1px solid #1A1A1A",
  },
  email: {
    padding: "15px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontFamily: "Montserrat, sans-serif",
    color: "#1A1A1A",
  },
  message: {
    padding: "15px 20px",
    fontSize: "16px",
    lineHeight: "1.5",
    fontFamily: "Montserrat, sans-serif",
    color: "#1A1A1A",
  },
};

export default styles;
