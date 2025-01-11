# KoinX Backend Service 🚀

A backend service to fetch cryptocurrency statistics and calculate deviations.  
The service is live at:  
**[https://koinxbackendintern.onrender.com/](https://koinxbackendintern.onrender.com/)**

---

## API Documentation 📖

### Get the Deviation
Fetch the **standard deviation** of a cryptocurrency's price based on the last 100 records.  
**Endpoint:**  
`GET /coins/deviation?coin=<coin_name>`  

**Example:**  
[https://koinxbackendintern.onrender.com/coins/deviation?coin=ethereum](https://koinxbackendintern.onrender.com/coins/deviation?coin=ethereum)

---

### Get Coin Statistics
Retrieve **current statistics** (price, market cap, 24h change) of a cryptocurrency.  
**Endpoint:**  
`GET /coins/stats?coin=<coin_name>`  

**Example:**  
[https://koinxbackendintern.onrender.com/coins/stats?coin=bitcoin](https://koinxbackendintern.onrender.com/coins/stats?coin=bitcoin)

---

## Running Locally 🖥️

Follow these steps to run the service locally on your machine:

### Step 1: Install Dependencies
Run the following command in your terminal:  
```bash
npm i
```

### Step 2: Configure Environment Variables
```bash
MONGO_DB = mongodb+srv://<<username>>:<<password>>@<<cluster>>.mxpkd09.mongodb.net/?retryWrites=true&w=majority
COIN_GECKO_API = '<<GECKO-API-KEY>>'
```

### Step 3: Start the Backend
```bash
npm start
```
