import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteFromCart, fetchCart, updateQuantity } from "../../store/cart";
import { Link } from "react-router-dom";

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className={`bg-[#321e1e] text-white hover:opacity-50 px-2 py-1 rounded-md`}
  >
    {children}
  </button>
);

const ColoredButton = ({ onClick, children }) => (
  <Button onClick={onClick} className='bg-[#321e1e]'>
    {children}
  </Button>
);

const CartItem = ({ product, updateCart, handleDelete, formatCurrency }) => (
  <>
    <div className='flex items-center justify-between text-xs md:hidden'>
      <div className='font-bold'>{product.name}</div>
      <div>{formatCurrency(product.price / 100)}</div>
    </div>
    <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 grid-flow-col items-center text-xs md:text-md'>
      <div className='hidden md:block md:col-span-2 md:font-bold'>
        {product.name}
      </div>
      <div className='col-span-1 flex items-center'>
        <ColoredButton onClick={() => updateCart(product, -1)}>-</ColoredButton>
        <div className='mx-2'>{product.cartItem.quantity}</div>
        <ColoredButton onClick={() => updateCart(product, 1)}>+</ColoredButton>
      </div>
      <div className='hidden md:block col-span-1 md:col-span-2'>
        {formatCurrency(product.price / 100)}
      </div>
      <div className='flex justify-end'>
        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
      </div>
    </div>
  </>
);

const ButtonLink = ({ to, children }) => (
  <Link to={to}>
    <Button>{children}</Button>
  </Link>
);

const Row = ({ title, value }) => (
  <div className='flex justify-between mb-2 text-xs'>
    <div>{title}</div>
    <div>{value}</div>
  </div>
);

const TotalSection = ({ subtotal, formatCurrency }) => (
  <>
    <Row title='Subtotal' value={formatCurrency(subtotal)} />
    <Row title='Shipping' value={formatCurrency(5.0)} />
    <Row title='Total' value={formatCurrency(subtotal + 5.0)} />
  </>
);

const LeftSideCart = ({ cart, handleDelete, updateCart, formatCurrency }) => (
  <div className='md:col-span-2 border-4 border-black rounded-md p-2 md:p-4'>
    <div className='space-y-2'>
      {cart.products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          updateCart={updateCart}
          handleDelete={handleDelete}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  </div>
);

const RightSideCart = ({ subtotal, formatCurrency }) => (
  <div className='col-span-1 border-4 border-black rounded-md p-2 md:p-4'>
    <div className='text-xl font-bold mb-4'>Total</div>
    <TotalSection subtotal={subtotal} formatCurrency={formatCurrency} />
    <div className='flex mt-4 justify-center md:justify-end'>
      <ButtonLink to='/checkout'>Proceed To Checkout</ButtonLink>
    </div>
  </div>
);

const Cart = ({ cart, fetchCart, deleteFromCart, updateCart }) => {
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDelete = (productId) => {
    deleteFromCart(productId);
  };

  const calculateSubtotal = () => {
    return (
      cart?.products?.reduce((prev, curr) => {
        let calculatedPrice = (curr.price * curr.cartItem.quantity) / 100;
        return prev + calculatedPrice;
      }, 0) || 0
    );
  };

  const isCartEmpty = cart?.products?.length > 0;

  return (
    <div className='mx auto min-h-[75vh] px-7 lg:px-14 justify-center text-center flex flex-col'>
      <div className='mx-12 text-center'>
        {isCartEmpty ? (
          <h2 className='font-semibold text-2xl pt-12 xl:pt-0 pb-2 xl:pb-12'>
            Cart
          </h2>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`${
          isCartEmpty
            ? "xl:grid xl:grid-cols-2 xl:grid-flow-col space-y-8 xl:space-y-0 xl:gap-20"
            : "flex flex-col items-center justify-center gap-8"
        }`}
      >
        {isCartEmpty ? (
          <>
            <LeftSideCart
              cart={cart}
              handleDelete={handleDelete}
              updateCart={updateCart}
              formatCurrency={formatCurrency}
            />
            <RightSideCart
              subtotal={calculateSubtotal()}
              formatCurrency={formatCurrency}
            />
          </>
        ) : (
          <div className='text-center flex flex-col gap-2 lg:gap-4'>
            {" "}
            <span className='font-bold text-2xl lg:text-4xl tracking-tight'>
              {" "}
              NOTHING TO SEE HERE!{" "}
            </span>{" "}
            <span className='text-xl font-light pb-4'>
              {" "}
              Let's fix that.{" "}
            </span>{" "}
            <Link to='/products' className='text-xl font-bold tracking-tight'>
              SHOP ALL
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: (productId) => dispatch(deleteFromCart(productId)),
  updateCart: (product, newQuantity) =>
    dispatch(updateQuantity(product, newQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
