import "./index.css";
import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { AttIndicator } from "../../components";
export function HomeView() {
  const inputRank = useRef(null);
  const inputId = useRef(null);
  const [item_info, setItemInfo] = useState({});
  const [token_id, setTokenId] = useState("");
  const [rank, setRank] = useState(1);

  const getTokenById = useCallback(async () => {
    console.log("get by id");
    let response = await axios.post("/token_by_id", {
      id: token_id,
    });
    if (response.data.success === false) return;
    console.log("id response", response);
    setItemInfo(response.data.item);
    setRank(response.data.item.rank + 1);
  }, [token_id]);

  const getTokenByRank = useCallback(async () => {
    console.log("get by rank");
    let response = await axios.post("/token_by_rank", {
      rank: rank,
    });
    if (response.data.success === false) return;
    console.log("rank response", response);
    setItemInfo(response.data.item);
    setTokenId(response.data.item.custom_id);
  }, [rank]);

  //handle rank change event
  const handleRankChange = (e) => {
    let text = e.target.value;
    if (checkValidity(text)) {
      setRank(text);
    } else {
      e.preventDefault();
    }
  };

  //handle id change event
  const handleIdChange = (e) => {
    let text = e.target.value;
    if (checkValidity(text)) {
      setTokenId(text);
    } else {
      e.preventDefault();
    }
  };

  const checkValidity = (str) => {
    if (str === "") return true;
    if (isNaN(str)) return false;
    let n = parseInt(str);
    if (n > 0 && n <= 10000) return true;
    return false;
  };
  useEffect( () => {
    inputRank.current.focus();
  }, []);

  useEffect(() => {
    if (inputRank.current === document.activeElement && checkValidity(rank))
      getTokenByRank();
  }, [rank]);

  useEffect(() => {
    // console.log("token hook", inputId, document.activeElement);
    if (inputId.current === document.activeElement && checkValidity(token_id)) {
      getTokenById();
    }
  }, [token_id]);

  const Header = (
    <Box sx={{ display: "flex", padding: "5px 5px 0px 10px" }}>
      <Avatar
        alt="Avatar"
        src="/img/logo.png"
        sx={{ width: 150, height: 70 }}
      ></Avatar>
    </Box>
  );
  return (
    <Paper sx={{ mt: 10 }}>
      <Grid container spacing={0}>
        <Grid item md={6} xs={12} style={{ background: "#ad1" }}>
          {Header}
        </Grid>
        <Grid
          container
          item
          sx={{ display: "flex", background: "#ad1" }}
          md={6}
          xs={12}
        >
          <Grid item xs={6} sx={{ padding: "5px" }}>
            <Typography className="rank-id">
              Rarity
            </Typography>
            <input value={rank} onChange={handleRankChange} ref={inputRank} />
          </Grid>
          <Grid item xs={6} sx={{ padding: "5px" }}>
            <Typography className="rank-id">
              Frenchy
            </Typography>
            <input value={token_id} onChange={handleIdChange} ref={inputId} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className="left-part">
          <Box sx={{ padding: "10px", position: "relative" }}>
            <img
              src={item_info ? item_info.image : ""}
              width="100%"
              alt="Loading..."
            />
            <span className="nft-id">{token_id ? "#" + token_id : ""} </span>
            <span className="nft-rank">{rank ? "RANK " + rank : ""} </span>
            {/* <span className="nft-name"> MARTU </span> */}
          </Box>
          {item_info && item_info.token_add && (
            <Box
              sx={{ padding: "10px", paddingTop: "0px", marginTop: "-10px" }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%", mb: 0 }}
                startIcon={<ShoppingCartIcon />}
                color="success"
                target="_blank"
                href={item_info.token_add? "https://solanart.io/search/?token=" + item_info.token_add:''}
              >
                {item_info.price} SOL on Solanart
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6} className="attr-container">
          <img
            src="/img/symbol.png"
            width="100%"
            alt="Loading..."
            className="attr-back-img"
          />
          <Box className="attr-pane">
            {item_info &&
              item_info.attributes &&
              item_info.attributes.map((item, index) => (
                <AttIndicator
                  name={item.trait_type}
                  value={item.value}
                  rarity="COMMON"
                  key={index}
                />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
