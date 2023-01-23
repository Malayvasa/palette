import CommandMenu from './components/CommandMenu';
import { AlbumContext } from './context/albumContext';
import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import HeroTitle from './components/HeroTitle';
import Background from './components/Background';
import Palette from './components/Palette';
import AlbumPreview from './components/AlbumPreview';
import PaletteExtractor from './components/PaletteExtractor';

export default function Home() {
  const { selectedAlbum, setSelectedAlbum } = useContext(AlbumContext);
  const [colors, setColors] = useState([]);

  return (
    <div className=" overflow-hidden min-h-screen flex flex-col items-center justify-center gap-0 md:gap-8 py-8 p-2 md:p-0">
      <Background backgroundColor={colors[0]} />
      <Toaster position="top-center" reverseOrder={false} />
      <HeroTitle backgroundColor={colors[0]} />
      <div className="flex flex-col md:gap-8 lg:gap-0 md:flex-row items-center justify-center">
        <div className=" h-max gap-8 flex flex-col md:flex-row w-full items-center justify-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedAlbum && <CommandMenu />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          {selectedAlbum.length != 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:ml-8"
            >
              <div className="flex flex-col md:flex-col-reverse lg:flex-row-reverse items-center">
                <PaletteExtractor
                  selectedAlbum={selectedAlbum}
                  setColors={setColors}
                />
                <Palette colors={colors} />
                <AlbumPreview selectedAlbum={selectedAlbum} />
              </div>
            </motion.div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
