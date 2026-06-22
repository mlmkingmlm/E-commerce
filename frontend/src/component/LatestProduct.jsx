
import React, { useState } from 'react'
import ProductCard from './ProductCard';

function LatestProduct({ category, data }) {
  console.log(category, data)
  let [selectedCategory, setSelectedCategory] = useState("All")
  return (
    <section className="product-tab-section section-padding bg-light">
      <div className="container">
        <div className="text-center pb-3">
          <h3 className="mb-0 h3 fw-bold">Latest Products</h3>
          <p className="mb-0 text-capitalize">The purpose of lorem ipsum</p>
        </div>
        <div className="row">
          <div className="col-auto mx-auto">
            <div className="product-tab-menu table-responsive">
              <ul
                className="nav nav-pills flex-nowrap"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="pill"
                    data-bs-target="#new-arrival"
                    type="button"
                    onClick={() => setSelectedCategory("All")}
                  >
                    All
                  </button>
                </li>
                {category && category.length > 0 ?
                  category.map(item => {
                    return <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#new-arrival"
                        type="button"
                        onClick={() => setSelectedCategory(item.name)}
                      >
                        {item.name}
                      </button>
                    </li>
                  }) : ""}
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="tab-content tabular-product">
          <div className="tab-pane fade show active">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-4">
              {selectedCategory === "All" ? <ProductCard products={data.slice(0,16)} /> : <ProductCard products={data.filter((x)=>x.maincategory == selectedCategory).slice(0,16)}/> }
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default LatestProduct
