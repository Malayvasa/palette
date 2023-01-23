import { useEffect, useState, useContext } from 'react';
import { Command } from 'cmdk';
import List from './List';
import { AlbumContext } from '../context/albumContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState('');
  const { albums, setAlbums, selectedAlbum, setSelectedAlbum } =
    useContext(AlbumContext);

  let GetAlbums = async () => {
    if (artist.length < 1) {
      setAlbums([]);
      return;
    }

    let tokenres = await fetch('/api/spotify?token=true', {
      method: 'POST',
    });

    let tokenResponse = await tokenres.json();

    let response = await fetch(
      `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${artist}`,
      {
        headers: {
          Authorization: 'Bearer ' + tokenResponse.res.access_token,
          'Content-type': 'application/json',
        },
      }
    );

    let data = await response.json();
    if (data.albums) {
      setAlbums(data.albums.items);
    } else {
      setAlbums([]);
    }
  };

  const handleSelect = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <div className="centered">
      <div>
        <div className="bg-black bg-opacity-0 rounded-md border-2 border-white border-opacity-10">
          <div className="flex flex-row gap-2 w-full text-white placeholder-white placeholder-opacity-80 rounded-t-md outline-none bg-white bg-opacity-0  p-2 md:p-4">
            <div className="opacity-40">
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
                  d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <input
              className="bg-transparent outline-none w-full text-white placeholder-white placeholder-opacity-80"
              placeholder="Search for an album"
              autoComplete="off"
              id="search"
              value={artist}
              onChange={(e) => {
                setArtist(e.target.value);
                if (e.target.value.length > 0) {
                  GetAlbums();
                } else {
                  setAlbums([]);
                  setArtist('');
                }
              }}
            />
          </div>

          <div className=" max-w-[300px] w-96 ">
            {albums.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                key={albums}
                className="border-t-2 border-white border-opacity-10 flex flex-col w-full max-h-72 overflow-y-scroll"
              >
                {albums.map((album, key) => (
                  <div
                    key={key}
                    onClick={() => {
                      handleSelect(album);
                    }}
                    className="cursor-pointer  py-2 px-4 flex flex-row max-w-[300px] w-96 items-center bg-white bg-opacity-0 hover:bg-opacity-5"
                  >
                    <img
                      src={album.images[0].url}
                      width={50}
                      height={50}
                      className="rounded-sm"
                    />
                    <div className="ml-4 text-sm text-white text-opacity-60">
                      {album.name}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
