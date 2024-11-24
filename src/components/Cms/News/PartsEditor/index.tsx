import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { parts } from "../NewNews/interfaces";
import styles from "./styles";

const PartEditor = ({
  index,
  totalParts,
  part,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  totalParts: number;
  part: parts;
  onChange: (updatedPart: parts) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const [partData, setPartData] = useState<parts>(part);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    const updatedPart = { ...partData, type: newType };
    setPartData(updatedPart);
    onChange(updatedPart);
  };

  const handleHtmlChange = (content: string) => {
    const updatedPart = { ...partData, html: content };
    setPartData(updatedPart);
    onChange(updatedPart);
  };

  const handleHtmlEnChange = (content: string) => {
    const updatedPart = { ...partData, htmlEn: content };
    setPartData(updatedPart);
    onChange(updatedPart);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedPart = { ...partData, [name]: value };
    setPartData(updatedPart);
    onChange(updatedPart);
  };

  // Midlertidig lagring af billedfilen
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const updatedPart = { ...partData, imageFile: file };
    setPartData(updatedPart);
    onChange(updatedPart);
  };

  return (
    <div style={styles.partContainer}>
      <div style={styles.partHeader}>
        <h3 style={styles.partTitle}>Del {index + 1}</h3>
        <div style={styles.partActions}>
          <button onClick={onRemove} style={styles.removeButton}>
            Fjern Del
          </button>
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            style={styles.moveButton}
          >
            Flyt Op
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === totalParts - 1}
            style={styles.moveButton}
          >
            Flyt Ned
          </button>
        </div>
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Type:</label>
        <select
          value={partData.type}
          onChange={handleTypeChange}
          style={styles.select}
        >
          <option value="htmlBlock">HTML Blok</option>
          <option value="imageBlock">Billede Blok</option>
          <option value="imageHtmlBlock">Billede + HTML Blok</option>
          <option value="htmlImageBlock">HTML + Billede Blok</option>
          <option value="instagram_post">Instagram post</option>
        </select>
      </div>
      {["htmlBlock", "htmlImageBlock", "imageHtmlBlock"].includes(
        partData.type
      ) && (
        <div style={styles.htmlFieldGroup}>
          <label style={styles.label}>HTML Indhold:</label>
          <ReactQuill
            value={partData.html || ""}
            onChange={handleHtmlChange}
            style={styles.quill}
          />
          <label style={styles.label}>HTML Indhold Engelsk:</label>
          <ReactQuill
            value={partData.htmlEn || ""}
            onChange={handleHtmlEnChange}
            style={styles.quill}
          />
        </div>
      )}
      {["imageBlock", "htmlImageBlock", "imageHtmlBlock"].includes(
        partData.type
      ) && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Billede:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={styles.fileInput}
          />
          {partData.imageUrl && (
            <img
              src={partData.imageUrl}
              alt="Del Billede"
              style={styles.partImage}
            />
          )}
        </div>
      )}

      {["imageBlock", "htmlImageBlock", "imageHtmlBlock"].includes(
        partData.type
      ) && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Billedtekst:</label>
          <input
            type="text"
            name="imageText"
            value={partData.imageText || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <label style={styles.label}>Billedtekst Engelsk:</label>
          <input
            type="text"
            name="imageTextEn"
            value={partData.imageTextEn || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      )}

      {["instagram_post"].includes(partData.type) && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Instagram post URL:</label>
          <input
            type="text"
            name="link"
            value={partData.link || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      )}
    </div>
  );
};

export default PartEditor;
