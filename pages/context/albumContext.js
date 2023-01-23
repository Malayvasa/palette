import { createContext, useState } from 'react';

export const AlbumContext = createContext([]);

function AlbumProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({
    name: '',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81',
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
