import { ColorExtractor } from 'react-color-extractor';

export default function PaletteExtractor({ selectedAlbum, setColors }) {
  return (
    <div>
      {selectedAlbum.length != 0 ? (
        <>
          <ColorExtractor className="hidden" getColors={setColors}>
            <img
              className="rounded-md hidden"
              src={selectedAlbum.images[0].url}
              alt="Album Cover"
              onClick={() => {
                console.log(colors);
              }}
            ></img>
          </ColorExtractor>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
