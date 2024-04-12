# Stock Screener Web App

This is a web application built with React for screening stock data. It fetches data from a backend API and allows users to filter and search through a list of stocks.

### Installation
Clone the repository:

### bash
git clone https://github.com/yourusername/stock-screener-web.git
cd stock-screener-web
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
The app will be available at http://localhost:3000.

Features
View a list of stocks with various details such as symbol, company name, market cap, stock price, volume, and dividend yield.
Filter stocks based on price, market cap, dividend yield, and volume.
Search for stocks by symbol or company name.
Interactive table with pagination and sorting functionality.
Usage
Stock List Page: The main page of the application displays a table of stocks.

Filtering:

Click the "Filter by" button to reveal filter options.
Select desired filters such as price, market cap, dividend yield, or volume.
Click "Apply" to filter the stocks based on the selected criteria.
Search:

Use the search bar to search for stocks by symbol or company name.
The table will update in real-time as you type.
Pagination:

Navigate through multiple pages of stock data using the pagination controls at the bottom of the table.
Responsive Design:

The application is designed to be responsive and work well on desktop and mobile devices.
Components
StockList Component
The StockList component is the main component responsible for displaying the list of stocks, applying filters, and handling search functionality.

Filter Component
The Filter component is used to display filter options and allows users to select filters such as price, market cap, dividend yield, and volume.


Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.Fork the repository.
2.Create a new branch (git checkout -b feature/new-feature).
3.Make your changes.
4.Commit your changes (git commit -am 'Add new feature').
5.Push to the branch (git push origin feature/new-feature).
6.Create a new Pull Request.
## License
This project is licensed under the MIT License - see the LICENSE file for details.
