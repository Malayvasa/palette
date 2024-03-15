import { useEffect, useState, useContext } from 'react';
import { Command } from 'cmdk';
import { Context } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchMenu({ type }) {
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const {
    albums,
    setAlbums,
    selectedAlbum,
    setSelectedAlbum,
    artists,
    setArtists,
    selectedArtist,
    setSelectedArtist,
  } = useContext(Context);

  const presetArtists = ['Doja Cat', 'The Weeknd', 'Joji'];

  const presetSearch = (preset) => {
    setSearchString(preset);
  };

  let GetData = async () => {
    let tokenres = await fetch('/api/spotify?token=true', {
      method: 'POST',
    });

    let tokenResponse = await tokenres.json();

    let response = await fetch(
      `https://api.spotify.com/v1/search?type=${type}&include_external=audio&q=${searchString}`,
      {
        headers: {
          Authorization: 'Bearer ' + tokenResponse.res.access_token,
          'Content-type': 'application/json',
        },
      }
    );

    let data = await response.json();
    if (type === 'album') {
      if (data.albums) {
        setAlbums(data.albums.items);
      } else {
        setAlbums([]);
      }
    } else if (type === 'artist') {
      if (data.artists) {
        setArtists(data.artists.items);
      } else {
        setArtists([]);
      }
    }
  };

  //write a hook to call getAlbums when the artist changes
  useEffect(() => {
    if (searchString.length > 0) {
      GetData();
    } else {
      if (type === 'album') {
        setAlbums([]);
      } else if (type === 'artist') {
        setArtists([]);
      }
    }
  }, [searchString]);

  const handleAlbumSelect = (album) => {
    console.log(album);
    setSelectedAlbum(album);
  };

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
  };

  return (
    <div className="centered">
      {
        <>
          <div className="text-white/20 mb-2">Examples</div>
          <div className="flex flex-col max-w-[300px] w-96 overflow-scroll">
            <div className="mb-4 flex w-max">
              {presetArtists.map((artist) => (
                <button
                  key={artist}
                  onClick={() => presetSearch(artist)}
                  className="bg-white/5 w-max text-white/50 text-sm py-2 px-4 rounded-full mr-2 mb-2"
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>
        </>
      }

      <div>
        <div className="bg-black bg-opacity-0 rounded-2xl border-2 border-white border-opacity-10">
          <div className="flex flex-row items-center gap-2 w-full text-white placeholder-white placeholder-opacity-80 rounded-t-md outline-none bg-white bg-opacity-0  p-2 md:p-4">
            <div className="opacity-20">
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
              className="bg-transparent outline-none w-full text-white placeholder-white/20 placeholder-opacity-80"
              placeholder={`Search for an album/artist`}
              autoComplete="off"
              id="search"
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            />
            {searchString.length > 0 && (
              <div className="opacity-40" onClick={() => setSearchString('')}>
                <svg
                  width="24px"
                  height="24px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#fff"
                >
                  <path
                    d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          {type == 'album' && (
            <div className="  max-w-[300px] w-96 ">
              <AnimatePresence>
                {albums.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    key={albums}
                    className=" border-white rounded-b-2xl border-opacity-10 flex flex-col w-full max-h-[300px] overflow-y-scroll"
                  >
                    {albums.map((album, key) => (
                      <div
                        key={key}
                        onClick={() => {
                          handleAlbumSelect(album);
                        }}
                        className="cursor-pointer  py-2 px-4 flex flex-row max-w-[300px] w-96 items-center bg-white bg-opacity-0 hover:bg-opacity-5"
                      >
                        <img
                          alt={album.name}
                          src={album.images[2].url}
                          width="50"
                          height="50"
                          className="rounded-sm"
                        />
                        <div className="ml-4 text-sm text-white text-opacity-60">
                          {album.name}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
