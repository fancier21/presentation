import React from 'react';
import { motion } from 'framer-motion';

const SlideContainer = ({ children, direction }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.4 }
      }}
      className="absolute inset-0 overflow-y-auto scrollbar-hide"
    >
      <div className="min-h-full px-6 md:px-16 pt-28 md:pt-36 pb-48 md:pb-56">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default SlideContainer;
