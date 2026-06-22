import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeature } from "../Redux/ActionCreators/FeatureActionCreator"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

function Offer() {
  function getSlidesPerView() {
    if (window.innerWidth < 560)
      return 2
    else if (window.innerWidth < 768)
      return 3
    else
      return 4
  }
  let [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())

  let options = {
    slidesPerView: slidesPerView,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    modules: [FreeMode, Pagination, Autoplay],
    className: "mySwiper",

  }

  window.addEventListener("resize", () => {
    setSlidesPerView(getSlidesPerView())
  })

  let {data:FeatureStateData} = useSelector(state => state.FeatureStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getFeature());
    })()
  }, [dispatch])
  return (
    <section className="product-thumb-slider section-padding">
      <div className="container">
        <div className="text-center pb-3">
          <h3 className="mb-0 h3 fw-bold">What We Offer!</h3>
          <p className="mb-0 text-capitalize">Our System Can Provide Multiple Services For User Comfirt</p>
        </div>
        <Swiper {...options}>
          {(FeatureStateData || []).filter(x => x.active).map(item => {
            return <SwiperSlide key={item.id} ><div className="col d-flex" style={{ height: 250 }}>
              <div className="card depth border-0 rounded-0 border-bottom border-primary border-3 w-100">
                <div className="card-body text-center">
                  <div className="h1 fw-bold my-2 text-primary">
                    <i className={item.icon}></i>
                  </div>
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="mb-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
            </SwiperSlide>

          })}
        </Swiper>
      </div>
      {/*end row*/}
    </section>

  )
}

export default Offer
