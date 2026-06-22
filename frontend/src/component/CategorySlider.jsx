import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

function CategorySlider({title, data}) {
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
        <>
            {/*start cartegory slider*/}
            <section className="cartegory-slider section-padding bg-section-2">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">Top Categories</h3>
                        <p className="mb-0 text-capitalize">
                            Select your favorite categories and purchase
                        </p>
                    </div>
                    <div className="cartegory-box">
                        <Swiper {...options}>
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item.id}> <Link to={`/shop/subcategory/${item.name}`}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src={item.pic}
                                                        className="card-img-top rounded-0"
                                                        width="100%"
                                                        height={150}
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h5 className="mb-1 cartegory-name mt-3">{item.name}</h5>
                                                    <h6 className="mb-0 product-number">856 Products</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>

                    </div>
                </div>
            </section>
            {/*end cartegory slider*/}
        </>

    )
}

export default CategorySlider
