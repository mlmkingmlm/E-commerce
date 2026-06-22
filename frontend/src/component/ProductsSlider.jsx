import React,{useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

function ProductsSlider({data}) {
    console.log(data)

    function getSlidesPerView() {
        if (window.innerWidth < 560)
            return 2
        else if (window.innerWidth < 768)
            return 3
        else if (window.innerWidth < 992)
            return 4
        else
            return 5
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
            <Swiper {...options}>
                {
                    data.map(item => {
                        return <SwiperSlide key={item._id}>
                            <div className="card">
                                <div className="position-relative overflow-hidden">
                                    <div className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
                                        <a href="javascript:;">
                                            <i className="bi bi-heart" />
                                        </a>
                                        <a href="javascript:;">
                                            <i className="bi bi-basket3" />
                                        </a>
                                        <a
                                            href="javascript:;"
                                            data-bs-toggle="modal"
                                            data-bs-target="#QuickViewModal"
                                        >
                                            <i className="bi bi-zoom-in" />
                                        </a>
                                    </div>
                                    <Link to={`/product/${item._id}`}>
                                        <img
                                            src={item.pic[0]}
                                            className="card-img-top"
                                            width="100%"
                                            height={250}
                                            alt="..."
                                        />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="product-info text-center">
                                        <div style={{ height: "40px" }}>
                                            <h6 className="mb-1 fw-bold product-name">{item.name}</h6>
                                        </div>
                                        {/* <div className="ratings mb-1 h6">
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning" />
                            <i className="bi bi-star-fill text-warning" />
                          </div> */}
                                        <p className="product-price mb-0">
                                            <span className="text-muted text-decoration-line-through me-2">
                                                ₹{item.basePrice}
                                            </span>
                                            <span className="fw-bold text-dark me-2">
                                                ₹{item.finalPrice}
                                            </span>
                                            <span className="text-success fw-semibold">
                                                {item.discount}% off
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </>
    )
}

export default ProductsSlider
