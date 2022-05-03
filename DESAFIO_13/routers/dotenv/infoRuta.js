import express from "express";
import minimist from "minimist";
import dotenv from "dotenv";
dotenv.config();

const infoRuta = express.Router();

infoRuta.get("/", (req, res) => {

  let argumentos= [];
   process.argv.forEach((val, index) => {
    argumentos+=`${index}: ${val}`;
  });
 
  const folder = process.cwd();
  const versionNode = process.version;
  const processId = process.version;
  const so = process.platform;
  const memory = process.memoryUsage().rss;
  const memoryRss = Math.round((memory / 1024 / 1024) * 100) / 100;
  const pid = process.pid;


  res.render("info.hbs", {
    argumentos: argumentos,
    path: pid,
    so: so,
    processId: processId,
    versionNode: versionNode,
    folder: folder,
    memory: memoryRss,
  });
});

export default infoRuta;
