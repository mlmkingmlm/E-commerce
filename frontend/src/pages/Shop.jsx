import React, { useEffect, useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator";
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import ProductCard from "../component/ProductCard"
import { useParams } from 'react-router-dom';

function Shop() {
  let { type, value } = useParams()
  let { data: ProductStateData } = useSelector(state => state.ProductStateData);
  let { data: MaincategoryStateData } = useSelector(state => state.MaincategoryStateData);
  let { data: SubcategoryStateData } = useSelector(state => state.SubcategoryStateData);
  let { data: BrandStateData } = useSelector(state => state.BrandStateData);
  let [filters, setFilters] = useState({
    main: [],
    sub: [],
    brand: [],
    color: [],
    size: [],
    price: {
      min: 0,
      max: 100000
    },
    dropdownselect: "1"
  });

  let dispatch = useDispatch();
  let colors = ["red", "green", "blue", "yellow", "black", "pink", "orange", "brown", "ten"]
  let sizes = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"]

  function getData(e, type) {
    const { name } = e.target;

    setFilters((pre) => {
      let current = pre[type];
      let updated = current.includes(name) ? current.filter(x => x !== name) : [...current, name];
      return {
        ...pre,
        [type]: updated
      }
    })
  }

  function updatePrice(min, max) {
    setFilters((pre) => {
      return {
        ...pre,
        price: {
          min: isNaN(min) ? 0 : min,
          max: isNaN(max) || max === 0 ? Infinity : max
        }
      }
    })
  }

  function updatesort(e) {
    let name = e.target.value
    setFilters((pre) => {
      return {
        ...pre,
        dropdownselect: name
      }
    })
  }

  const filteredProducts = ProductStateData.filter(p => {
    return (
      p.active &&
      (filters.main.length === 0 || filters.main.includes(p.maincategory)) &&
      (filters.sub.length === 0 || filters.sub.includes(p.subcategory)) &&
      (filters.brand.length === 0 || filters.brand.includes(p.brand)) &&
      (filters.color.length === 0 || filters.color.some(c => p.color.includes(c))) &&
      (filters.size.length === 0 || filters.size.some(c => p.size.includes(c))) &&
      (p.finalPrice >= filters.price.min && p.finalPrice <= filters.price.max)
    );
  });

  const sortMethods = {
    "1": (a, b) => String(b.id || "").localeCompare(String(a.id || "")),
    "2": (a, b) => b.discount - a.discount,         // Better Discount
    "3": (a, b) => b.finalPrice - a.finalPrice,     // Price High -> Low
    "4": (a, b) => a.finalPrice - b.finalPrice      // Price Low -> High
  };

  let sortedProducts = [...filteredProducts].sort(sortMethods[filters.dropdownselect]);

  useEffect(() => {
    if (type && value) {
      let newFilters = {
        main: [],
        sub: [],
        brand: [],
        color: [],
        size: [],
        price: {
          min: 0,
          max: 100000
        },
        dropdownselect: "1"
      };

      if (type === "brand") newFilters.brand = [value];
      if (type === "subcategory") newFilters.sub = [value];
      if (type === "maincategory") newFilters.main = [value];

      setFilters(newFilters);
    }
  }, [type, value]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      dispatch(getMaincategory());
      dispatch(getBrand());
      dispatch(getSubcategory())
    })()
  }, [dispatch])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Shop-Item" />
        {/*start product grid*/}
        <section className="py-4">
          <h5 className="mb-0 fw-bold d-none">Product Grid</h5>
          <div className="container-fluid">
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-funnel me-1" /> Filters
              </span>
            </div>
            <div className="row ">
              <div className="col-12 col-xl-2 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Filters
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <div className="filter-sidebar">
                        <div className="card rounded-0">
                          <div className="card-header d-none d-xl-block bg-transparent">
                            <h5 className="mb-0 fw-bold">Filters</h5>
                          </div>
                          <div className="card-body">
                            <h6 className="p-1 fw-bold bg-light">MainCategories</h6>
                            <div className="categories">
                              <div className="categories-wrapper height-1 p-1">
                                {
                                  MaincategoryStateData.map(item => {
                                    return <div key={item.id} className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={filters.main.includes(item.name)}
                                        name={item.name}
                                        onChange={(e) => getData(e, "main")}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="chekCate1"
                                      >
                                        <span>{item.name}</span>
                                        <span className="product-number">(1548)</span>
                                      </label>
                                    </div>
                                  })
                                }
                              </div>
                              <hr />
                              <h6 className="p-1 fw-bold bg-light">SubCategories</h6>
                              <div className="categories">
                                <div className="categories-wrapper height-1 p-1">
                                  {
                                    SubcategoryStateData.map(item => {
                                      return <div key={item.id} className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={filters.sub.includes(item.name)}
                                          name={item.name}
                                          onChange={(e) => getData(e, "sub")}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="chekCate1"
                                        >
                                          <span>{item.name}</span>
                                          <span className="product-number">(1548)</span>
                                        </label>
                                      </div>
                                    })
                                  }
                                </div>
                                <hr />
                                <div className="brands">
                                  <h6 className="p-1 fw-bold bg-light">Brands</h6>
                                  <div className="brands-wrapper height-1 p-1">
                                    {
                                      BrandStateData.map(item => {
                                        return <div key={item.id} className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={filters.brand.includes(item.name)}
                                            id="chekBrand1"
                                            name={item.name}
                                            onChange={(e) => getData(e, "brand")}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="chekBrand1"
                                          >
                                            <span>{item.name}</span>
                                            <span className="product-number">(1548)</span>
                                          </label>
                                        </div>
                                      })
                                    }
                                  </div>
                                </div>
                                <hr />
                                <div className="Price">
                                  <h6 className="p-1 fw-bold bg-light">Price</h6>
                                  <div className="Price-wrapper p-1">
                                    <div className="input-group d-flex flex-column justify-content-center align-items-center">
                                      <label htmlFor="" className='form-lable mt-2'>Min-Price</label>
                                      <input
                                        type="text"
                                        className="form-control rounded-0 w-75"
                                        placeholder="0"
                                        value={filters.price.min}
                                        onChange={(e) => { updatePrice(Number(e.target.value), filters.price.max) }}
                                      />
                                      <span className="input-group-text bg-section-1 border-0">
                                        -
                                      </span>
                                      <label htmlFor="" className='form-lable mt-2'>Max-Price</label>
                                      <input
                                        type="text"
                                        className="form-control rounded-0 w-75"
                                        placeholder="1000"
                                        value={filters.price.max}
                                        onChange={(e) => { updatePrice(filters.price.min, Number(e.target.value)) }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className="colors">
                                  <h6 className="p-1 fw-bold bg-light">Colors</h6>
                                  <div className="color-wrapper height-1 p-1">

                                    {
                                      colors.map((item, index) => {
                                        return <div key={index} className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="chekColor1"
                                            name={item}
                                            onChange={(e) => getData(e, "color")}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="chekColor1"
                                          >
                                            <i className={`bi bi-circle-fill me-1`} style={{ color: item.toLowerCase() }} />
                                            <span>{item}</span>
                                          </label>
                                        </div>
                                      })
                                    }

                                  </div>
                                </div>
                                <hr />
                                <div className="colors">
                                  <h6 className="p-1 fw-bold bg-light">Size</h6>
                                  <div className="color-wrapper height-1 p-1">

                                    {
                                      sizes.map((item, index) => {
                                        return <div key={index} className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id="chekColor1"
                                            name={item}
                                            onChange={(e) => getData(e, "size")}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="chekColor1"
                                          >
                                            <span>{item}</span>
                                          </label>
                                        </div>
                                      })
                                    }

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-9 mx-auto">
                <div className="shop-right-sidebar">
                  <div className="card rounded-0">
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center justify-content-between bg-light p-2">
                        <div className="product-count">{sortedProducts.length} Products Found</div>
                        <div className="view-type hstack gap-2 d-none d-xl-flex">
                          <p className="mb-0">Grid</p>
                          <div>
                            <a
                              href="shop-grid.html"
                              className="grid-type-3 d-flex gap-1"
                            >
                              <span />
                              <span />
                              <span />
                            </a>
                          </div>
                          <div>
                            <a
                              href="shop-grid-type-5.html"
                              className="grid-type-3 d-flex gap-1 active"
                            >
                              <span />
                              <span />
                              <span />
                              <span />
                              <span />
                            </a>
                          </div>
                        </div>
                        <form>
                          <div className="input-group">
                            <span className="input-group-text bg-transparent rounded-0 border-0">
                              Sort By
                            </span>
                            <select className="form-select rounded-0" value={filters.dropdownselect} onChange={(e) => updatesort(e)}>
                              <option value="1">Whats'New</option>
                              <option value="2">Better Discount</option>
                              <option value="3">Price : High to Low</option>
                              <option value="4">Price : Low to High</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="product-grid mt-4">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                      {/* {
                        selectedCategory.length <= 0
                          ? <ProductCard products={ProductStateData} />
                          : <ProductCard
                            products={ProductStateData.filter(x =>
                              x.active && selectedCategory.some(item =>
                                x.maincategory === item ||
                                x.subcategory === item ||
                                x.brand === item ||
                                x.color === item   // ✅ color filter added
                              )
                            )}
                          />
                      } */}

                      {
                        filteredProducts.length <= 0 ? <p className='text-center align-items-center m-auto mt-3'>No Product Found</p> : <ProductCard products={sortedProducts} />
                      }
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  )
}

export default Shop
