dotenv = require("dotenv");
express = require("express");
fs = require("fs");
axios = require("axios");
path = require("path");
dotenv.config();
util = require("./util.js");
require("./global.js");


(async () => {
  const PORT = process.env.PORT || 3001;
  const app = express();
  
  app.use(express.urlencoded());
  app.use(express.json());
  
  if (process.env.NODE_ENV != 'development')
  { 
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  //read from file
  console.log("parsing token db json");
  let db_token = null;
  
  await util.init();

  app.listen(PORT, () => {
    console.log(`server is listenng on ${PORT}`);
  });


  app.post("/token_by_id", (req, res) => {
    let id = req.body.id;
    let ret = {};
    console.log("toekn by id", id);
    let item = util.getTokenById(id);
    ret.item = item;
    ret.success = item ? true : false;
    res.json(ret);
  });


  app.post("/token_by_rank", (req, res) => {
    let rank = req.body.rank;
    let ret = {};
    let item = null;
    console.log("token by rank", rank);
    //check validity
    try {
      rank = parseInt(rank) - 1;
      let id = global.tokenDb["rank"][rank][0];
      item = util.getTokenById(id + 1);
    } catch (error) {
      console.log('error', error);
    }
    ret.item = item;
    ret.success = item ? true : false;
    res.json(ret);
  });

})();
