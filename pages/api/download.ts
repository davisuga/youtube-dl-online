// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import youtubedl, { YtFlags, YtResponse, exec } from "youtube-dl-exec";
import fs from "fs/promises";
import { promisify } from "util";
import stream from "stream";
import fetch from "node-fetch";
import path from "path";
import { createReadStream } from "fs";
const filterByExtension = (extension: string) => (file: string) =>
  file.endsWith(extension);

const filter =
  <In, Out>(fn: (x: In) => Out) =>
  (xs: In[]) =>
    xs.filter(fn);

const listVideos = () =>
  fs.readdir(".").then(filter(filterByExtension(".mp4")));

const lastOf = <In>(xs: In[]) => xs[xs.length - 1];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const pipeline = promisify(stream.pipeline);

  const flags = req.body as YtFlags & { url: string };
  const result = await youtubedl(
    flags.url || "https://www.youtube.com/watch?v=KrlkEv26Gls"
  );
  const videos = await listVideos();
  const filePath = path.join(lastOf(videos));
  console.log({ videos, videoLocation: filePath });
  const buff = await fs.readFile(filePath);
  console.log({ buff });
  res.setHeader("Content-Type", "video/mp4");
  const readStream = createReadStream(filePath);

  readStream.pipe(res);
}
