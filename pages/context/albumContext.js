import { createContext, useState } from 'react';

export const AlbumContext = createContext([]);

function AlbumProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({
    name: 'Album Name',
    artists: [{ name: 'Artist Name' }],
    images: [{ url: '/images/album.png' }, { url: '/images/album.png' }],
  });

  return (
    <AlbumContext.Provider
      value={{ albums, setAlbums, selectedAlbum, setSelectedAlbum }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export default AlbumProvider;
