import React from 'react'
import Breadcrup from '../component/Breadcrup'

function Contact() {
    return (
        <>
  {/*start page content*/}
  <div className="page-content">
    {/*start breadcrumb*/}
    <div className="py-4 border-bottom">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="javascript:;">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:;">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>
      </div>
    </div>
    {/*end breadcrumb*/}
    {/*start product details*/}
    <section className="section-padding">
      <div className="container">
        <div className="separator mb-3">
          <div className="line" />
          <h3 className="mb-0 h3 fw-bold">Find Us Map</h3>
          <div className="line" />
        </div>
        <div className="border p-3">
          <iframe
            className="w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805184.6320105711!2d144.49269039866502!3d-37.971237001538135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1654250375825!5m2!1sen!2sin"
            height={450}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="separator my-3">
          <div className="line" />
          <h3 className="mb-0 h3 fw-bold">Why Choose Us</h3>
          <div className="line" />
        </div>
        <div className="row g-4">
          <div className="col-xl-8">
            <div className="p-4 border">
              <form>
                <div className="form-body">
                  <h4 className="mb-0 fw-bold">Drop Us a Line</h4>
                  <div className="my-3 border-bottom" />
                  <div className="mb-3">
                    <label className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control rounded-0" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Email</label>
                    <input type="text" className="form-control rounded-0" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control rounded-0" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control rounded-0"
                      rows={4}
                      cols={4}
                      defaultValue={""}
                    />
                  </div>
                  <div className="mb-0">
                    <a href="thank-you.html" className="btn btn-dark btn-ecomm">
                      Send Message
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="p-3 border">
              <div className="address mb-3">
                <h5 className="mb-0 fw-bold">Address</h5>
                <p className="mb-0 font-12">123 Street Name, City, Australia</p>
              </div>
              <hr />
              <div className="phone mb-3">
                <h5 className="mb-0 fw-bold">Phone</h5>
                <p className="mb-0 font-13">Toll Free (123) 472-796</p>
                <p className="mb-0 font-13">Mobile : +91-9910XXXX</p>
              </div>
              <hr />
              <div className="email mb-3">
                <h5 className="mb-0 fw-bold">Email</h5>
                <p className="mb-0 font-13">mail@example.com</p>
              </div>
              <hr />
              <div className="working-days mb-0">
                <h5 className="mb-0 fw-bold">Working Days</h5>
                <p className="mb-0 font-13">Mon - FRI / 9:30 AM - 6:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*start product details*/}
  </div>
  {/*end page content*/}
</>
    )
}

export default Contact
