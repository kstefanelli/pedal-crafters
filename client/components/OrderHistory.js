import React from "react";
import useOrderFetching from "../hooks/useOrderFetching"
import OrderItem from "./OrderItem";

const OrderHistory = () => {
  const orders = useOrderFetching();

  return (
    <div className='order-section'>
      <h3 style={{ marginLeft: "2rem" }}>Order History</h3>
      {orders && orders.length !== 0 ? (
        <div className='all-order-container'>
          {orders.map((order) => (
            <div order={order} key={order.id} className='order-container'>
              <h4 style={{ marginLeft: "2rem" }}>Order number: {order.id}</h4>
              <div className='order-item-container'>
                <div></div>
                <div style={{ fontWeight: "bold" }} className='order-name'>
                  Name
                </div>
                <div style={{ fontWeight: "bold" }} className='order-price'>
                  Price
                </div>
                <div style={{ fontWeight: "bold" }} className='order-quantity'>
                  Quantity
                </div>
                <div style={{ fontWeight: "bold" }}>Total</div>
              </div>
              {order.products.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className='div-container'>No recent orders found</div>
      )}
    </div>
  );
};

export default OrderHistory;
