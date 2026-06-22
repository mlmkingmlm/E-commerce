import React from 'react'
import Breadcrup from '../component/Breadcrup'
import Offer from '../component/Offer'
import Brands from '../component/Brands'

function About() {
  return (
    <>
      <div className="page-content">
        <Breadcrup title="About" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <h3 className="fw-bold">About Us</h3>
                <p>
                  Welcome to Online-Store , your go-to destination for trendy, affordable, and high-quality fashion.
                  We started our journey with a simple idea — to make stylish clothing accessible to everyone. From everyday essentials to the latest trends, we bring you a collection that fits every occasion, mood, and personality.
                </p>
                <p>
                  <ul>
                    <li>👗 Men’s Fashion – Stylish shirts, t-shirts, jeans, and formals.</li>
                    <li>👚 Women’s Fashion – Elegant dresses, kurtis, tops, sarees, and more.</li>
                    <li>👕 Kids Collection – Fun, comfortable, and colorful clothing for the little ones.</li>
                    <li>👜 Accessories – Bags, belts, shoes, and fashion add-ons to complete your look.</li>
                  </ul>
                </p>
                <h3 className='fw-bold'>Why Shop Us</h3>
                <p>
                  ✅ Trendy Styles – Stay ahead with the latest fashion updates.
                  <br />
                  ✅ Premium Quality – Each product is carefully selected and quality-checked. <br />
                  ✅ Affordable Prices – Fashion that doesn’t break the bank. <br />
                  ✅ Fast Delivery – Quick and reliable shipping at your doorstep. <br />
                  ✅ Customer First – Easy returns, secure payments, and 24/7 support.
                </p>
              </div>
              <div className="col-12 col-xl-6">
                <img
                  src="https://images.pexels.com/photos/7679877/pexels-photo-7679877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            {/*end row*/}
            <Offer/>
            <Brands/>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  )
}

export default About
