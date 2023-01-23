import { createContext, useState } from 'react';

export const AlbumContext = createContext([]);

function AlbumProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({
    name: '',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
      },
    ],
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
