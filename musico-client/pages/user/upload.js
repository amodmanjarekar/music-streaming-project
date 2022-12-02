import axios from "axios";
import { useRef, useState } from "react";
import Layout from "../../components/layout";

export default function Upload() {
  const [albumName, setAlbumName] = useState("");
  const [nSong, setNSong] = useState(0);

  const albumNameRef = useRef();
  const nSongRef = useRef();

  const [songName1, setSongName1] = useState();
  const [songName2, setSongName2] = useState();
  const [songName3, setSongName3] = useState();
  const [songName4, setSongName4] = useState();
  const [songName5, setSongName5] = useState();
  const [songName6, setSongName6] = useState();
  const [songName7, setSongName7] = useState();
  const [songName8, setSongName8] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [file5, setFile5] = useState();
  const [file6, setFile6] = useState();
  const [file7, setFile7] = useState();
  const [file8, setFile8] = useState();

  const songName1Ref = useRef();
  const songName2Ref = useRef();
  const songName3Ref = useRef();
  const songName4Ref = useRef();
  const songName5Ref = useRef();
  const songName6Ref = useRef();
  const songName7Ref = useRef();
  const songName8Ref = useRef();
  const file1Ref = useRef();
  const file2Ref = useRef();
  const file3Ref = useRef();
  const file4Ref = useRef();
  const file5Ref = useRef();
  const file6Ref = useRef();
  const file7Ref = useRef();
  const file8Ref = useRef();

  // const runUploadLoop = (n) => {
  //   var inputs = [];
  //   for (var i = 0; i < n; i++) {
  //     inputs.push(
  //       <div>
  //         <input ref={} type="string" />
  //         <input type="file" />
  //       </div>
  //     );
  //   }
  //   return inputs;
  // };

  const handleUpload = async () => {
    setSongName1(songName1Ref.current.value);
    setFile1(file1Ref.current.value);

    for (var i = 0; i < nSong; i++) {
      let formdata = new FormData();
      var songfile = document.querySelector("#file1");
      console.log(typeof songfile.files[0]);
      console.log(songfile.files);

      formdata.append("album_name", albumName);
      formdata.append("userId", 19);
      formdata.append("file", songfile.files[0]);
      formdata.append("title", songName1Ref.current.value);

      console.log(formdata);

      await axios({
        method: "post",
        url: `http://${process.env.SERVER_URL}/profile/albums/upload`,
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      }).then((res) => {
        console.log(`${i}th song is uploaded`);
      });
    }
  };

  return (
    <div>
      <div>
        <input ref={albumNameRef} type="text" placeholder="Album name" />
        <input ref={nSongRef} type="number" placeholder="No of songs" />
        <button
          onClick={() => {
            setAlbumName(albumNameRef.current.value);
            setNSong(nSongRef.current.value);
          }}
        >
          Go
        </button>
      </div>
      {/* {nSong ? runUploadLoop(nSong) : <></>} */}

      <div>
        <input
          ref={songName1Ref}
          id="file1"
          type="text"
          disabled={nSong > 0 ? false : true}
        />
        <input ref={file1Ref} type="file" disabled={nSong > 0 ? false : true} />
      </div>
      <div>
        <input
          ref={songName2Ref}
          type="text"
          disabled={nSong > 1 ? false : true}
        />
        <input ref={file2Ref} type="file" disabled={nSong > 1 ? false : true} />
      </div>
      <div>
        <input
          ref={songName3Ref}
          type="text"
          disabled={nSong > 2 ? false : true}
        />
        <input ref={file3Ref} type="file" disabled={nSong > 2 ? false : true} />
      </div>
      <div>
        <input
          ref={songName4Ref}
          type="text"
          disabled={nSong > 3 ? false : true}
        />
        <input ref={file4Ref} type="file" disabled={nSong > 3 ? false : true} />
      </div>
      <div>
        <input
          ref={songName5Ref}
          type="text"
          disabled={nSong > 4 ? false : true}
        />
        <input ref={file5Ref} type="file" disabled={nSong > 4 ? false : true} />
      </div>
      <div>
        <input
          ref={songName6Ref}
          type="text"
          disabled={nSong > 5 ? false : true}
        />
        <input ref={file6Ref} type="file" disabled={nSong > 5 ? false : true} />
      </div>
      <div>
        <input
          ref={songName7Ref}
          type="text"
          disabled={nSong > 6 ? false : true}
        />
        <input ref={file7Ref} type="file" disabled={nSong > 6 ? false : true} />
      </div>
      <div>
        <input
          ref={songName8Ref}
          type="text"
          disabled={nSong > 7 ? false : true}
        />
        <input ref={file8Ref} type="file" disabled={nSong > 7 ? false : true} />
      </div>
      <button
        onClick={() => {
          handleUpload();
        }}
        disabled={nSong ? false : true}
      >
        Done
      </button>
    </div>
  );
}

Upload.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
