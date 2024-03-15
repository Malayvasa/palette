import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Color from 'color';

export default function Palette({ colors }) {
  const container = {
    hidden: { y: 0, opacity: 1 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { scale: 1, y: -50, opacity: 0 },
    show: { scale: 1, y: 0, opacity: 1 },
    exit: { scale: 1, y: -50, opacity: 0 },
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColorHSL, setSelectedColorHSL] = useState({
    h: 0,
    s: 0,
    l: 0,
  });
  const [paletteHEX, setPaletteHEX] = useState('');
  const [paletteRGB, setPaletteRGB] = useState('');
  const [paletteHSL, setPaletteHSL] = useState('');

  const paletteToast = (mode) => {
    toast.success(mode + ' Palette copied to clipboard!');
  };

  const colorToast = (mode) => {
    toast.success(mode + ' Color copied to clipboard!');
  };

  function copySVG(hexList) {
    // convert hexlist to a svg with a row of squares with hex as background color
    // make as many squares as there are colors in the palette
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
    width="${hexList.length * 100}" 
    height="100" viewBox="0 0 ${hexList.length * 100} 100">
    ${hexList
      .map(
        (hex, index) =>
          `<rect width="100" height="100" fill="${hex}" x="${
            index * 100
          }" y="0" />`
      )
      .join('')}
    </svg>`;

    // copy svg to clipboard
    const el = document.createElement('textarea');
    el.value = svg;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success('SVG Copied to clipboard!');
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--border-color', colors[0]);
    //make a string of all the colors and set to paletteHEX state
    let hex = '';
    colors.forEach((color) => {
      hex += color + ', ' + '\n';
    });
    setPaletteHEX(hex);

    //make a string of all the colors and set to paletteRGB state
    let rgb = '';
    colors.forEach((color) => {
      rgb += Color(color).rgb().string() + ', ' + '\n';
    });
    setPaletteRGB(rgb);

    //make a string of all the colors and set to paletteHSL state
    let hsl = '';
    colors.forEach((color) => {
      //convert to hsl and set h precision to 0
      let hslColor = Color(color).hsl().object();
      hslColor.h = hslColor.h.toFixed(1);
      hslColor.s = Math.round(hslColor.s);
      hslColor.l = Math.round(hslColor.l);
      hsl += `hsl(${hslColor.h}°, ${hslColor.s}%, ${hslColor.l}%)` + ',' + '\n';
    });
    setPaletteHSL(hsl);

    setSelectedColorIndex(0);
  }, [colors]);

  useEffect(() => {
    const color = Color(colors[selectedColorIndex]);
    const hsl = color.hsl().object();
    setSelectedColorHSL(hsl);
  }, [selectedColorIndex]);

  return (
    <div className="my-8 lg:ml-8 flex flex-col gap-0">
      <AnimatePresence exitBeforeEnter>
        {colors && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            key={colors}
          >
            <div className="flex flex-col max-w-[300px] w-96 overflow-hidden border-x-2 border-t-2 border-white border-opacity-10 rounded-t-2xl p-4 backdrop-blur-xl items-center justify-between bg-black bg-opacity-5">
              <div className="flex w-full justify-between">
                {colors.map((color, key) => {
                  return (
                    <motion.div
                      variants={item}
                      key={color[key]}
                      className={
                        (key == selectedColorIndex
                          ? `ring-2 ring-offset-2 ring-white ring-opacity-0 `
                          : ``) + `w-8 h-8 aspect-square rounded-md`
                      }
                      style={{ backgroundColor: color }}
                      onMouseEnter={() => {
                        setSelectedColorIndex(key);
                      }}
                    ></motion.div>
                  );
                })}
              </div>
              <div className="text-white h-8 gap-2 flex mt-4 justify-between w-full ">
                <div
                  onClick={() => {
                    copySVG(colors);
                  }}
                  className="bg-white w-32 cursor-pointer flex items-center justify-center rounded-md bg-opacity-5 hover:bg-opacity-10 transition-colors"
                >
                  SVG
                </div>
                <CopyToClipboard
                  text={paletteHEX}
                  onCopy={() => {
                    paletteToast('HEX');
                  }}
                >
                  <div className="bg-white w-32 cursor-pointer flex items-center justify-center rounded-md bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    HEX
                  </div>
                </CopyToClipboard>
                <CopyToClipboard
                  text={paletteRGB}
                  onCopy={() => {
                    paletteToast('RGB');
                  }}
                >
                  <div className="bg-white w-32 cursor-pointer flex items-center justify-center rounded-md bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    RGB
                  </div>
                </CopyToClipboard>
                <CopyToClipboard
                  text={paletteHSL}
                  onCopy={() => {
                    paletteToast('HSL');
                  }}
                >
                  <div className="bg-white w-32 cursor-pointer flex items-center justify-center rounded-md bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    HSL
                  </div>
                </CopyToClipboard>
              </div>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              key={colors[selectedColorIndex]}
              className="flex items-start max-w-[300px] w-96 overflow-hidden border-2 border-white border-opacity-10 rounded-b-2xl space-x-2 flex-row p-4 backdrop-blur-xl r justify-between bg-black bg-opacity-5"
            >
              <motion.div
                variants={item}
                key={colors[selectedColorIndex]}
                className="w-8 h-8 aspect-square rounded-md"
                style={{ backgroundColor: colors[selectedColorIndex] }}
              ></motion.div>
              <div className="flex gap-2 flex-col flex-grow text-white text-opacity-60">
                <CopyToClipboard
                  text={colors[selectedColorIndex]}
                  onCopy={() => {
                    colorToast('HEX');
                  }}
                >
                  <div className="w-full cursor-pointer h-8 px-2 justify-between rounded-md flex items-center bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    <div className="text-white text-opacity-20">HEX</div>
                    {colors[selectedColorIndex]}
                  </div>
                </CopyToClipboard>
                <CopyToClipboard
                  text={Color(colors[selectedColorIndex])
                    .rgb()
                    .array()
                    .join(', ')}
                  onCopy={() => {
                    colorToast('RGB');
                  }}
                >
                  <div className="w-full cursor-pointer h-8 px-2 justify-between rounded-md flex items-center bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    <div className="text-white text-opacity-20">RGB</div>
                    {Color(colors[selectedColorIndex]).rgb().array().join(', ')}
                  </div>
                </CopyToClipboard>
                <CopyToClipboard
                  text={`hsl(${selectedColorHSL.h.toFixed(
                    2
                  )}°, ${selectedColorHSL.s.toFixed(
                    0
                  )}%, ${selectedColorHSL.l.toFixed(0)}%)`}
                  onCopy={() => {
                    colorToast('HSL');
                  }}
                >
                  <div className="w-full cursor-pointer h-8 px-2 justify-between rounded-md flex items-center bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                    <div className="text-white text-opacity-20">HSL</div>
                    {selectedColorHSL.h.toFixed(2)}°{' '}
                    {selectedColorHSL.s.toFixed(0)}%{' '}
                    {selectedColorHSL.l.toFixed(0)}%
                  </div>
                </CopyToClipboard>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
