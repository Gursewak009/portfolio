import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className="w-[250px] p-[1px] rounded-[20px] shadow-card relative" // Added relative for pseudo-element positioning
    // Removed green-pink-gradient from here as we'll apply it differently for the border
  >
    {/* Pseudo-element for the gradient border */}
    <div className="absolute inset-0 rounded-[20px] green-pink-gradient z-[-1]" />

    <div
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
    >
      <img
        src={icon}
        alt="web-development"
        className="w-16 h-16 object-contain"
      />

      <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Greetings! I'm Balkar singh, a seasoned software developer specializing
        in PHP and JavaScript. My expertise extends to renowned frameworks such
        as React, Next and Laravel. Beyond coding, I bring a problem-solving
        mindset rooted in Data Structures and Algorithms (DSA).
      </motion.p>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Why Choose Me:</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Efficiency: Crafting solutions that prioritize efficiency and
        scalability.Adaptability: Quick to learn and adapt to emerging
        technologies.Client-Centric Solutions: Collaborating closely to meet
        client needs effectively.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
