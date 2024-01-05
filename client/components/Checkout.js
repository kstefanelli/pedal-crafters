import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    secureCode: "",
    expiration: "",
  });

  const handleChange = (event, setInfo) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      ...shippingInfo,
      ...billingInfo,
    };

    if (validateFormData(formData)) {
      console.log("Form data:", formData);
    } else {
      alert("Form data is not valid. Please check the inputs.");
    }
  };

  const validateFormData = (formData) => {
    return (
      formData.name &&
      formData.phoneNumber &&
      formData.email &&
      formData.street &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.nameOnCard &&
      formData.cardNumber &&
      formData.secureCode &&
      formData.expiration
    );
  };

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>Checkout</h2>
      </div>
      <div>
        <h3 style={{ marginLeft: "2rem", fontWeight: "lighter" }}>
          Shipping Information
        </h3>
        <form className='billing-details-container' onSubmit={handleSubmit}>
          {Object.entries(shippingInfo).map(([key, value]) => (
            <input
              key={key}
              className='shipping-info-field'
              type='text'
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              onChange={(e) => handleChange(e, setShippingInfo)}
              value={value}
              required
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  } is a required field`
                );
                alert(`Go back and add ${key} for your order`);
              }}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          ))}
        </form>
      </div>

      <div style={{ marginTop: "4rem" }}>
        <h3 style={{ marginLeft: "2rem", fontWeight: "lighter" }}>
          Billing Information
        </h3>
        <form className='billing-details-container' onSubmit={handleSubmit}>
          {Object.entries(billingInfo).map(([key, value]) => (
            <input
              key={key}
              className='shipping-info-field'
              type='text'
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              onChange={(e) => handleChange(e, setBillingInfo)}
              value={value}
              required
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  } is a required field`
                );
                alert(`Go back and add ${key} for your order`);
              }}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          ))}
        </form>
      </div>
      <button className='complete-checkout-btn' type='button'>
        <Link to='/orderSuccess'>Place Order</Link>
      </button>
    </div>
  );
};

export default Checkout;
