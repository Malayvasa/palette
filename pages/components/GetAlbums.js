import { AlbumContext } from '../context/albumContext';
import React, { useContext, useState } from 'react';

export default function GetAlbums() {
  const [artist, setArtist] = useState('');
  const { albums, setAlbums } = useContext(AlbumContext);

  let GetAlbums = async () => {
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
    }
  };

  return (
    <div className="flex flex-col gap-10  p-5 justify-center items-center mx-auto">
      <input
        placeholder="artist name"
        value={artist}
        onChange={(e) => {
          setArtist(e.target.value);
          GetAlbums();
        }}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
