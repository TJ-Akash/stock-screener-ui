import React, { useEffect, useState } from "react";
import axios from 'axios';
import jsonData from '../StaticJSONs/stockList.json'
import { Table, Pagination, Input, Checkbox, Popover, Button } from 'antd';
import './stockList.css'; 
import Filter from '../Filter/stockFilter';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleFilters, setVisibleFilters] = useState(false); 
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedCardData, setselectedCardData] = useState([]);
  const [columns, setColumns] = useState(
    [
      {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
        sorter: (a, b) => a.symbol.localeCompare(b.symbol),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        sorter: (a, b) => a.companyName.localeCompare(b.companyName),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Market Cap',
        dataIndex: 'marketCap',
        key: 'marketCap',
        render: (marketCap) =>
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            marketCap
          ),
        sorter: (a, b) => a.marketCap - b.marketCap,
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Stock Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) =>
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            price
          ),
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Volume',
        dataIndex: 'volume',
        key: 'volume',
        sorter: (a, b) => a.volume - b.volume,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Dividend Yeild %',
        dataIndex: 'dividend',
        key: 'dividend',
        sorter: (a, b) => a.dividend - b.dividend,
        sortDirections: ['ascend', 'descend'],
      }
    ]
  );

  const filterOptions = [
    { value: 'price', label: 'Price' },
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'dividend', label: 'Dividend Yield (%)' },
    { value: 'volume', label: 'Volume' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:55280/get-stocks');
        const data = await response.json();
        setStocks(data); 
        data.sort((a, b) => b.market_cap - a.market_cap);
        setselectedCardData(data.slice(0, 4));
        setFilteredStocks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();  
  }, []);


  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filteredData = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(newSearchTerm) ||
      stock.companyName.toLowerCase().includes(newSearchTerm)
    );
    setFilteredStocks(filteredData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateColumns = (selectedFilters) => {
    const updatedColumns = [...columns]; 
    console.log(updatedColumns)
    if (selectedFilters.includes('market_cap')) {
      updatedColumns[2] = {
        ...updatedColumns[2],
      };
    }
    return updatedColumns;
  };

  const handleFilterApply = () => {
    setVisibleFilters(false);
    const filteredData = stocks.filter((stock) => {
      return selectedFilters.includes('price') ? stock.price > 100 : true;
    });
    const updatedColumns = updateColumns(selectedFilters);
    setFilteredStocks(filteredData);
    console.log(updatedColumns)
    setColumns(updatedColumns);
  };

  return (
    <div className="stock-screener-container">
      <h2>Stock Screener</h2>
      <div className="cards-container">
      {selectedCardData.map((stock) => (
          <div className="card" key={stock.symbol}>
            <h3>{stock.company_name}</h3>
            <p>Market Cap: {stock.market_cap}</p>
            <p>Stock Price: {stock.price}</p>
          </div>
        ))}
      </div>


      <div className="filter-and-search-container">
        <div className="filter-button-container">
          <Button type="primary" onClick={() => setVisibleFilters(!visibleFilters)}>
            Filter by
          </Button>
          <Filter
            filterOptions={filterOptions}
            visible={visibleFilters}
            onFilterChange={setSelectedFilters}
            onApply={handleFilterApply}
          />
        </div>
        <div className="search-bar-container">
          <Input.Search
            placeholder="Search by Symbol or Company Name"
            onChange={handleSearch}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredStocks}
        pagination={{
          current: currentPage,
          pageSize,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
      />
    </div>
  );
};

export default StockList;
