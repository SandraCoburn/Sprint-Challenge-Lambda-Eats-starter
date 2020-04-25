import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import OrderForm from "./OrderForm";
import Comfirmation from "./Comfirmation";

const App = () => {
  return (
    <div className="App">
      <nav>
        <h1 className="store-header">Lambda Eats</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/order-form">
        <OrderForm />
      </Route>
      <Route exact path="/comfirmation">
        <Comfirmation />
      </Route>
    </div>
  );
};
export default App;
