axios = require("axios");
require("./global.js");

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
const getTokenById = (id) => {
    let item = null;
    try {
      id = parseInt(id);
      // get item
        item = global.tokenDb["data"][id-1];
        //market data
        md = global.marketDb[id];
        if (md) {
          item.price = md.price;
          item.token_add = md.token_add;
        }
        return addScoreToItem(item);
    } catch (error) {
        console.log('getTokenById', error)
    }
    return null;
  };

const init = async () => {
    try {
        //token info
        let jsonString = fs.readFileSync("./server/fancyfrenchies.json");
        global.tokenDb = JSON.parse(jsonString);
    
        //market info
        console.log("parsing market data");
        global.marketDb = await util.getMarketInfo();
        console.log("market items count: ", global.marketDb.length);
    } catch (error) {
        console.log("error while parsing market data: ", error);
        return;
    }
}
const addScoreToItem = (item) => {
    let {attributes} = item;
    attributes.forEach ((attr, index) => {
        const {trait_type, value} = attr;
        const [score, percent] = global.tokenDb['attr'][trait_type][value]
        attr.score = score;
        attr.percent = percent;
    });
    return item;
}
module.exports.getMarketInfo = getMarketInfo;
module.exports.getTokenById = getTokenById;
module.exports.init = init;