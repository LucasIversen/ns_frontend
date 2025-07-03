import React, { useState } from "react";
import { article, CleanPart, parts, Props } from "./interfaces";
import PartEditor from "../PartsEditor";
import styles from "./styles";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const NewNews = (props: Props) => {
  const [articleData, setArticleData] = useState<article>({
    articleImage: null,
    description: "",
    descriptionEn: "",
    newsDate: new Date().toISOString().split("T")[0],
    title: "",
    titleEn: "",
    parts: [],
    partsEn: [],
    published: false,
  });
  const [articleImageFile, setArticleImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setArticleImageFile(file);
  };

  const handleAddPart = () => {
    const newPart: parts = {
      sortValue: articleData.parts.length,
      html: null,
      htmlEn: null,
      imageText: null,
      imageTextEn: null,
      imageUrl: null,
      type: "htmlBlock",
      link: null,
    };
    setArticleData({ ...articleData, parts: [...articleData.parts, newPart] });
  };

  const handlePartChange = (index: number, updatedPart: parts) => {
    const updatedParts = [...articleData.parts];
    updatedParts[index] = updatedPart;
    setArticleData({ ...articleData, parts: updatedParts });
  };

  const handleRemovePart = (index: number) => {
    const updatedParts = [...articleData.parts];
    updatedParts.splice(index, 1);
    updatedParts.forEach((part, idx) => {
      part.sortValue = idx;
    });
    setArticleData({ ...articleData, parts: updatedParts });
  };

  const handleMovePartUp = (index: number) => {
    if (index === 0) return;
    const updatedParts = [...articleData.parts];
    [updatedParts[index - 1], updatedParts[index]] = [
      updatedParts[index],
      updatedParts[index - 1],
    ];
    updatedParts.forEach((part, idx) => {
      part.sortValue = idx;
    });
    setArticleData({ ...articleData, parts: updatedParts });
  };

  const handleMovePartDown = (index: number) => {
    if (index === articleData.parts.length - 1) return;
    const updatedParts = [...articleData.parts];
    [updatedParts[index + 1], updatedParts[index]] = [
      updatedParts[index],
      updatedParts[index + 1],
    ];
    updatedParts.forEach((part, idx) => {
      part.sortValue = idx;
    });
    setArticleData({ ...articleData, parts: updatedParts });
  };

  const handleSaveArticle = async () => {
    try {
      // Create a new article in Firestore
      const articlesCollection = collection(db, "news");

      const correctedArticleData = {
        articleImage: articleData.articleImage,
        description: articleData.description,
        descriptionEn: articleData.descriptionEn,
        newsDate: new Date().toISOString().split("T")[0],
        title: articleData.title,
        titleEn: articleData.titleEn,
        parts: articleData.parts.map((part) => ({
          sortValue: part.sortValue,
          html: part.html,
          imageText: part.imageText,
          imageUrl: part.imageUrl,
          type: part.type,
          link: part.link,
        })),
        partsEn: articleData.parts.map((part) => ({
          sortValue: part.sortValue,
          html: part.htmlEn,
          imageText: part.imageTextEn,
          imageUrl: part.imageUrl,
          type: part.type,
          link: part.link,
        })),
        published: false,
      };

      const docRef = await addDoc(articlesCollection, correctedArticleData);
      const articleId = docRef.id;
      setArticleData((prevData) => ({ ...prevData, id: articleId }));

      // Upload article image if selected
      if (articleImageFile) {
        const imageRef = ref(
          storage,
          `articleImages/${articleId}/${articleImageFile.name}`
        );
        const uploadTask = uploadBytesResumable(imageRef, articleImageFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot: any) => {
              console.log(
                "Uploading article image progress:",
                snapshot.bytesTransferred
              );
            },
            (error) => {
              console.error("Error uploading article image:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              // Update articleData with the image URL
              await updateDoc(docRef, { articleImage: downloadURL });
              setArticleData((prevData) => ({
                ...prevData,
                articleImage: downloadURL,
              }));
              resolve();
            }
          );
        });
      }

      // Upload images in parts and update their imageUrls
      const updatedParts = [...articleData.parts];

      for (let i = 0; i < updatedParts.length; i++) {
        const part = updatedParts[i];
        if (part.imageFile) {
          const imageRef = ref(
            storage,
            `articleImages/${articleId}/parts/${part.imageFile.name}`
          );
          const uploadTask = uploadBytesResumable(imageRef, part.imageFile);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot: any) => {
                console.log(
                  "Uploading image for part",
                  i + 1,
                  "progress:",
                  snapshot.bytesTransferred
                );
              },
              (error: any) => {
                console.error(
                  `Error uploading image for part ${i + 1}:`,
                  error
                );
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                updatedParts[i] = {
                  ...updatedParts[i],
                  imageUrl: downloadURL,
                  imageFile: undefined, // Clear the imageFile after upload
                };
                resolve();
              }
            );
          });
        }
      }

      // Update the article with the updated parts
      const cleanParts: CleanPart[] = updatedParts.map((part) => ({
        sortValue: part.sortValue,
        html: part.html,
        htmlEn: part.htmlEn,
        imageText: part.imageText,
        imageTextEn: part.imageTextEn,
        imageUrl: part.imageUrl,
        type: part.type,
        link: part.link,
      }));
      await updateDoc(docRef, { parts: cleanParts });

      // Update local state
      setArticleData((prevData) => ({
        ...prevData,
        parts: updatedParts,
      }));

      alert("Artiklen er gemt");
      props.setTabContent("news");
    } catch (error) {
      console.error("Fejl ved gemning af artikel:", error);
      alert("Der opstod en fejl ved gemning af artiklen");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{"Opret Artikel"}</h1>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Titel:</label>
        <input
          type="text"
          name="title"
          value={articleData.title}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Titel (Engelsk):</label>
        <input
          type="text"
          name="titleEn"
          value={articleData.titleEn}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Beskrivelse:</label>
        <textarea
          name="description"
          value={articleData.description}
          onChange={handleInputChange}
          style={styles.textarea}
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Beskrivelse (Engelsk):</label>
        <textarea
          name="descriptionEn"
          value={articleData.descriptionEn}
          onChange={handleInputChange}
          style={styles.textarea}
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Artikel Billede:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={styles.fileInput}
        />
        {articleData.articleImage && (
          <img
            src={articleData.articleImage}
            alt="Artikel"
            style={styles.articleImage}
          />
        )}
      </div>
      <div style={styles.partsSection}>
        <h2 style={styles.subheading}>Indhold</h2>
        {articleData.parts.map((part, index) => (
          <PartEditor
            key={index}
            index={index}
            totalParts={articleData.parts.length}
            part={part}
            onChange={(updatedPart: parts) =>
              handlePartChange(index, updatedPart)
            }
            onRemove={() => handleRemovePart(index)}
            onMoveUp={() => handleMovePartUp(index)}
            onMoveDown={() => handleMovePartDown(index)}
          />
        ))}
        <button onClick={handleAddPart} style={styles.addButton}>
          Tilføj Del
        </button>
      </div>
      <button style={styles.saveButton} onClick={handleSaveArticle}>
        Gem Artikel
      </button>
    </div>
  );
};

export default NewNews;
