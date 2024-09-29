import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  fieldGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    height: "100px",
  },
  fileInput: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  articleImage: {
    maxWidth: "100%",
    marginTop: "10px",
  },
  partsSection: {
    marginTop: "40px",
  },
  subheading: {
    marginBottom: "20px",
  },
  addButton: {
    display: "inline-block",
    padding: "10px 20px",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    marginRight: "10px",
  },
  saveButton: {
    display: "inline-block",
    padding: "10px 20px",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default styles;
