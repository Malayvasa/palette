import { motion, AnimatePresence } from 'framer-motion';
import { Context } from '../context/context';
import { useContext } from 'react';
import Link from 'next/link';

export default function HeroTitle() {
  const { primaryColor } = useContext(Context);
  const backgroundColor = primaryColor ? primaryColor : '#fff';

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

  //handleclick to add and remove hero_shadow_click class for 1sec
  const handleClick = () => {
    const hero = document.querySelector('.hero_shadow');
    hero.classList.add('hero_shadow_click');
    setTimeout(() => {
      hero.classList.remove('hero_shadow_click');
    }, 200);
  };

  const color = backgroundColor ? backgroundColor : '#fff';

  return (
    <>
      <Link
        href="/"
        className="text-black text-center items-center justify-center flex font-semibold md:mt-12 md:mb-0 text-3xl md:text-4xl"
      >
        <div className="relative overflow-hidden p-1 rounded-md">
          <div className="before_conic_title"></div>
          <div className="border-white conic_title relative w-full rounded-md bg-black p-4 border-opacity-10">
            <div
              className="flex flex-row text-white items-end gap-2 rounded-md hero_shadow"
              onClick={() => {
                handleClick();
              }}
            >
              <div className=" select-none">album</div>
              <div className="">
                <svg
                  width="32px"
                  height="32px"
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></motion.path>
                  </AnimatePresence>
                  <path
                    d="M2 15V9a4 4 0 014-4h12a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4z"
                    stroke={color}
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </div>
              <div className=" select-none">palette</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
