import React from 'react'
import FeaturedProduct from '../component/FeaturedProduct'
import LatestProduct from '../component/LatestProduct'
import Offer from '../component/Offer'
import SpecialProducts from '../component/SpecialProducts'
import Brands from '../component/Brands'
import { Link } from 'react-router-dom'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import CategorySlider from '../component/CategorySlider'
// import { BrowserRouter, Route, Router } from 'react-router-dom'


function Home() {
  let { data: MaincategoryStateData } = useSelector(state => state.MaincategoryStateData)
  let { data: SubcategoryStateData } = useSelector(state => state.SubcategoryStateData)
  let { data: ProductStateData } = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [dispatch])
  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [dispatch])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        {/*start carousel*/}
        <section className="slider-section">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={1}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={2}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={3}
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={4}
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active bg-primary">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        New Arrival
                      </h3>
                      <h1 className="h1 text-white fw-bold">Women Fashion</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 25%</i>
                      </p>
                      <div className="">
                        <Link className="btn btn-dark btn-ecomm" to="/shop/women">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_1.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-red">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        Latest Trending
                      </h3>
                      <h1 className="h1 text-white fw-bold">Fashion Wear</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 35%</i>
                      </p>
                      <div className="">
                        {" "}
                        <Link className="btn btn-dark btn-ecomm" to="/shop/men">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_2.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-purple">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        New Trending
                      </h3>
                      <h1 className="h1 text-white fw-bold">Kids Fashion</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 15%</i>
                      </p>
                      <div className="">
                        <Link className="btn btn-dark btn-ecomm" to="/shop/kids">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_3.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-yellow">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-dark fw-bold">
                        Latest Trending
                      </h3>
                      <h1 className="h1 text-dark fw-bold">Electronics Items</h1>
                      <p className="text-dark fw-bold">
                        <i>Last call for upto 45%</i>
                      </p>
                      <div className="">
                        <Link className="btn btn-dark btn-ecomm" to="/shop/electronics">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_4.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-green">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">
                        Super Deals
                      </h3>
                      <h1 className="h1 text-white fw-bold">Home Furniture</h1>
                      <p className="text-white fw-bold">
                        <i>Last call for upto 24%</i>
                      </p>
                      <div className="">
                        <Link className="btn btn-dark btn-ecomm" to="/shop/furniture">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="assets/images/sliders/s_5.webp"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        {/*end carousel*/}
        {
          (MaincategoryStateData || []).filter(x => x.active).map(item => {
            return <FeaturedProduct key={item.id} title={item.name} data={(ProductStateData || []).filter(x => x.maincategory === item.name)} />
          })
        }
        <LatestProduct category={(MaincategoryStateData || []).filter(x => x.active)} data={(ProductStateData || []).filter(x => x.active)} />

        <Offer />

        {
          ProductStateData && ProductStateData.length > 0 ? (<SpecialProducts data={ProductStateData[ProductStateData.length - 1]} />) : (<p className="text-center">Loading...</p>)
        }
        <Brands />
        {SubcategoryStateData && SubcategoryStateData.length > 0 ? (
          <CategorySlider title="Subcategory" data={SubcategoryStateData.filter(x => x.active)} />
        ) : (
          <p className="text-center">Loading categories...</p>
        )}
      </div>
    </>
  )
}

export default Home
