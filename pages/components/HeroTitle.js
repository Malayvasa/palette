import { motion, AnimatePresence } from 'framer-motion';

export default function HeroTitle({ backgroundColor }) {
  const hero = {
    hidden: { x: -20, scale: 0, opacity: 0 },
    show: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      x: 10,
      scale: 0,
      opacity: 0,
    },
  };

  const color = backgroundColor ? backgroundColor : '#fff';

  return (
    <>
      <div className="text-white w-[304px] text-center items-center justify-center flex font-semibold md:mt-32 md:mb-0 text-3xl md:text-4xl">
        <div className="border-white conic_title relative w-full bg-black bg-opacity-10 p-4 border-opacity-10  rounded-t-md md:rounded-md flex flex-row items-end justify-center hero_text gap-2">
          <div>album</div>
          <div className="">
            <svg
              width="32px"
              height="32px"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color={color}
            >
              <AnimatePresence>
                <motion.path
                  variants={hero}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  key={color}
                  d="M6.75 12h10m0 0L14 14.75M16.75 12L14 9.25"
                  stroke={color}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></motion.path>
              </AnimatePresence>
              <path
                d="M2 15V9a4 4 0 014-4h12a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4z"
                stroke={color}
                stroke-width="1.5"
              ></path>
            </svg>
          </div>
          <div>palette</div>
        </div>
      </div>
    </>
  );
}
