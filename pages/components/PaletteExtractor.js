import { ColorExtractor } from 'react-color-extractor';

export default function PaletteExtractor({ selectedAlbum, setColors }) {
  return (
    <div>
      {selectedAlbum && (
        <>
          <ColorExtractor
            src={selectedAlbum.images[0].url}
            className="hidden"
            getColors={setColors}
          ></ColorExtractor>
        </>
      )}
    </div>
  );
}
