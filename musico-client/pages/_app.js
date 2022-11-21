import { useState } from "react";
import MusicContext from "../lib/MusicContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [currentSong, setCurrentSong] = useState();

  return (
    <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
      {getLayout(<Component {...pageProps} />)}
    </MusicContext.Provider>
  );
}

export default MyApp;
