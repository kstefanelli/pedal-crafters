import React, { useEffect } from "react";
import { connect } from "react-redux";
import { removeFromWishlist, fetchWishlist } from "../store/wishlist";
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

const WishlistItem = ({ product, handleDelete, formatCurrency }) => (
  <div className='grid grid-cols-2 xl:grid-cols-3 gap-2 grid-flow-col items-center text-xs md:text-md'>
    <div className='col-span-1 flex items-center'>
      <div className='mx-2'>{product.name}</div>
    </div>
    <div className='hidden md:block col-span-1 md:col-span-2'>
      {formatCurrency(product.price / 100)}
    </div>
    <div className='flex justify-end'>
      <Button onClick={() => handleDelete(product.id)}>Remove</Button>
    </div>
  </div>
);

const Wishlist = ({ wishlist, fetchWishlist, removeFromWishlist }) => {
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleDelete = (productId) => {
    removeFromWishlist(productId);
  };

  const isWishlistEmpty = wishlist?.data?.length === 0;

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
            ? "grid grid-cols-2 xl:grid-cols-3 gap-8"
            : "flex flex-col items-center justify-center gap-8"
        }`}
      >
        {isWishlistEmpty ? (
          <>
            {wishlist.data.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                handleDelete={handleDelete}
                formatCurrency={formatCurrency}
              />
            ))}
          </>
        ) : (
          <div className='text-center flex flex-col gap-2 lg:gap-4'>
            <span className='font-bold text-2xl lg:text-4xl tracking-tight'>
              NOTHING IN WISHLIST!
            </span>
            <span className='text-xl font-light pb-4'>
              Start adding items to your wishlist.
            </span>
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
  removeFromWishlist: (productId) => dispatch(removeFromWishlist(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
