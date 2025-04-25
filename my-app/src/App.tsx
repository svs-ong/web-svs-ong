import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Page1 } from "./pages/Page1/Page1";
import { Page2 } from "./pages/Page2/Page2";
import { CardsPage } from "./pages/CardsPage/CardsPage";
import "./App.css";

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/page1">Page 1</Link>
            </li>
            <li>
              <Link to="/page2">Page 2</Link>
            </li>
            <li>
              <Link to="/cards">Cards Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/" element={<Page1 />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};
