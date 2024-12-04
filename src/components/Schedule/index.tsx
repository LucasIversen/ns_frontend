import { useTranslation } from "react-i18next";

const Schedule = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px 0",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontFamily: "Montserrat, sans-serif",
          color: "#08233c",
          textTransform: "uppercase",
        }}
      >
        {t("keepYouPosted")}
      </h1>
    </div>
  );
};

export default Schedule;
