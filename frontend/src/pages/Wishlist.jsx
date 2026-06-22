import React, { useEffect } from 'react'
import Breadcrup from '../component/Breadcrup'
import { createCart } from '../Redux/ActionCreators/CartActionCreator'
import { getWishlist, deleteWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Wishlist() {
  let CartStateData = useSelector(state => state.CartStateData);
  let { data: WishlistStateData } = useSelector(
    state => state.WishlistStateData
  )
  console.log(WishlistStateData)
  let dispatch = useDispatch();

  function movetocart(item) {
    dispatch(createCart(item));
    deleteWishlistitem(item.id)
  }

  function deleteWishlistitem(id) {
    dispatch(deleteWishlist({ id: id }))
  };

  useEffect(() => {
    dispatch(getWishlist());
  }, [])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Wishlist" />
        {/*start product wishlist*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Wishlist ({(WishlistStateData || []).length} Items)</h4>
              </div>
              <div className="ms-auto">
                <Link to="/shop" type="button" className="btn btn-light btn-ecomm">
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div className="similar-products">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {
                  (WishlistStateData || []).map((item, index) => {
                    return <div key={index} className="col">
                      <div className="card rounded-0">
                        <button className="btn-close wishlist-close position-absolute end-0 top-0" onClick={() => deleteWishlistitem(item._id)} />
                        <a href="javascript:;">
                          <img
                            src={item?.product?.pic[0] || ""}
                            alt=""
                            className="card-img-top rounded-0"
                            style={{ height: 250 }}
                          />
                        </a>
                        <div className="card-body border-top text-center">
                          <p className="mb-0 product-short-name">{item?.product?.name}</p>
                          <div className="product-price d-flex align-items-center gap-2 mt-2 justify-content-center">
                            <div className="h6 fw-bold">Price: ₹{item?.product?.finalPrice}</div>
                          </div>
                        </div>
                        <div className="card-footer bg-transparent text-center">
                          <button className="btn btn-outline-dark w-100" onClick={() => movetocart(item)}>
                            Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
              {/*end row*/}
            </div>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}

export default Wishlist
