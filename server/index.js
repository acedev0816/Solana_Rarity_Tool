const express = require("express");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const getMarketInfo = async () => {
  let ret = [];
  let market_data = await axios.get(
    "https://qzlsklfacc.medianetwork.cloud/nft_for_sale?collection=fancyfrenchies"
  );
  // console.log('market_data', market_data.data.length);
  market_data = market_data.data;
  market_data.forEach((md) => {
    let name = md.name;
    name = name.split('#');
    id = name[1].trim();
    ret[id] = md;
  });
  return ret;
};

(async () => {
  const PORT = process.emit.PORT || 3001;
  const app = express();
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.use(express.urlencoded());
  app.use(express.json());

  //read from file
  console.log("parsing token meta data files");
  let token_info = null;
  let rank_info = null;
  let market_info = [];

  try {
    //token info
    let jsonString = fs.readFileSync("./server/token_data_info.json");
    token_info = JSON.parse(jsonString);

    //rank info
    jsonString = fs.readFileSync("./server/token_rank_info.json");
    rank_info = JSON.parse(jsonString);

    //market info
    console.log("parsing market data");
    market_info = await getMarketInfo();
    console.log("market items count: ", market_info.length);
  } catch (error) {
    console.log(error);
    return;
  }

  app.listen(PORT, () => {
    console.log(`server is listenng on ${PORT}`);
  });

  const getTokenById = (id) => {
    let item = null;
    try {
      id = parseInt(id);
      // get item
      try {
        item = token_info[id];
        //market data
        md = market_info[id];
        if (md) {
          item.price = md.price;
          item.token_add = md.token_add;
        }
        return item;
      } catch (error) {}
    } catch (error) {}
    return item;
  };
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
  app.post("/token_by_id", (req, res) => {
    let id = req.body.id;
    let ret = {};
    console.log("toekn by id", id);
    let item = getTokenById(id);
    ret.item = item;
    ret.success = item ? true : false;
    res.json(ret);
  });

  app.post("/token_by_rank", (req, res) => {
    let rank = req.body.rank;
    let ret = {};
    let item = null;
    //check validity
    try {
      rank = parseInt(rank);
      try {
        let id = rank_info[rank][0];
        console.log("token by rank", rank);
        item = getTokenById(id);
      } catch {}
    } catch (error) {}
    ret.item = item;
    ret.success = item ? true : false;
    res.json(ret);
  });
})();
