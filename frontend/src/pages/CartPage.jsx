import React, { useEffect, useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import { Link, useParams } from 'react-router-dom'
import { getCart, deleteCart, updateCart } from '../Redux/ActionCreators/CartActionCreator'
import { getWishlist, createWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';


function CartPage() {
  let [cart, setCart] = useState([])
  let { data: CartStateData } = useSelector(state => state.CartStateData)
  let { data: WishlistStateData } = useSelector(state => state.WishlistStateData)

  let [total, setTotal] = useState(0)
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)
  let id = useParams()
  let dispatch = useDispatch()

  function deleteRecord(id) {
    dispatch(deleteCart(id))
    getAPIData()
  }


  const notify = (msg) => toast(msg);

  function calculation(cartData) {
    let sum = 0;

    (cartData || []).forEach(item => {
      sum += item?.product?.finalPrice * item?.quantity;
    });

    if (sum > 0 && sum < 1000) {
      setShipping(150);
      setTotal(sum + 150);
    } else {
      setShipping(0);
      setTotal(sum);
    }

    setSubtotal(sum);
  }

  function updateRecord(option, id) {
    console.log(option, id)
    let item = CartStateData.find(x => x._id === id)
    let itemQty = item.quantity;
    if (option === "DEC" && itemQty === 1)
      return
    else if (option === "DEC") {
      itemQty = itemQty - 1
    }
    else if (option === "INC" && itemQty < item?.product?.stockQuantity) {
      itemQty = itemQty + 1
    }

    dispatch(updateCart({
      id,
      data: {
        quantity: itemQty
      }
    }))
    dispatch(getCart())
  }

  function getAPIData() {
    dispatch(getCart())
  }

  useEffect(() => {
    setCart(CartStateData || []);
    calculation(CartStateData || []);
  }, [CartStateData]);

  useEffect(() => {
    getAPIData();
  }, [])

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
    })()
  }, [])


  function addToWishlist(item) {
    let x = WishlistStateData.find(x => x._id === item._id)
    if (x) {
      notify("Product Already Exist in Wishlist")
    }
    else {
      dispatch(createWishlist({ productId: item.product._id}))
      notify("Product Added to Wishlist")
      dispatch(deleteCart(item._id))
      getAPIData()
    }

  }
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Cart-Pzge" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">My Bag ({(CartStateData).length} items)</h4>
              </div>
              <div className="ms-auto">
                <Link to="/shop" type="button" className="btn btn-light btn-ecomm">
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-xl-8">
                {
                  (CartStateData || []).map(item => {
                    return <div key={item.id} className="card rounded-0 mb-3">
                      <div className="card-body">
                        <div className="d-flex flex-column flex-lg-row gap-3">
                          <div className="product-img">
                            <img
                              src={item?.product?.pic[0]}
                              width={150}
                              height={200}
                              alt=""
                            />
                          </div>
                          <div className="product-info flex-grow-1">
                            <h5 className="fw-bold mb-0">
                              {item?.product?.name}
                            </h5>
                            <div className="product-price d-flex align-items-center gap-2 mt-3">
                              <div className="h6 fw-bold">${item?.product?.finalPrice}</div>
                              <div className="h6 fw-bold text-danger">{`(${item?.product?.discount}% off)`}</div>
                            </div>
                            <div className="mt-3 hstack gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-light border rounded-0"
                                data-bs-toggle="modal"
                                data-bs-target="#SizeModal"
                              >
                                Size : {item?.size}
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-light border rounded-0"
                                data-bs-toggle="modal"
                                data-bs-target="#QtyModal"
                              >
                                Qty : {item?.quantity}
                              </button>
                            </div>
                            <div className='mt-3'>
                              <div className="btn-group">
                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('DEC', item._id)}><i className='bi bi-dash fs-5'></i></button>
                                <h3 style={{ width: 50 }} className='text-center'>{item?.quantity}</h3>
                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('INC', item._id)}><i className='bi bi-plus fs-5'></i></button>
                              </div>
                            </div>
                          </div>
                          <div className="d-none d-lg-block vr" />
                          <div className="d-grid gap-2 align-self-start align-self-lg-center">
                            <button type="button" className="btn btn-ecomm" onClick={() => deleteRecord(item._id)}>
                              <i className="bi bi-x-lg me-2" />
                              Remove
                            </button>
                            <button type="button" className="btn dark btn-ecomm" onClick={() => addToWishlist(item)}>
                              <i className="bi bi-suit-heart me-2" />
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
              {
                (CartStateData || []).length ? <div className="col-12 col-xl-4">
                  <div className="card rounded-0 mb-3">
                    <div className="card-body">
                      <h5 className="fw-bold mb-4">Order Summary</h5>
                      <div className="hstack align-items-center justify-content-between">
                        <p className="mb-0">Bag Total</p>
                        <p className="mb-0">₹{subtotal}</p>
                      </div>
                      <hr />
                      <div className="hstack align-items-center justify-content-between">
                        <p className="mb-0">Delivery</p>
                        <p className="mb-0">${shipping}</p>
                      </div>
                      <hr />
                      <div className="hstack align-items-center justify-content-between fw-bold text-content">
                        <p className="mb-0">Total Amount</p>
                        <p className="mb-0">${total}</p>
                      </div>
                      <div className="d-grid mt-4">
                        <Link
                          to="/checkout"
                          type="button"
                          className="btn btn-dark btn-ecomm py-3 px-5"
                        >
                          Place Order
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card rounded-0">
                    <div className="card-body">
                      <h5 className="fw-bold mb-4">Apply Coupon</h5>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          placeholder="Enter coupon code"
                        />
                        <button
                          className="btn btn-dark btn-ecomm rounded-0"
                          type="button"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div> : null
              }
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
        <Toaster
          position='top-right'
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: 'green',
              backgroundColor: 'yellow'
            },
          }}
        />
      </div>
      {/*end page content*/}
    </>

  )
}

export default CartPage
