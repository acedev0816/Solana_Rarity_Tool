import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Items(props) {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get('https://qzlsklfacc.medianetwork.cloud/nft_for_sale?collection=fancyfrenchies')
        .then( (response) => {

        })
        .catch((error) => {

        });
    });
}