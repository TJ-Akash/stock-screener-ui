import React, { useState } from 'react';

import axios from 'axios';

const StockScreener = () => {
  const [price, setPrice] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5667/filter-stocks', {
        price: parseFloat(price),
        market_cap: parseFloat(marketCap),
        dividend_yield: parseFloat(dividendYield)
      });

      setFilteredStocks(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Update error state
      setFilteredStocks([]); // Clear the filtered stocks if an error occurs
    }
  };

  return (
    <div className="container">
      <h1>Stock Screener</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        
        <label htmlFor="marketCap">Market Cap:</label>
        <input type="number" id="marketCap" value={marketCap} onChange={(e) => setMarketCap(e.target.value)} />
        
        <label htmlFor="dividendYield">Dividend Yield:</label>
        <input type="number" id="dividendYield" value={dividendYield} onChange={(e) => setDividendYield(e.target.value)} />
        
        <button type="submit">Filter</button>
      </form>
      
      {error && <div className="error">{error}</div>}
      
      <div id="stockList">
        {/* Display filtered stocks here */}
        {filteredStocks.map((stock, index) => (
          <div key={index}>
            <p>{stock.Name}</p>
            <p>{stock.Symbol}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockScreener;




































































