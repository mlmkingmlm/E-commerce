import React from 'react'
import Breadcrup from '../component/Breadcrup'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <>
    <div className='page-content'>
        <Breadcrup title="Order-Confirmation"/>
         <section className="section-padding">
    <div className="container">

      <div className="separator mb-3">
        <div className="line"></div>
        <h3 className="mb-0 h3 fw-bold">Thank You!</h3>
        <div className="line"></div>
      </div>

      <div className="border p-4 text-center w-100">
          <h5 className="fw-bold mb-2">Thank You for Order from Our Site.</h5>
                    <p className="mb-0">Now Track Our Order from <Link to="/orders">Orders Page</Link></p>
          <p className="mb-0"><Link to="/shop">Shop More</Link></p>
      </div>

    </div>
  </section>
    </div>
    </>
  )
}
