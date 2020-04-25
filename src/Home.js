import React from "react";
import { useHistory } from "react-router-dom";
import Pizza from "./Assets/Pizza.jpg";

const Home = () => {
  const history = useHistory();
  console.log("this is history", history);

  const routeToOrder = () => {
    console.log("submitting...");
    setTimeout(() => {
      history.push("/order-form");
    }, 1000);
  };
  return (
    <div className="home-wrapper">
      <img className="home-image" src={Pizza} alt="pizza slice" />
      <button onClick={routeToOrder} className="md-button shop-button">
        Order now!
      </button>
    </div>
  );
};
export default Home;
