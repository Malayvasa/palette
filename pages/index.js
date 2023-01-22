import GetAlbums from './components/GetAlbums';
import List from './components/List';
import CommandMenu from './components/CommandMenu';
import { AlbumContext } from './context/albumContext';
import { useContext, useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import { ColorExtractor } from 'react-color-extractor';
import { motion, AnimatePresence } from 'framer-motion';
import colorSort from 'color-sorter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';

export default function Home() {
  const { selectedAlbum, setSelectedAlbum } = useContext(AlbumContext);
  const [colors, setColors] = useState([]);
  const notify = () => toast('Here is your toast.');

  const postHogExport = () => {
    const preset = {
      album: selectedAlbum.name,
      artist: selectedAlbum.artists[0].name,
      colors: colors,
    };
    return preset;
  };

  useEffect(() => {
    posthog.init('phc_EVZGmJUZIJpHpoCH8MGOyQIH309i78N9bQbOPEN21PF', {
      api_host: 'https://app.posthog.com',
    });
  }, []);

  useEffect(() => {
    let sortedColors = colors;
    setColors(sortedColors);
    console.log(sortedColors);
    document.documentElement.style.setProperty('--border-color', colors[0]);
  }, [colors]);

  return (
    <div
      className="bg-black min-h-screen flex items-center justify-center py-8 p-2 md:p-0"
      style={{
        background: `radial-gradient(circle at right, rgba(0,0,0,1) 60%, ${colors[0]} 100%)`,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="  h-max gap-8 flex flex-col md:flex-row w-full items-center md:items-start justify-center">
        <CommandMenu />
        <ColorExtractor className="hidden" getColors={setColors}>
          <img
            className="rounded-md hidden"
            src={selectedAlbum.images[0].url}
            alt="Album Cover"
            onClick={() => {
              console.log(colors);
            }}
          ></img>
        </ColorExtractor>
        <AnimatePresence>
          {selectedAlbum && (
            <div className="flex flex-col md:flex-col-reverse items-center gap-8">
              <div className="">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  key={colors}
                  staggerChildren={1}
                  className="flex flex-row gap-2 backdrop-blur-xl w-max justify-around bg-black bg-opacity-5 border-2 border-white border-opacity-10 p-4 rounded-md"
                >
                  {colors.map((color, key) => {
                    return (
                      <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        staggerChildren={1}
                        key={color[key]}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                  {colors.length > 0 ? (
                    <CopyToClipboard
                      text={colors}
                      onCopy={() => {
                        toast('Palette Copied', {
                          icon: '🎉',
                        });
                        posthog.capture('Palette Copied', postHogExport());
                      }}
                    >
                      <div className="w-8 h-8 md:w-12 flex items-center justify-center md:h-12 rounded-md bg-white bg-opacity-20 opacity-40 backdrop-blur-lg">
                        <svg
                          width="32px"
                          height="32px"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#ffffff"
                        >
                          <path
                            d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h9.8a.6.6 0 01.6.6v9.8a.6.6 0 01-.6.6z"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M15 9V4.6a.6.6 0 00-.6-.6H4.6a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6H9"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </CopyToClipboard>
                  ) : (
                    <></>
                  )}
                </motion.div>
              </div>
              <div className="z-0 relative conic">
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  key={selectedAlbum.name}
                >
                  <div className="">
                    <div
                      className="rounded-md hidden md:block"
                      style={{
                        //add the album image as a background image
                        backgroundImage: `url(${selectedAlbum.images[1].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '500px',
                        height: '500px',
                      }}
                    ></div>
                    <div
                      className="rounded-md block md:hidden"
                      style={{
                        //add the album image as a background image
                        backgroundImage: `url(${selectedAlbum.images[1].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '300px',
                        height: '300px',
                      }}
                    ></div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
