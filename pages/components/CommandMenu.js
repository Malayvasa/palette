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
        <div className="bg-black bg-opacity-20 rounded-md border-2 border-white border-opacity-10">
          <div className="flex flex-row gap-2 w-full text-white placeholder-white placeholder-opacity-80 rounded-t-md outline-none bg-white bg-opacity-20 p-2 md:p-4">
            <div className="opacity-40">
              <svg
                width="32px"
                height="32px"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M21 12v-2a5 5 0 00-5-5H8a5 5 0 00-5 5v0a5 5 0 005 5h4M20.124 19.119a3 3 0 10-4.248-4.237 3 3 0 004.248 4.237zm0 0L22 21"
                  stroke="#fff"
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

          <div className=" w-[300px] md:w-96">
            <div className=" flex flex-col w-full h-64 overflow-y-scroll">
              {albums &&
                albums.map((album, key) => (
                  <div>
                    <div
                      key={key}
                      onClick={() => {
                        handleSelect(album);
                      }}
                      className="cursor-pointer  py-2 px-4 flex flex-row w-72 md:w-96 items-center bg-white bg-opacity-5 hover:bg-opacity-10"
                    >
                      <img
                        src={album.images[2].url}
                        width={50}
                        height={50}
                        className="rounded-sm"
                      />
                      <div className="ml-4 text-sm text-white text-opacity-60">
                        {album.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
