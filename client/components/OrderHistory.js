import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/allOrders';

const OrderHistory = ({ orders, getOrders }) => {
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="order-section">
      <h3 style={{ marginLeft: '2rem' }}>Order History</h3>
      {orders && orders.length !== 0 ? (
        <div className="all-order-container">
          {orders.map((order) => (
            <div order={order} key={order.id} className="order-container">
              <h4 style={{ marginLeft: '2rem' }}>Order number: {order.id}</h4>
              <div className="order-item-container">
                <div></div>
                <div style={{ fontWeight: 'bold' }} className="order-name">
                  Name
                </div>
                <div style={{ fontWeight: 'bold' }} className="order-price">
                  Price
                </div>
                <div style={{ fontWeight: 'bold' }} className="order-quantity">
                  Quantity
                </div>
                <div style={{ fontWeight: 'bold' }}>Total</div>
              </div>
              {order.products.map((item) => (
                <div key={item.id} className="order-item-container">
                  <img className="order-img" src={item.imageURL} alt={`Image of ${item.name}`} />
                  <div className="s-order-name">
                    <Link to={`/products/${item.id}`}>
                      <span>{item.name}</span>
                    </Link>
                  </div>
                  <span style={{ fontSize: '.8rem' }} className="s-order-price">
                    {(item.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                  <span style={{ fontSize: '.8rem' }} className="s-order-quantity">
                    {item.cartItem.quantity}
                  </span>
                  <span style={{ fontSize: '.8rem' }}>
                  {((item.cartItem.quantity * item.price) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="div-container">No recent orders found</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
