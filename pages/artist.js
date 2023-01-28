import SearchMenu from './components/SearchMenu';
import { Context } from './context/context';
import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import HeroTitle from './components/HeroTitle';
import Background from './components/Background';
import Palette from './components/Palette';
import AlbumPreview from './components/AlbumPreview';
import PaletteExtractor from './components/PaletteExtractor';
import AlbumListView from './components/AlbumListItem';
import { ColorExtractor } from 'react-color-extractor';

export default function Artist() {
  const { selectedArtist } = useContext(Context);
  const [colors, setColors] = useState([]);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);

  const GetAlbumsByArtist = async (artistId) => {
    let tokenres = await fetch('/api/spotify?token=true', {
      method: 'POST',
    });

    let tokenResponse = await tokenres.json();
    let response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`,
      {
        headers: {
          Authorization: 'Bearer ' + tokenResponse.res.access_token,
          'Content-type': 'application/json',
        },
      }
    );
    let data = await response.json();
    if (data.items) {
      setSelectedArtistAlbums(data.items);
    } else {
      setSelectedArtistAlbums([]);
    }
  };

  useEffect(() => {
    if (selectedArtist) {
      GetAlbumsByArtist(selectedArtist.id);
    }
  }, [selectedArtist]);

  //   const handleRecievedAlbums = (albums) => {
  //     //filter albums to remove duplicates by name
  //     let filteredAlbums = albums.filter(
  //       (album, index, self) =>
  //         index === self.findIndex((t) => t.name === album.name)
  //     );

  //     // extract album name and image[0] from images from the album object and push object to new array
  //     let albumArray = [];
  //     filteredAlbums.forEach((album) => {
  //       albumArray.push({
  //         name: album.name,
  //         image: album.images[0],
  //         id: album.id,
  //       });
  //     });

  //     // for all albums in the array, get the colors from the PaletteExtractor component with a custom setColors function
  //     let albumColorsArray = [];

  //     albumArray.forEach((album) => {

  //     });

  //     console.log(albumColorsArray);
  //     console.log(albumArray);
  //   };

  return (
    <div className="bg-transparent overflow-hidden w-screen min-h-screen flex flex-col items-center justify-center gap-8 py-8 p-2 md:p-0">
      <Background backgroundColor={colors[0]} />
      <Toaster position="top-center" reverseOrder={false} />
      <HeroTitle backgroundColor={colors[0]} />
      <div className="flex w-screen flex-col md:mb-12 md:gap-8 lg:gap-0 md:flex-row items-start justify-center">
        <div className=" h-max gap-8 flex flex-col md:flex-row w-1/3 items-center justify-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedArtist && <SearchMenu type={'artist'} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className=" bg-white bg-opacity-10 p-4 h-[300px] overflow-scroll rounded-md">
          {selectedArtistAlbums.length > 0 && (
            <div className="flex flex-col gap-2">
              {selectedArtistAlbums.map((album, index) => (
                <AlbumListView key={album.id} album={album} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
