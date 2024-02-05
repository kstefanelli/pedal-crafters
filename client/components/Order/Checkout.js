import React, { useState } from "react";
import { Link } from "react-router-dom";

const inputStyles =
  "rounded-lg m-2 mx-auto px-15 h-11 w-72 bg-white pl-2 outline-none border border-transparent text-sm lg:text-base transition duration-200";

const buttonStyles =
  "rounded-lg bg-[#321e1e] h-11 w-72 text-base font-bold text-white border-none cursor-pointer transition duration-200 hover:bg-opacity-50";

const handleChange = (event, setInfo) => {
  const { name, value } = event.target;
  setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
};

const renderInputFields = (info, setInfo) => {
  return Object.entries(info).map(([key, value]) => {
    const placeholderText = key.replace(/([a-z])([A-Z])/g, "$1 $2");
    const updatedPlaceholder =
      key === "ccv"
        ? "CCV"
        : placeholderText.charAt(0).toUpperCase() + placeholderText.slice(1);
    return (
      <div key={key}>
        <input
          className={`${inputStyles}`}
          type='text'
          name={key}
          placeholder={updatedPlaceholder}
          onChange={(e) => handleChange(e, setInfo)}
          value={value}
          required
        />
      </div>
    );
  });
};

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    ccv: "",
    expirationDate: "",
  });

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
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        isValid = false;
      }
    });

    isValid =
      isValid &&
      validatePhone(formData.phoneNumber) &&
      validateEmail(formData.email);

    return isValid;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='mx-auto lg:w-5/6 xl:w-1/2'>
      <div>
        <h2 className='text-center font-bold text-3xl'>Checkout</h2>
      </div>
      <div>
        <h3 className='md:ml-8 my-4 lg:my-8 font-bold text-center md:text-start'>
          Shipping Information
        </h3>
        <form
          className='grid md:grid-cols-2 gap-4 lg:gap-6 justify-center text-center'
          onSubmit={handleSubmit}
        >
          {renderInputFields(shippingInfo, setShippingInfo)}
        </form>
      </div>

      <div>
        <h3 className='md:ml-8 my-4 lg:my-8 font-bold text-center md:text-start'>
          Billing Information
        </h3>
        <form
          className='grid md:grid-cols-2 gap-4 lg:gap-6 justify-center text-center'
          onSubmit={handleSubmit}
        >
          {renderInputFields(billingInfo, setBillingInfo)}
        </form>
      </div>
      <div className='text-center mt-4 lg:mt-8'>
        <button className={buttonStyles} type='button'>
          <Link to='/orderSuccess'>Place Order</Link>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
