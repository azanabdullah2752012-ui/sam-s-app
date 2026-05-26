import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Scroll3DWrapper = ({ children, className = '' }) => {
  const ref = useRef(null);
  
  // Track the scroll progress of this specific element within the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll value for organic movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values based on scroll position
  // When scrolling into view (0 -> 0.5): Tilt up, scale up, fade in
  // When scrolling out of view (0.5 -> 1): Tilt down, scale down, fade out
  
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <div ref={ref} className={`perspective-[1000px] w-full ${className}`}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          y,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3DWrapper;
