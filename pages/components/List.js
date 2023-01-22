import React, { useContext } from 'react';
import { AlbumContext } from '../context/albumContext';

export default function List() {
  const { albums } = useContext(AlbumContext);
  return (
    <div className="flex flex-col w-full h-32 overflow-scroll justify-center items-center">
      {albums &&
        albums.map((album, key) => (
          <div
            key={key}
            className="flex flex-row w-full justify-center items-center mx-auto shadow-md hover:shadow-2xl transition-shadow duration-500 ease-in-out"
          >
            <h3>{album.name}</h3>
          </div>
        ))}
    </div>
  );
}
