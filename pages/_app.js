import '@/styles/globals.css';
import AlbumProvider from './context/albumContext';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const postHogExport = () => {
    const preset = {
      album: selectedAlbum.name,
      artist: selectedAlbum.artists[0].name,
      colors: colors,
    };
    return preset;
  };

  useEffect(() => {
    posthog.init('phc_EVZGmJUZIJpHpoCH8MGOyQIH309i78N9bQbOPEN21PF', {
      api_host: 'https://app.posthog.com',
    });
  }, []);

  return (
    <>
      <AlbumProvider>
        <Component {...pageProps} />
      </AlbumProvider>
    </>
  );
}
