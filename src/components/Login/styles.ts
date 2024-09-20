import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default styles;
