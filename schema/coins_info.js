import mongoose from "mongoose";

const CoinSchema = new mongoose.Schema({
    btc_info: {
        type: {
            current_market_price: Number,
            price_change_24h: Number,
            market_cap: Number,
        },
        required: true
    },
    matic_info: {
        type: {
            current_market_price: Number,
            price_change_24h: Number,
            market_cap: Number,
        },
        required: true
    },
    eth_info: {
        type: {
            current_market_price: Number,
            price_change_24h: Number,
            market_cap: Number,
        },
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model("Coin", CoinSchema)