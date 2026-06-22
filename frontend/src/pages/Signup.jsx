import React, { useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import FormValidator from '../../validators/FormValidators';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Signup() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    cpassword: "",
    consent: false
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    email: "email Field is Mandatory",
    number: "Phone Field is Mandatory",
    password: "Password Field is Mandatory",
    consent: "Please give your consent for login"
  })

  let [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  function getdata(e) {
    let { name, value } = e.target;

    setErrorMessage((pre) => {
      return {
        ...pre,
        [name]: name === "consent" ? (user.consent === false ? "" : "Please give your consent for login") : FormValidator(e)
      }
    })
    setUser((old) => {
      return {
        ...old,
        [name]: name === "consent" ? !user.consent : value
      }
    })
  }


  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else if (user.password !== user.cpassword) {
      setShow(true)
      setErrorMessage(old => {
        return {
          ...old,
          "password": "Password And Confirm Password Does Not Match"
        }
      })

    }
    else {
      let response = await fetch(`http://localhost:8000/api/user/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          number: user.number,
          email: user.email,
          password: user.password,
          // active: true
        })
      })
      let data = await response.json()
      console.log(data)
      if (data.message === "User already exists") {
        toast.warning("User already exists");
      }
      else if (data.success) {
        toast.success("Account created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
      else {
        toast.error("Something went wrong");
      }
    }
  }
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Register-Page" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-8 col-xxl-8 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">Registration</h4>
                    <hr />

                    <form onSubmit={postData}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label htmlFor="exampleName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleName"
                            name='name'
                            onChange={getdata}
                          />
                          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label htmlFor="exampleMobile" className="form-label">
                            Mobile
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleMobile"
                            name='number'
                            onChange={getdata}
                          />
                          {show && errorMessage.number ? <p className='text-danger'>{errorMessage.number}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label htmlFor="exampleEmail" className="form-label">
                            Email ID
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleEmail"
                            name='email'
                            onChange={getdata}
                          />
                          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label htmlFor="examplePassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="examplePassword"
                            name='password'
                            onChange={getdata}
                          />
                          {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label htmlFor="examplePassword" className="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            name='cpassword'
                            onChange={getdata}
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="flexCheckDefault"
                              name='consent'
                              onChange={getdata}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              I agree to Terms and Conditions
                            </label>
                            {show && errorMessage.consent ? <p className='text-danger'>{errorMessage.consent}</p> : ""}
                          </div>
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Already have an account?{" "}
                            <Link to="/login" className="text-danger">
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                      {/*-end row*/}
                    </form>
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

export default Signup
