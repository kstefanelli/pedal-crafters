import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteFromWishlist,
  fetchWishlist,
  updateQuantityInWishlist,
} from "../store/wishlist";
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

const WishlistItem = ({
  product,
  updateWishlist,
  handleDelete,
  formatCurrency,
}) => (
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
        <ColoredButton onClick={() => updateWishlist(product.id, -1)}>
          -
        </ColoredButton>
        <div className='mx-2'>{product.quantity}</div>
        <ColoredButton onClick={() => updateWishlist(product.id, 1)}>
          +
        </ColoredButton>
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
    <Row title='Total' value={formatCurrency(subtotal)} />
  </>
);

const WishlistSection = ({
  wishlist,
  handleDelete,
  updateWishlist,
  formatCurrency,
}) => (
  <div className='md:col-span-2 border-4 border-black rounded-md p-2 md:p-4'>
    <div className='space-y-2'>
      {wishlist.products.map((product) => (
        <WishlistItem
          key={product.id}
          product={product}
          updateWishlist={updateWishlist}
          handleDelete={handleDelete}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  </div>
);

const Wishlist = ({
  wishlist,
  fetchWishlist,
  deleteFromWishlist,
  updateWishlist,
}) => {
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleDelete = (productId) => {
    deleteFromWishlist(productId);
  };

  const calculateSubtotal = () => {
    return (
      wishlist?.products?.reduce((prev, curr) => {
        let calculatedPrice = (curr.price * curr.quantity) / 100;
        return prev + calculatedPrice;
      }, 0) || 0
    );
  };

  const isWishlistEmpty = wishlist?.products?.length > 0;

  return (
    <div className='mx auto min-h-[75vh] px-7 lg:px-14 justify-center text-center flex flex-col'>
      <div className='mx-12 text-center'>
        {isWishlistEmpty ? (
          <h2 className='font-semibold text-2xl pt-12 xl:pt-0 pb-2 xl:pb-12'>
            Wishlist
          </h2>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`${
          isWishlistEmpty
            ? "flex flex-col items-center justify-center gap-8"
            : "text-center flex flex-col gap-2 lg:gap-4"
        }`}
      >
        {isWishlistEmpty ? (
          <>
            <WishlistSection
              wishlist={wishlist}
              handleDelete={handleDelete}
              updateWishlist={updateWishlist}
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
  wishlist: state.wishlist,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishlist: () => dispatch(fetchWishlist()),
  deleteFromWishlist: (productId) => dispatch(deleteFromWishlist(productId)),
  updateWishlist: (productId, quantity) =>
    dispatch(updateQuantityInWishlist(productId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
