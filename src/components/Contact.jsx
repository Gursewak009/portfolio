import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});

  /**
   * Validates form fields before submission.
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  const slideIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  });

  const ActionHub = () => {
    const contactOptions = [
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        link: "#",
        color: "text-blue-400",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        link: "#",
        color: "text-gray-400",
      },
      {
        name: "Direct Email",
        icon: FaEnvelope,
        link: "mailto:sewaksandhran001gmail.COM",
        color: "text-red-400",
      },
      {
        name: "View Resume",
        icon: FaFileAlt,
        link: "/path/to/your/resume.pdf",
        color: "text-purple-400",
      },
    ];

    return (
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] bg-black-100 p-8 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-lg"
      >
        {" "}
        <h4 className={styles.sectionSubText}>Follow on.</h4>
        {contactOptions.map((option, index) => (
          <motion.a
            key={option.name}
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs bg-tertiary p-4 rounded-xl flex items-center justify-center gap-4 cursor-pointer hover:bg-opacity-80 transition-all duration-100 transform-gpu"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <option.icon className={`text-4xl ${option.color}`} />
            <span className="text-white text-lg font-semibold">
              {option.name}
            </span>
          </motion.a>
        ))}
      </motion.div>
    );
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Your name is required.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Your email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      newErrors.message = "A message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted", form);

    if (!validateForm()) {
      setSubmissionStatus("error");
      return;
    }

    setLoading(true);
    setSubmissionStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Gursewak singh",
          from_email: form.email,
          email: form.email,
          to_email: "gursewak00singh11@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      setSubmissionStatus("success");
      console.log("Email sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      setSubmissionStatus("error");
      console.error("Email sending failed:", error);
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl shadow-lg"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                errors.name ? "border-red-500" : "border-transparent"
              } font-medium transition-colors duration-200`}
              aria-label="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                errors.email ? "border-red-500" : "border-transparent"
              } font-medium transition-colors duration-200`}
              aria-label="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                errors.message ? "border-red-500" : "border-transparent"
              } font-medium transition-colors duration-200 resize-y`}
              aria-label="Your Message"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary
                       hover:bg-opacity-90 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {submissionStatus === "success" && (
            <p className="text-green-500 text-center mt-4 p-2 bg-green-900 bg-opacity-30 rounded-md">
              Thank you! I'll get back to you as soon as possible.
            </p>
          )}
          {submissionStatus === "error" && (
            <p className="text-red-500 text-center mt-4 p-2 bg-red-900 bg-opacity-30 rounded-md">
              Oops! Something went wrong. Please check your inputs and try
              again.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
