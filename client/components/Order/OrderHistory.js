import React from "react";
import useOrderFetching from "../../hooks/useOrderFetching";
import OrderItem from "./OrderItem";

const OrderHistory = () => {
  const orders = useOrderFetching();

  return (
    <div className='flex flex-col items-center py-8 px-4 lg:px-6 xl:p-12'>
      <h3 className='text-xl md:text-2xl font-bold text-center py-5 xl:py-10 border-b mb-4'>
        Order History
      </h3>
      {orders && orders.length !== 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className='border-b mb-4 pb-4 w-full mx-auto'>
              <h4 className='text-lg font-bold text-center flex pb-2'>
                Order number: {order.id}
              </h4>
              <div className='grid grid-cols-4 lg:grid-cols-6 gap-2 font-bold text-start text-sm lg:text-base xl:text-xl'>
                <div className='hidden lg:block col-span-1'> </div>
                <div className='col-span-2'>Name</div>
                <div className='col-span-1 hidden lg:block'>Price</div>
                <div className='col-span-1 text-center'>Quantity</div>
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
