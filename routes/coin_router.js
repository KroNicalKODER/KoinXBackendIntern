// market_data --> current_price --> "usd"
// market_data --> market_cap --> "usd"
// market_data --> price_change_24h

import axios from "axios";
import { Router } from "express";
import { get_standard_deviation, get_stats, save_data } from "../controllers/coins_controller.js";
const router = Router();

router.get("/", async (req, res) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  res.send(data);
});

router.get("/save_coin_data", save_data)

router.get("/stats", get_stats)

router.get("/deviation", get_standard_deviation)

export default router;