import React from 'react'
import { Link } from 'react-router-dom'

function SpecialProducts({ data }) {
  return (
    <section className="section-padding bg-section-2">
      <div className="container">
        <div className="card border-0 rounded-0 p-3 depth">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 text-center">
              <Link to={`/product/${data._id}`}>
                <img
                  src={data.pic[0]}
                  className="img-fluid rounded-0"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                  alt="..."
                />
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="card-body">
                <h3 className="fw-bold">Details Of Trending Product</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent px-0">
                    Name Of Product: {data.name}
                  </li>
                  <li className="list-group-item bg-transparent px-0">
                    Available Color : {data.color.map((item => {
                      return <span key={item} className="me-2" style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: item, borderRadius: "50%", border: "1px solid black" }} title={item}></span>
                    }))}
                  </li>
                  <li className="list-group-item bg-transparent px-0">
                    Available Size : {data.size.join(", ")}
                  </li>
                  <li className="list-group-item bg-transparent px-0">
                    Price: <del>{data.basePrice}</del> ₹{data.finalPrice} &nbsp; {data.discount}% Off
                  </li>
                </ul>
                <div className="buttons mt-4 d-flex flex-column flex-lg-row gap-3">
                  <Link
                    to={`/shop/${data.id}`}
                    className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                  >
                    Buy Now
                  </Link>
                  <Link
                    to={`/product/${data.id}`}
                    className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default SpecialProducts
