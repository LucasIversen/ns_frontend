import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import styles from "./styles";
import DeleteDialog from "../DeleteDialog";

const Faq = () => {
  const [faqs, setFaq] = useState<any[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState("");

  const onDelete = async (id: string) => {
    console.log("Deleting FAQ item with ID:", id);

    try {
      const docRef = doc(db, "faq", id);
      await deleteDoc(docRef);
      console.log("FAQ item deleted from Firestore");
      setFaq((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
      alert("FAQ-elementet er slettet.");
    } catch (error) {
      console.error("Fejl ved sletning af FAQ-element:", error);
      alert("Der opstod en fejl ved sletning af FAQ-elementet.");
    }

    setShowDeleteDialog(false);
  };

  const fetchFaq = async () => {
    console.log("fetching");
    await getDocs(collection(db, "faq"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFaq(newData);
        console.log(faqs, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div style={styles.faqList}>
      <div style={styles.newFaq}>
        <div
          style={styles.newFaqButton}
          //onClick={() => setTabContent("newFaq")}
        >
          Opret
        </div>
      </div>
      {faqs
        .sort((a, b) => a.question.localeCompare(b.question))
        .map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div style={styles.fawContent}>
              <div style={styles.faqQuestion}>{faq.question}</div>
              <div style={styles.faqAnswer}>{faq.answer}</div>
            </div>
            <div style={styles.buttons}>
              <div style={styles.editButton}>Rediger</div>
              <div
                style={styles.deleteButton}
                onClick={() => {
                  setSelectedFaqId(faq.id);
                  setShowDeleteDialog(true);
                }}
              >
                Slet
              </div>
            </div>
          </div>
        ))}

      <DeleteDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
        onDelete={() => onDelete(selectedFaqId)}
      />
    </div>
  );
};

export default Faq;
