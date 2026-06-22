import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

function Brands() {
  let {data:BrandStateData} = useSelector(state => state.BrandStateData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  function getSlidesPerView() {
    if (window.innerWidth < 560)
      return 2
    else if (window.innerWidth < 768)
      return 3
    else if (window.innerWidth < 992)
      return 4
    else
      return 6
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

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center pb-3">
          <h3 className="mb-0 h3 fw-bold">Shop By Brands</h3>
          <p className="mb-0 text-capitalize">
            Select your favorite brands and purchase
          </p>
        </div>
        <div className="brands">
          <Swiper {...options}>
            {
              BrandStateData.filter(x => x.active).map(item => {
                return <SwiperSlide key={item._id} ><div className="col">
                  <div className="p-3 border rounded brand-box">
                    <div className="d-flex justify-content-center">
                      <Link to={`/shop/brand/${item.name}`}>
                        <img
                          src={item.pic}
                          className="img-fluid"
                          style={{ height: "60px" }}
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
              })
            }
          </Swiper>
        </div>
        {/*end row*/}
      </div>
    </section>

  )
}

export default Brands
