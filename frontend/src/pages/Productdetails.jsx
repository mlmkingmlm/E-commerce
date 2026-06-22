import React, { useEffect, useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductsSlider from '../component/ProductsSlider';
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreator"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreator"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import "../../public/swiper/style.css"

// import required modules
import { EffectCards } from 'swiper/modules';
import { color } from 'framer-motion';

function Productdetails() {
  let { data: ProductStateData } = useSelector(state => state.ProductStateData);
  let CartStateData = useSelector(state => state.CartStateData)
  let { data: WishlistStateData } = useSelector(
    state => state.WishlistStateData
  )
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let { id } = useParams();
  let [data, setData] = useState([]);
  let [relateddata, setRelateddata] = useState([]);
  let [input, setInput] = useState({
    qty: 1,
    color: "",
    size: ""
  });

  function quantity(value) {
    if (value === "min" && input.qty > 1)
      return input.qty - 1
    else if (value === "plus" && input.qty < data.stockQuantity)
      return input.qty + 1
    else
      return input.qty
  }

  function getInputData(option, value) {
    setInput((old) => {
      return {
        ...old,
        [option]: option === 'qty' ? quantity(value) : value
      }
    })
  }

  function addtocart() {
    dispatch(createCart({
      productId: id,
      size: input.size,
      color: input.color,
      quantity: input.qty
    }))
    navigate("/cart")
  }

  function addtowishlist() {
    dispatch(createWishlist({ productId: id }))
    navigate("/wishlist")
  }

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCart());
    dispatch(getWishlist())
  }, [dispatch]);

  useEffect(() => {
    if (ProductStateData.length && id) {
      let item = ProductStateData.filter(x => x.active).find(x => x._id === id);
      setData(item || null);

      if (item) {
        let relatedproducts = ProductStateData.filter(
          x => x.active && x.brand === item.brand && x._id !== item.id
        );
        setRelateddata(relatedproducts);
      }
    }
  }, [ProductStateData, id]);
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Product-Details" />
        {/*start product details*/}
        <section className="py-4">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-xl-7">
                <div className="col-10">
                  {data?.pic?.length ? (
                    <Swiper
                      effect="cards"
                      grabCursor={true}
                      modules={[EffectCards]}
                      className="mySwiper myswiper-product w-100"
                      style={{ height: 400 }}
                    >
                      {data.pic.map((item, index) => (
                        <SwiperSlide key={index} className='product-swiper-slide'>
                          <img className='productswiper-img'
                            src={item}
                            alt={data?.name || "Product image"}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p>Loading images...</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-xl-5">
                <div className="product-info">
                  <h4 className="product-title fw-bold mb-1">{data.name}</h4>
                  <p className="mb-0">
                    {data.description}
                  </p>
                  <div className="product-rating">
                    <div className="hstack gap-2 border p-1 mt-3 width-content">
                      <div>
                        <span className="rating-number">4.8</span>
                        <i className="bi bi-star-fill ms-1 text-warning" />
                      </div>
                      <div className="vr" />
                      <div>162 Ratings</div>
                    </div>
                  </div>
                  <hr />
                  <div className="product-price d-flex align-items-center gap-3">
                    <div className="h4 fw-bold">₹{data.finalPrice}</div>
                    <div className="h5 fw-light text-muted text-decoration-line-through">
                      {data.basePrice}
                    </div>
                    <div className="h4 fw-bold text-danger">{data.discount}% Off</div>
                  </div>
                  <p className="fw-bold mb-0 mt-1 text-success">
                    inclusive of all taxes
                  </p>
                  <div className="more-colors mt-4">
                    <h6 className="fw-bold mb-3">More Colors</h6>
                    <div className="d-flex align-items-center gap-3">
                      {
                        data?.color?.length ? (data.color.map((item, index) => {
                          return <button key={index} className="me-2" style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: item, borderRadius: "50%", border: input.color == item ? "2px solid blue" : "1px solid black" }} title={item} onClick={() => getInputData("color", item)}></button>
                        })) : null
                      }
                    </div>
                  </div>
                  <div className="size-chart mt-4">
                    <h6 className="fw-bold mb-3">Select Size</h6>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      {
                        data?.size?.length ? (
                          data.size.map((item, index) => {
                            return <div className="">
                              <button type="button" style={{ border: input.size == item ? "2px solid red" : "1px solid black" }} onClick={() => getInputData("size", item)}>{item}</button>
                            </div>
                          })
                        ) : (null)
                      }
                    </div>
                  </div>
                  <div className="mt-3 btn-group">
                    <h6 className='fw-bold mt-3 me-1'>Select Quantity:</h6>
                    <button className='btn btn-dark' onClick={() => getInputData("qty", "min")}><i className='bi bi-dash text-light'></i></button>
                    <h3 className='w-50 m-auto text-center'>{input.qty}</h3>
                    <button className='btn btn-dark' onClick={() => getInputData("qty", "plus")}><i className='bi bi-plus text-light'></i></button>
                  </div>
                  <div className="cart-buttons mt-3">
                    <div className="buttons d-flex flex-column flex-lg-row gap-3 mt-4">
                      <button
                        className="btn btn-lg btn-dark btn-ecomm px-5 py-3 col-lg-6"
                        onClick={addtocart}
                      >
                        <i className="bi bi-basket2 me-2" />
                        Add to Bag
                      </button>
                      <button
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                        onClick={addtowishlist}
                      >
                        <i className="bi bi-suit-heart me-2" />
                        Wishlist
                      </button>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="product-info">
                    <h6 className="fw-bold mb-3">Product Details</h6>
                    <p className="mb-1">
                      There are many variations of passages of Lorem Ipsum
                    </p>
                    <p className="mb-1">
                      All the Lorem Ipsum generators on the Internet tend to repeat
                    </p>
                    <p className="mb-1">
                      Contrary to popular belief, Lorem Ipsum is not simply random
                      text. It has roots in a piece
                    </p>
                    <p className="mb-1">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested.
                    </p>
                  </div>
                  <hr className="my-3" />
                  <div className="customer-ratings">
                    <h6 className="fw-bold mb-3">Customer Ratings</h6>
                    <div className="d-flex align-items-center gap-4 gap-lg-5 flex-wrap flex-lg-nowrap">
                      <div className="">
                        <h1 className="mb-2 fw-bold">
                          4.8
                          <span className="fs-5 ms-2 text-warning">
                            <i className="bi bi-star-fill" />
                          </span>
                        </h1>
                        <p className="mb-0">3.8k Verified Buyers</p>
                      </div>
                      <div className="vr d-none d-lg-block" />
                      <div className="w-100">
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">5</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: "75%" }}
                            />
                          </div>
                          <p className="mb-0">1528</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">4</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: "65%" }}
                            />
                          </div>
                          <p className="mb-0">253</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">3</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: "45%" }}
                            />
                          </div>
                          <p className="mb-0">258</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">2</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: "35%" }}
                            />
                          </div>
                          <p className="mb-0">78</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">1</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: "25%" }}
                            />
                          </div>
                          <p className="mb-0">27</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="customer-reviews">
                    <h6 className="fw-bold mb-3">Customer Reviews (875)</h6>
                    <div className="reviews-wrapper">
                      <div className="d-flex flex-column flex-lg-row gap-3">
                        <div className="">
                          <span className="badge bg-green rounded-0">
                            5<i className="bi bi-star-fill ms-1" />
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-2">
                            This is some content from a media component. You can
                            replace this with any content and adjust it as needed.
                            Some quick example text to build on the card title and
                            make.
                          </p>
                          <div className="review-img">
                            <img
                              src="assets/images/featured-products/05.webp"
                              alt=""
                              width={70}
                            />
                          </div>
                          <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                            <div className="hstack flex-grow-1 gap-3">
                              <p className="mb-0">Jhon Deo</p>
                              <div className="vr" />
                              <div className="date-posted">12 June 2020</div>
                            </div>
                            <div className="hstack">
                              <div className="">
                                <i className="bi bi-hand-thumbs-up me-2" />
                                68
                              </div>
                              <div className="mx-3" />
                              <div className="">
                                <i className="bi bi-hand-thumbs-down me-2" />
                                24
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex flex-column flex-lg-row gap-3">
                        <div className="">
                          <span className="badge bg-green rounded-0">
                            4<i className="bi bi-star-fill ms-1" />
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-2">
                            This is some content from a media component. You can
                            replace this with any content.
                          </p>
                          <div className="review-img">
                            <img
                              src="assets/images/featured-products/02.webp"
                              alt=""
                              width={70}
                            />
                          </div>
                          <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                            <div className="hstack flex-grow-1 gap-3">
                              <p className="mb-0">Jhon Deo</p>
                              <div className="vr" />
                              <div className="date-posted">15 June 2020</div>
                            </div>
                            <div className="hstack">
                              <div className="">
                                <i className="bi bi-hand-thumbs-up me-2" />
                                58
                              </div>
                              <div className="mx-3" />
                              <div className="">
                                <i className="bi bi-hand-thumbs-down me-2" />
                                34
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex flex-column flex-lg-row gap-3">
                        <div className="">
                          <span className="badge bg-warning rounded-0 text-dark">
                            3<i className="bi bi-star-fill ms-1" />
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-2">
                            This is some content from a media component. You can
                            replace this with any content and adjust it as needed.
                          </p>
                          <div className="review-img">
                            <img
                              src="assets/images/featured-products/04.webp"
                              alt=""
                              width={70}
                            />
                          </div>
                          <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                            <div className="hstack flex-grow-1 gap-3">
                              <p className="mb-0">Jhon Deo</p>
                              <div className="vr" />
                              <div className="date-posted">22 June 2022</div>
                            </div>
                            <div className="hstack">
                              <div className="">
                                <i className="bi bi-hand-thumbs-up me-2" />
                                98
                              </div>
                              <div className="mx-3" />
                              <div className="">
                                <i className="bi bi-hand-thumbs-down me-2" />
                                41
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex flex-column flex-lg-row gap-3">
                        <div className="">
                          <span className="badge bg-danger rounded-0">
                            2<i className="bi bi-star-fill ms-1" />
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-2">
                            You can replace this with any content and adjust it as
                            needed. Some quick example text to build on the card
                            title and make.
                          </p>
                          <div className="review-img">
                            <img
                              src="assets/images/featured-products/01.webp"
                              alt=""
                              width={70}
                            />
                          </div>
                          <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                            <div className="hstack flex-grow-1 gap-3">
                              <p className="mb-0">Jhon Deo</p>
                              <div className="vr" />
                              <div className="date-posted">22 June 2022</div>
                            </div>
                            <div className="hstack">
                              <div className="">
                                <i className="bi bi-hand-thumbs-up me-2" />
                                26
                              </div>
                              <div className="mx-3" />
                              <div className="">
                                <i className="bi bi-hand-thumbs-down me-2" />
                                89
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="text-center">
                        <a
                          href="javascript:;"
                          className="btn btn-ecomm btn-outline-dark"
                        >
                          View All Reviws
                          <i className="bi bi-arrow-right ms-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="separator pb-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Similar Products</h3>
              <div className="line" />
            </div>
            <ProductsSlider data={relateddata} />
          </div>
        </section>
        {/*end product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}

export default Productdetails
