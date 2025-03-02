import { useState } from "react";
import styles from "./styles";
import Newsletter from "./Newsletter";
import News from "./News";
import Media from "./Media";
import Faq from "./Faq";
import CheerSignups from "./CheerSignups";
import { auth } from "../../firebase";
import CreatePlayerForm from "./Roster";

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
      case "roster":
        return <CreatePlayerForm />;
      case "newsletter":
        return <Newsletter />;
      case "cheer":
        return <CheerSignups />;
      default:
        return <div>News</div>;
    }
  };

  const userIsDevin = auth.currentUser?.uid === "cRuGBHss6PbxsDuHXSHv3aTLYI93";
  if (userIsDevin) {
    return (
      <div style={styles.tabContentDevin}>
        <CheerSignups />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "50px" }}>
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
          style={tab == "roster" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("roster")}
        >
          Roster
        </div>
        <div
          style={tab == "newsletter" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("newsletter")}
        >
          Nyhedsbrev
        </div>
        <div
          style={tab == "cheer" ? styles.tabSelected : styles.tab}
          onClick={() => setTab("cheer")}
        >
          Cheer Audition
        </div>
      </div>

      <div style={styles.tabContent}>{getTabContent()}</div>
    </div>
  );
};

export default Cms;
