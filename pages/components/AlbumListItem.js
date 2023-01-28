import React, { useState } from 'react';
import PaletteExtractor from './PaletteExtractor';
import Palette from './Palette';
import AlbumPalette from './AlbumPalette';

export default function AlbumListView({ album }) {
  const [colors, setColors] = useState([]);

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <div>
        <img
          src={album.images[2].url}
          alt="Album Cover"
          width="50"
          height="50"
        />
      </div>

      <PaletteExtractor selectedAlbum={album} setColors={setColors} />
      <AlbumPalette colors={colors} />
    </div>
  );
}
