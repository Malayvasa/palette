import { motion, AnimatePresence } from 'framer-motion';

export default function Background({ backgroundColor }) {
  const bg = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.5,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <div className="fixed w-screen h-screen top-0 left-0 bg-black -z-20"></div>
      <AnimatePresence>
        <motion.div
          variants={bg}
          initial="hidden"
          animate="show"
          exit="hidden"
          key={backgroundColor}
          className="fixed w-screen h-screen top-0 left-0 bg-black -z-10"
          style={{
            background: `radial-gradient(circle, ${backgroundColor} 0%, rgba(0,0,0,1) 160% )`,
          }}
        ></motion.div>
      </AnimatePresence>
    </>
  );
}
