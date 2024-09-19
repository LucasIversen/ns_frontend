import Props from "./interfaces";
import styles from "./styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./containerStyle.css";

const SponsorCarousel = (props: Props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      showDots={false}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      transitionDuration={1000}
      arrows={false}
      containerClass="carousel-container"
    >
      {props.sponsors.map((sponsor, index) => (
        <div
          key={index}
          style={styles.sponsorImageContainer}
          onClick={() => {
            window.open(sponsor.link, "_blank");
          }}
        >
          <img
            src={sponsor.image}
            alt={`Slide ${index}`}
            style={styles.sponsorImage}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default SponsorCarousel;
