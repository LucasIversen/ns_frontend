import { useState } from "react";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "WHAT IS FOOTBALL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer potenti cubilia torquent efficitur imperdiet proin scelerisque sociosqu. Magnis commodo porttitor integer dictum elementum sociosqu. Ante senectus justo nibh ac egestas venenatis. Maximus purus felis vulputate rhoncus aliquam magnis arcu. Conubia libero turpis sociosqu eleifend mattis quisque tincidunt nibh. Quis torquent litora suscipit nostra sem. Finibus class bibendum lacinia ut tortor cras imperdiet. Elit facilisi nostra erat euismod ultrices platea luctus.",
    },
    {
      question: "WHAT IS FOOTBALL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer potenti cubilia torquent efficitur imperdiet proin scelerisque sociosqu. Magnis commodo porttitor integer dictum elementum sociosqu. Ante senectus justo nibh ac egestas venenatis. Maximus purus felis vulputate rhoncus aliquam magnis arcu. Conubia libero turpis sociosqu eleifend mattis quisque tincidunt nibh. Quis torquent litora suscipit nostra sem. Finibus class bibendum lacinia ut tortor cras imperdiet. Elit facilisi nostra erat euismod ultrices platea luctus.",
    },
    // Add more items as needed
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <div style={styles.title}>{t("faqTitle")}</div>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} style={styles.faqItem}>
          <div style={styles.question} onClick={() => toggleFAQ(index)}>
            {faq.question}
            <FontAwesomeIcon
              icon={activeIndex === index ? faChevronUp : faChevronDown}
              style={styles.icon}
              size="1x"
            />
          </div>
          {activeIndex === index && (
            <div style={styles.answer}>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
