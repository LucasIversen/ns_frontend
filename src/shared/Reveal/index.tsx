import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "motion/react";
import { Props } from "./interfaces";

const Reveal = (props: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <div style={props.styles} ref={ref}>
      <motion.div
        className="text-part"
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

export default Reveal;
