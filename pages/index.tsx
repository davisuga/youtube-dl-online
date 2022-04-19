import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={({ target }) => setVideoUrl(target.value)}
      />
      <input type="button">Download video</input>
    </div>
  );
};

export default Home;
