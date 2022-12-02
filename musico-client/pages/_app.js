import { useState } from "react";
import MusicContext from "../lib/MusicContext";
import SearchContext from "../lib/SearchContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [currentSong, setCurrentSong] = useState();
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
        {getLayout(<Component {...pageProps} />)}
      </MusicContext.Provider>
    </SearchContext.Provider>
  );
}

export default MyApp;
