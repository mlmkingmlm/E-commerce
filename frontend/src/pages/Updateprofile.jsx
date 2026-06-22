import React, {useState, useEffect} from 'react'
import Breadcrup from '../component/Breadcrup'
import UserSidebar from '../component/UserSidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from "../../validators/FormValidators"

function Updateprofile() {
  let [data, setData] = useState({
      name: "",
      number: "",
      email: ""
    })
    let [errorMessage, setErrorMessage] = useState({
      name: "",
      email: "",
      number: ""
    })
    let navigate = useNavigate()
    let [show, setShow] = useState(false)

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response)
        setData(response)
      else
        alert("Something Went Wrong")
    })()
  }, [])

  function getInputData(e) {
    var { name, value } = e.target
    setErrorMessage(old => {
      return {
        ...old,
        [name]: FormValidator(e)
      }
    })
    setData(old => {
      return {
        ...old,
        [name]: value

      }
    })

  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      let item = response.find(x => x.id !== localStorage.getItem("userid") && x.email?.toLocaleLowerCase() === data?.email?.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage(old => {
          return {
            ...old,
            'email': item.email?.toLocaleLowerCase() === data?.email.toLocaleLowerCase() ? "Email Address Already Taken" : ""
          }
        })
      }
      else {
        response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user/${localStorage.getItem("userid")}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...data })
        })
        response = await response.json()
        localStorage.setItem("name", data.name)
        navigate("/profile")
      }

    }
  }
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Update-Profile" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-center m-auto">
                <h4 className="mb-0 h4 fw-bold text-center">Account - Edit Profile</h4>
              </div>
            </div>
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>
            <div className="row">
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <UserSidebar />
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-7">
                <div className="card rounded-0">
                  <div className="card-body p-lg-5">
                    <h5 className="mb-0 fw-bold">Edit Details</h5>
                    <hr />
                    <form onSubmit={postData}>
                      <div className="row row-cols-1 g-3">
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="floatingInputName"
                              placeholder="Name"
                              name='name'
                              value={data.name}
                              onChange={getInputData}
                            />
                            <label htmlFor="floatingInputName">Name</label>
                          </div>
                          {show && errorMessage.name?<p className='text-danger'>{errorMessage.name}</p>:""}
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="floatingInputNumber"
                              placeholder="Name"
                              name='number'
                              value={data.number}
                              onChange={getInputData}
                            />
                            <label htmlFor="floatingInputNumber">
                              Mobile Number
                            </label>
                          </div>
                                                    {show && errorMessage.number?<p className='text-danger'>{errorMessage.number}</p>:""}

                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="floatingInputEmail"
                              placeholder="Email"
                              name='email'
                              value={data.email}
                              onChange={getInputData}
                            />
                            <label htmlFor="floatingInputEmail">Email</label>
                          </div>
                        </div>
                                                  {show && errorMessage.email?<p className='text-danger'>{errorMessage.email}</p>:""}

                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-dark py-3 btn-ecomm w-100"
                          >
                            Save Details
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-outline-dark py-3 btn-ecomm w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#ChangePasswordModal"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
        {/* Change Password Modal */}
        <div className="modal" id="ChangePasswordModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-body">
                <h5 className="fw-bold mb-3">Change Password</h5>
                <hr />
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputOldPass"
                      placeholder="Old Password"
                    />
                    <label htmlFor="floatingInputOldPass">Old Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputNewPass"
                      placeholder="New Password"
                    />
                    <label htmlFor="floatingInputNewPass">New Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputConPass"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="floatingInputConPass">Confirm Password</label>
                  </div>
                  <div className="d-grid gap-3 w-100">
                    <button type="button" className="btn btn-dark py-3 btn-ecomm">
                      Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark py-3 btn-ecomm"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Change Password Modal */}
      </div>
      {/*end page content*/}
    </>

  )
}

export default Updateprofile
