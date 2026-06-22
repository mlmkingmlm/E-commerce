import React, { useState } from 'react'
import ProductsSlider from './ProductsSlider'



function FeaturedProduct({ title, data }) {
  return (
    <>
      {/*start Featured Products slider*/}
      <section className="section-padding">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">{title} Products</h3>
            <p className="mb-0 text-capitalize">Check New Arrivals</p>
          </div>
          <div className="product-thumbs">
            <ProductsSlider data={data}/>
          </div>
        </div>
      </section>
    </>

  )
}

export default FeaturedProduct
