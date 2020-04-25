import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import Pizza from "./Assets/Pizza.jpg";
import { useHistory } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field.")
    .min(2, "Name must have more than 2 characters"),
  size: yup.string(),
  cheese: yup.boolean(),
  peperoni: yup.boolean(),
  ham: yup.boolean(),
  instructions: yup.string(),
});

const OrderForm = () => {
  //state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //Initializa history to push to comfirmation page
  const history = useHistory();

  //state for our form inputs
  const initialState = {
    name: "",
    size: "small",
    cheese: false,
    peperoni: false,
    ham: false,
    instructions: "",
  };
  const [formState, setFormState] = useState(initialState);

  //state for errors
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    cheese: false,
    peperoni: false,
    ham: false,
    instructions: "",
  });

  //new state to set our post request
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        setFormState(initialState);
        history.push("/comfirmation");
      })
      .catch((err) => console.log(err.response));
  };

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors,
        });
      });
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <>
      <h1>Build your own pizza</h1>
      <form onSubmit={formSubmit}>
        <img className="home-image" src={Pizza} alt="pizza slice" />
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>
        <label htmlFor="size">
          Pizza size:
          <select id="size" name="size">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">X-large</option>
          </select>
        </label>
        <label htmlFor="cheese" className="toppings">
          <input
            type="checkbox"
            name="cheese"
            checked={formState.cheese}
            onChange={inputChange}
          />
          Cheese
        </label>
        <label htmlFor="peperoni" className="toppings">
          <input
            type="checkbox"
            name="peperoni"
            checked={formState.peperoni}
            onChange={inputChange}
          />
          Peperoni
        </label>
        <label htmlFor="ham" className="toppings">
          <input
            type="checkbox"
            name="ham"
            checked={formState.ham}
            onChange={inputChange}
          />
          Ham
        </label>
        <label htmlFor="instructions">
          Special instructions
          <textarea
            name="instructions"
            value={formState.instructions}
            onChange={inputChange}
          />
        </label>
        <button disabled={buttonDisabled}>Submit Order</button>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </form>
    </>
  );
};
export default OrderForm;
