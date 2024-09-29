import { useState } from "react";
import styles from "./styles";
import Newsletter from "./Newsletter";
import News from "./News";
import Media from "./Media";
import Investor from "./Investor";
import Faq from "./Faq";

const Cms = () => {
  const [tab, setTab] = useState("news");

  const getTabContent = () => {
    switch (tab) {
      case "news":
        return <News />;
      case "media":
        return <Media />;
      case "faq":
        return <Faq />;
      case "investor":
        return <Investor />;
      case "newsletter":
        return <Newsletter />;
      default:
        return <div>News</div>;
    }
  };

  return (
    <div>
      <div style={styles.tabSelector}>
        <div
          style={tab == "news" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("news")}
        >
          Nyheder
        </div>
        <div
          style={tab == "media" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("media")}
        >
          Medier
        </div>
        <div
          style={tab == "faq" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("faq")}
        >
          FAQ
        </div>
        <div
          style={tab == "investor" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("investor")}
        >
          Investor kontakt
        </div>
        <div
          style={tab == "newsletter" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("newsletter")}
        >
          Nyhedsbrev
        </div>
      </div>

      <div style={styles.tabContent}>{getTabContent()}</div>
    </div>
  );
};

export default Cms;
