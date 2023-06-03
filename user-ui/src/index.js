import { TransactionsProvider } from "./context/TransactionContext";
import { BidderProvider } from "./context/BidderContext";

import "./css/index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <TransactionsProvider>
      <BidderProvider>
        <App />
      </BidderProvider>
    </TransactionsProvider>
  </BrowserRouter>
);


