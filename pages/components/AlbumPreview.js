import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function AlbumPreview({ selectedAlbum }) {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--image',
      `url('${selectedAlbum.images[0].url}')`
    );
  }, [selectedAlbum]);

  return (
    <div className="relative">
      {selectedAlbum.length != 0 ? (
        <>
          <motion.div
            initial={{
              y: 0,
              opacity: 0,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              y: 0,
              opacity: 1,
              translateX: '-50%',
              translateY: '-50%',
            }}
            exit={{
              y: 0,
              opacity: 0,
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{ duration: 1 }}
            key={selectedAlbum.name}
            id="albumPreview"
            className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl albumImage rounded-md w-[250px] md:w-[300px] xl:w-[500px] aspect-square"
          ></motion.div>
          <div className="z-0 relative conic  p-8 md:p-12">
            <motion.div
              initial={{ y: -10, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0.5 }}
              transition={{ duration: 1 }}
              key={selectedAlbum.name}
              className="relative"
            >
              <div
                id="albumPreview"
                className="blur-xl opacity-30 albumImage rounded-md w-[250px] md:w-[300px] xl:w-[500px] aspect-square"
              ></div>
            </motion.div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
