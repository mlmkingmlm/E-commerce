import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


function ProductCard({ products }) {
    return (
        <>
            {products.map(item => {
                return <div key={item._id} className="col">
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
                                    height={200}
                                    alt="..."
                                />
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="product-info text-center">
                                <h6 className="mb-1 fw-bold product-name">{item.name}</h6>
                                <div className="ratings mb-1 h6">
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                </div>
                                <p className="mb-0 h6 fw-bold product-price">&#8377; <del>{item.basePrice}</del> {item.finalPrice} &nbsp; {item.discount}% Off</p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
    )
}

export default ProductCard
