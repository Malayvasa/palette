import { createContext, useState } from 'react';

export const Context = createContext([]);

function ContextProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [primaryColor, setPrimaryColor] = useState('#fff');
  const [selectedAlbum, setSelectedAlbum] = useState({
    name: '',
    id: '3MZsBdqDrRTJihTHQrO6Dq',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81',
      },
    ],
  });
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState({
    name: '',
    id: '3MZsBdqDrRTJihTHQrO6Dq',
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
    <Context.Provider
      value={{
        albums,
        setAlbums,
        primaryColor,
        setPrimaryColor,
        selectedAlbum,
        setSelectedAlbum,
        artists,
        setArtists,
        selectedArtist,
        setSelectedArtist,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
