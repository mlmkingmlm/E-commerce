import React, { useEffect, useState } from 'react';
import Breadcrup from '../component/Breadcrup';
import { getCheckout } from '../Redux/ActionCreators/CheckoutActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import UserSidebar from '../component/UserSidebar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { createTestimonial } from '../Redux/ActionCreators/TestimonialActionCreator';
import toast, { Toaster } from 'react-hot-toast';
function Orders() {
  const [orders, setOrders] = useState([]);
  const [viewdetails, setViewdetails] = useState(null);
  const [value, setValue] = useState(1);
  const [reviewmsg, setReviewmsg] = useState('');

  const dispatch = useDispatch();
  const CheckoutStateData = useSelector(state => state.CheckoutStateData);
  const notify = (msg) => toast(msg);

  // 1️⃣ Fetch checkout data on mount
  useEffect(() => {
    dispatch(getCheckout());
  }, [dispatch]);

  // 2️⃣ Filter orders once Redux data updates
  useEffect(() => {
    if (CheckoutStateData?.length > 0) {
      const userId = localStorage.getItem('userid');
      setOrders(CheckoutStateData.filter(x => x.user.user === userId));
    }
  }, [CheckoutStateData]);

  // 3️⃣ Toggle single order details
  const handleViewDetails = (id) => {
    setViewdetails(viewdetails === id ? null : id);
  };

  function postreview(e) {
    e.preventDefault();
    const reviewdata = {
      user: localStorage.getItem("userid"),
      username: localStorage.getItem("name"),
      message: reviewmsg,
      rating: value,
      date: new Date().toLocaleDateString
    }
    dispatch(createTestimonial(reviewdata));
    notify("Review Submitted Successfully");
  }


  return (
    <>
      {/* start page content */}
      <div className="page-content">
        {/* breadcrumb */}
        <Breadcrup title="Orders" />

        {/* main section */}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Account - Orders</h4>
              </div>
            </div>

            {/* mobile sidebar button */}
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>

            <div className="row">
              {/* sidebar */}
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <UserSidebar />
                  </div>
                </nav>
              </div>

              {/* orders list */}
              <div className="col-12 col-xl-9">
                <div className="card rounded-0 mb-3 bg-light">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-xl-row gap-3 align-items-center">
                      <div>
                        <h5 className="mb-1 fw-bold">All Orders</h5>
                        <p className="mb-0">for anytime</p>
                      </div>

                      <div className="order-search flex-grow-1">
                        <form>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control ps-5 rounded-0"
                              placeholder="Search Product..."
                            />
                            <span className="position-absolute top-50 product-show translate-middle-y">
                              <i className="bi bi-search ms-3" />
                            </span>
                          </div>
                        </form>
                      </div>

                      <div className="filter">
                        <button
                          type="button"
                          className="btn btn-dark rounded-0"
                          data-bs-toggle="modal"
                          data-bs-target="#FilterOrders"
                        >
                          <i className="bi bi-filter me-2" />
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* orders mapping */}
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div className="card rounded-0 mb-3" key={order.id}>
                      <div className="card-body">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          {/* product info */}
                          <div className="img-div w-100">
                            {order.product.map((prod) => (
                              <div key={prod.id} className="img-div2 d-flex gap-3 mb-2">
                                <div className="product-img">
                                  <img
                                    src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${prod.pic}`}
                                    width={120}
                                    height={100}
                                    alt={prod.name}
                                  />
                                </div>
                                <div className="product-info flex-grow-1">
                                  <h5 className="fw-bold mb-1">{prod.name}</h5>
                                  <p className="mb-0">
                                    {prod.brand} - {prod.color}
                                  </p>
                                  <div className="mt-3 hstack gap-2 d-flex flex-column flex-md-row">
                                    <section className='d-flex gap-2 w-100'>
                                      <button
                                        type="button"
                                        className="btn btn-sm border rounded-0 w-50"
                                      >
                                        Size: {prod.size}
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm border rounded-0 w-50"
                                      >
                                        Qty: {prod.qty}
                                      </button>
                                    </section>
                                    <section className='d-flex gap-2 w-100'>
                                      <Link to={`/product/${prod.product}`} className="btn btn-dark btn-sm border rounded-0 mx-1">Shop Again</Link>
                                      <button
                                        type="button"
                                        className="btn btn-sm border rounded-0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addReviewModal"
                                      >

                                        Review
                                      </button>
                                    </section>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-none d-xl-block vr" />

                          {/* view details */}
                          <div className="d-grid align-self-start align-self-xl-center">
                            <button
                              type="button"
                              className="btn btn-outline-dark btn-ecomm"
                              onClick={() => handleViewDetails(order.id)}
                            >
                              {viewdetails === order.id ? 'Hide Details' : 'View Details'}
                            </button>

                            {viewdetails === order.id && (
                              <table className="table table-bordered mt-3">
                                <tbody>
                                  <tr><th>Order ID</th><td>{order.id}</td></tr>
                                  <tr><th>Order Status</th><td>{order.orderStatus}</td></tr>
                                  <tr><th>Payment Mode</th><td>{order.paymentMode}</td></tr>
                                  <tr><th>Payment Status</th><td>{order.paymentStatus}</td></tr>
                                  <tr><th>Subtotal</th><td>{order.subtotal}</td></tr>
                                  <tr><th>Shipping</th><td>{order.shipping}</td></tr>
                                  <tr><th>Total</th><td>{order.total}</td></tr>
                                  <tr><th>Date</th><td>{new Date(order.date).toLocaleString()}</td></tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="card-footer rounded-0 bg-transparent">
                        <div className="d-flex align-items-center gap-3">
                          <p className="mb-1 fw-bold">Rate this Product</p>
                          <div className="ratings">
                            <i className="bi bi-star-fill text-warning h6" />
                            <i className="bi bi-star-fill text-warning h6" />
                            <i className="bi bi-star-fill text-warning h6" />
                            <i className="bi bi-star h6" />
                            <i className="bi bi-star h6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center mt-4">No orders found.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Modal */}
        <div className="modal" id="FilterOrders" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Filter Orders</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <h6 className="mb-3 fw-bold">Status</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  {['All', 'On the way', 'Delivered', 'Cancelled', 'Returned'].map((label, i) => (
                    <div className="form-check" key={i}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`status-${i}`}
                        defaultChecked={i === 0}
                      />
                      <label className="form-check-label" htmlFor={`status-${i}`}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                <hr />

                <h6 className="mb-3 fw-bold">Time</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  {['Anytime', 'Last 30 days', 'Last 6 months', 'Last year'].map((label, i) => (
                    <div className="form-check" key={i}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioTime"
                        id={`time-${i}`}
                        defaultChecked={i === 0}
                      />
                      <label className="form-check-label" htmlFor={`time-${i}`}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex align-items-center gap-3 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-ecomm w-50"
                  >
                    Clear Filters
                  </button>
                  <button type="button" className="btn btn-dark btn-ecomm w-50">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Filter Modal */}

        {/* Review Modal */}
        <div className="modal" id="addReviewModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => postreview(e)}>
                  <textarea name="reviewmsg" id="" placeholder='enter your message...' className='w-100' onChange={(e) => { setReviewmsg(e.target.value) }} required></textarea>
                  <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Typography component="legend">Give Stars</Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                  <div className="modal-footer">
                    <div className="d-flex align-items-center gap-3 w-100">
                      <button type="submit" data-bs-dismiss={reviewmsg ? "modal" : ""}
                        aria-label="Close" className="btn btn-dark btn-ecomm w-50">
                        Send Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Filter Modal */}
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
    </>
  );
}

export default Orders;
