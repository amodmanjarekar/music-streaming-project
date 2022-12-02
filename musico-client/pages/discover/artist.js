import { useState } from "react";
import Layout from "../../components/layout";

export default function Artist() {
  const [artistName, setArtistName] = useState();

  return <>a</>;
}
Artist.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
