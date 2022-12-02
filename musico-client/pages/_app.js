import { useState } from "react";
import MusicContext from "../lib/MusicContext";
import SearchContext from "../lib/SearchContext";
import UserContext from "../lib/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [userId, setUserId] = useState(0);
  const [currentSong, setCurrentSong] = useState();
  const [query, setQuery] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <SearchContext.Provider value={{ query, setQuery }}>
        <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
          {getLayout(<Component {...pageProps} />)}
        </MusicContext.Provider>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
