import { useContext, useEffect, useState } from "react";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CacheContext from "../../shared/CacheContext";

const FAQ = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }
  const { faqs, fetchFaqs } = cacheContext;
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!faqs) fetchFaqs();
  }, [faqs, fetchFaqs]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const languageIsEnglish = i18n.language.includes("en");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nordic Storm FAQ - Frequently Asked Questions</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about the Nordic Storm American football team. Learn more about our games, schedule, tickets, and more."
        />
        <meta
          name="keywords"
          content="Nordic Storm FAQ, American Football FAQ, Copenhagen Football Questions, Denmark Football Information, ELF Team FAQ, Nordic Storm Help, Football Schedule FAQ, Ticket Information"
        />
        <meta
          property="og:title"
          content="Nordic Storm FAQ - Frequently Asked Questions"
        />
        <meta
          property="og:description"
          content="Find answers to frequently asked questions about the Nordic Storm American football team. Learn more about our games, schedule, tickets, and more."
        />
        <meta property="og:image" content="/path/to/your/faq-page-image.jpg" />
      </Helmet>
      <div style={styles.container}>
        <div style={styles.titleContainer}>
          <div style={styles.title}>{t("faqTitle")}</div>
        </div>
        {faqs?.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div style={styles.question} onClick={() => toggleFAQ(index)}>
              {languageIsEnglish ? faq.questionEn : faq.question}
              <FontAwesomeIcon
                icon={activeIndex === index ? faChevronUp : faChevronDown}
                style={styles.icon}
                size="1x"
              />
            </div>
            {activeIndex === index && (
              <div style={styles.answer}>
                {languageIsEnglish ? faq.answerEn : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </HelmetProvider>
  );
};

export default FAQ;
