import React, { useRef } from "react"; // Import useRef
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <TechnologyCard
          key={technology.name}
          technology={technology}
          index={index}
        />
      ))}
    </div>
  );
};
// Create a separate component for each technology card to manage its own animation state
const TechnologyCard = ({ technology, index }) => {
  const ref = useRef(null);
  // useInView will return true when the element enters the viewport
  // once: true means the animation will only trigger once when it comes into view
  // amount: 0.5 means it will trigger when 50% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Define variants for the entrance animation (load on scroll)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts invisible and 50px below its final position
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.1, // Stagger effect: each card animates slightly after the previous one
      },
    },
  };

  return (
    <motion.div
      ref={ref} // Attach the ref to the motion.div
      className="w-28 h-28 flex justify-center items-center cursor-pointer"
      // Use the variants for the initial and animate states
      variants={cardVariants}
      initial="hidden"
      // Animate to 'visible' when isInView is true
      animate={isInView ? "visible" : "hidden"}
      // Hover animations (remain the same)
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // This transition applies to whileHover/whileTap
    >
      {/* Conditional rendering for icon based on its type */}
      {typeof technology.icon === "string" ? (
        <img
          src={technology.icon}
          alt={technology.name}
          className="w-full h-full object-contain"
        />
      ) : (
        // Assuming technology.icon is a React Component (e.g., SVG component or react-icons component)
        // Pass className to ensure it takes full width/height
        <technology.icon className="w-full h-full object-contain" />
      )}
    </motion.div>
  );
};
export default SectionWrapper(Tech, "");
