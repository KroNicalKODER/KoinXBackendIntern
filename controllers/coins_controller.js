import coins_info from "../schema/coins_info.js";
import axios from "axios";

export const save_data = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cmatic-network%2Cethereum',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.COIN_GECKO_API }
      };

      axios.request(options)
        .then(async (response) =>  {
            const data = response.data
            const btc_info = data.filter(coin => coin.id === "bitcoin")
            const matic_info = data.filter(coin => coin.id === "matic-network")
            const eth_info = data.filter(coin => coin.id === "ethereum")
            
            const obj = new coins_info({
                btc_info: {
                    current_market_price: btc_info[0].current_price,
                    price_change_24h: btc_info[0].price_change_24h,
                    market_cap: btc_info[0].market_cap
                },
                matic_info: {
                    current_market_price: matic_info[0].current_price,
                    price_change_24h: matic_info[0].price_change_24h,
                    market_cap: matic_info[0].market_cap
                },
                eth_info: {
                    current_market_price: eth_info[0].current_price,
                    price_change_24h: eth_info[0].price_change_24h,
                    market_cap: eth_info[0].market_cap
                }
            })

            const save_data = await obj.save()            
            
            res.status(200).json({
                save_data,
                "message": "Data saved successfully"
            })
        })
        .catch(err => console.error(err));
}

export const get_stats = async (req, res) => {
    const data = await coins_info.findOne().sort({_id:-1})
    const btc_name = req.query.coin

    if (!btc_name || !['bitcoin', 'matic-network', 'ethereum'].includes(btc_name)) {
        return res.status(400).json({ 
            error: "Please provide a valid 'coin' query parameter (e.g., 'bitcoin', 'matic-network', or 'ethereum')." 
        });
    }

    // console.log(btc_name, req.query)
    if(btc_name == "bitcoin"){
        const btc_data = data.btc_info
        res.status(200).json({
            btc_data
        })
    }
    else if(btc_name == "matic-network"){
        const matic_data = data.matic_info
        res.status(200).json({
            matic_data
        })
    }
    else if (btc_name == "ethereum"){
        const eth_data = data.eth_info
        res.status(200).json({
            eth_data
        })
    }
    else{
        res.status(404).json({
            "message": "Coin not found"
        })
    }
}

export const get_standard_deviation = async (req, res) => {
    try {
        const coin = req.query.coin?.toLowerCase();

        // Validate the coin
        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({ 
                error: "Please provide a valid 'coin' query parameter (e.g., 'bitcoin', 'matic-network', or 'ethereum')." 
            });
        }

        // Mapping coin price
        const fieldMap = {
            'bitcoin': "btc_info.current_market_price",
            'matic-network': "matic_info.current_market_price",
            'ethereum': "eth_info.current_market_price",
        };
        const fieldName = fieldMap[coin];

        // last 100 records
        const records = await coins_info.find()
            .sort({ createdAt: -1 })
            .limit(100) 
            .select(fieldName);

        // If no records are found
        if (records.length === 0) {
            return res.status(404).json({ 
                error: `No price records found for ${coin}.` 
            });
        }

        // Extract the prices
        const prices = records.map(record => {
            const fieldPath = fieldName.split(".");
            return fieldPath.reduce((obj, key) => obj[key], record);
        });

        
        // Calculate the mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        console.log("Mean:", mean);
        
        // Calculate the variance
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate the standard deviation (square root of variance)
        const standardDeviation = Math.sqrt(variance);

        return res.json({ 
            standardDeviation: standardDeviation.toFixed(2) // Round to 2 decimal places for readability
        });
    } catch (error) {
        
        console.error("Error in /deviation:", error);
        return res.status(500).json({ 
            error: "An internal server error occurred. Please try again later." 
        });
    }
};