import React, { useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [errorMessage, setErrorMessage] = useState("")

  let [show, setShow] = useState(false)

  function getdata(e) {
    let { name, value } = e.target;
    setUser((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postData(e) {
    e.preventDefault()
    if (!user.email || !user.password) {
      setShow(true)
      setErrorMessage("Email and Password Field is mandatory")
    }
    else {
      try {
        let response = await fetch("http://localhost:8000/api/user/login", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password
          })
        });

        let data = await response.json();

        // ❌ no .find anymore
        if (!data.success) {
          toast.error(data.message);
          return;
        }

        // ✅ success case
        toast.success("Login successful");

        // ✅ save token + user
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.user._id);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("isLogin", true)

        if (data.user.role == "admin")
          navigate("/admin");
        else
          navigate("/profile");


      } catch (err) {
        toast.error("Server error");
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
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">Login</h4>
                    <hr />
                    {show ? <p className='text-danger text-center'>{errorMessage}</p> : ""}

                    <form onSubmit={postData}>
                      <div className="row g-4">
                        <div className="col-12">
                          <label htmlFor="exampleName" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-0"
                            id="exampleName"
                            name='email'
                            onChange={getdata}
                          />
                        </div>
                        <div className="col-12">
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
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Create New account?{" "}
                            <Link to="/signup" className="text-danger">
                              Sign Up
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

export default Login
