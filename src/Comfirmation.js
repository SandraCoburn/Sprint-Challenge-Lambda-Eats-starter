import React from "react";
import Dog from "./Assets/dogpizza.webp";

const Comfirmation = () => {
  return (
    <div>
      <h1>Congrats! Pizza is on it's way!</h1>
      <img src={Dog} alt="dog eating pizza" />
    </div>
  );
};
export default Comfirmation;
