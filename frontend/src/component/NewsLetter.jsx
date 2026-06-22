import React from 'react'

function NewsLetter() {
    return (
        <>
        <div className="page-content">
        
  {/*subscribe banner*/}
  <section className="product-thumb-slider subscribe-banner p-5">
    <div className="row">
      <div className="col-12 col-lg-6 mx-auto">
        <div className="text-center">
          <h3 className="mb-0 fw-bold text-white">
            Get Latest Update by <br /> Subscribe Our Newslater
          </h3>
          <div className="mt-3">
            <input
              type="text"
              className="form-control form-control-lg bubscribe-control rounded-0 px-5 py-3"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3 d-grid">
            <button
              type="button"
              className="btn btn-lg btn-ecomm bubscribe-button px-5 py-3"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*subscribe banner*/}

        </div>
        </>
    )
}

export default NewsLetter
