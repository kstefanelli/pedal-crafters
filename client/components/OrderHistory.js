import React from "react";
import useOrderFetching from "../hooks/useOrderFetching";
import OrderItem from "./OrderItem";

const OrderHistory = () => {
  const orders = useOrderFetching();

  return (
    <div>
      <h3 className='text-xl font-bold text-center py-5 lg:py-10 border-b mb-4'>
        Order History
      </h3>
      {orders && orders.length !== 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className='border-b mb-4 pb-4 w-full mx-auto'>
              <h4 className='text-lg font-bold text-center flex pb-2'>
                Order number: {order.id}
              </h4>
              <div className='grid grid-cols-5 lg:grid-cols-6 gap-4 font-bold text-center'>
                <div className='hidden lg:block col-span-1'> </div>
                <div className='col-span-2'>Name</div>
                <div className='col-span-1'>Price</div>
                <div className='col-span-1'>Quantity</div>
                <div className='col-span-1'>Total</div>
              </div>
              {order.products.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-4 ml-8 font-bold'>No recent orders found</div>
      )}
    </div>
  );
};

export default OrderHistory;
