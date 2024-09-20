import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  mediaList: {
    width: "80%",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  },
  mediaItem: {
    marginBottom: "10px",
    borderBottom: "1px solid #1A1A1A",
    display: "flex",
    justifyContent: "space-between",
  },
  mediaTitle: {
    padding: "15px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontFamily: "Montserrat, sans-serif",
    color: "#1A1A1A",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#FF0000",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  newmedia: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  newmediaButton: {
    padding: "10px",
    fontSize: "16px",
    fontFamily: "Montserrat, sans-serif",
    color: "#1A1A1A",
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
};

export default styles;
