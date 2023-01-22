import '@/styles/globals.css';
import AlbumProvider from './context/albumContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AlbumProvider>
        <Component {...pageProps} />
      </AlbumProvider>
    </>
  );
}
