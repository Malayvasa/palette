import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Palette from './Palette';
import colorify from 'colorify.js';

export default function AlbumPreview({ colors, selectedAlbum }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--image',
      `url('${selectedAlbum.images[0].url}')`
    );
  }, [selectedAlbum]);

  return (
    <div className="relative h-full">
      {selectedAlbum && (
        <>
          <motion.div
            initial={{
              translate: '-50% -50%',
              top: '50%',
              left: '50%',
            }}
            animate={{
              transformOrigin: 'center',
              translate: '-50% -50%',
              top: '50%',
              left: '50%',
              zIndex: 20,
            }}
            transition={{
              duration: 0.5,
              type: 'spring',
            }}
            className="absolute w-[250px] md:w-[300px] xl:w-[400px] aspect-square  "
          >
            <Image
              priority
              src={selectedAlbum.images[0].url}
              alt={`Cover of the album ${selectedAlbum.name}`}
              width={400}
              height={400}
              objectFit="cover"
              className="rounded-xl "
            />
          </motion.div>

          <div className="z-0 relative conic shadow-xl w-[250px] md:w-[300px] xl:w-[500px] aspect-square p-8 md:p-12"></div>
        </>
      )}
    </div>
  );
}
