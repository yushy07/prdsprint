import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingNavProps {
  children: ReactNode;
  isValid: boolean;
}

export function FloatingNav({ children, isValid }: FloatingNavProps) {
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomNavVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    if (bottomNavRef.current) {
      observer.observe(bottomNavRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={bottomNavRef} className="w-full">
        {children}
      </div>

      <AnimatePresence>
        {isValid && !isBottomNavVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-6 left-0 right-0 z-[100] pointer-events-none flex justify-center px-6"
          >
            <div className="bg-[#0A0B12]/80 backdrop-blur-2xl border border-white/10 p-4 px-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center justify-between w-full max-w-4xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
