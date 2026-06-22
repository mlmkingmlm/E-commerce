import React, { useEffect, useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import UserSidebar from '../component/UserSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, getAddress, updateAddress } from "../Redux/ActionCreators/AddressActionCreator"
import FormValidator from '../../validators/FormValidators'

const INITIAL_DATA = {
  name: "",
  mobile: "",
  address: "",
  pincode: "",
  city: "",
  state: ""
}

const INITIAL_ERRORS = {
  name: "",
  mobile: "",
  pincode: "",
  state: "",
  city: "",
  address: ""
};

export default function BuyerAddress() {
  let [option, setOption] = useState("Create")

  const { data: AddressStateData } = useSelector(state => state.AddressStateData)
  let [showModal, setShowModal] = useState(false)
  let dispatch = useDispatch();

  let [data, setData] = useState(INITIAL_DATA)

  let [errorMessage, setErrorMessage] = useState(INITIAL_ERRORS);
  let [show, setShow] = useState(false);

  const [updateId, setUpdateId] = useState("")


  function fetchAddress() {
    dispatch(getAddress());
  }

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage((old) => ({
      ...old,
      [name]: FormValidator(e)
    }))
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

 async function postAddress(e) {
    e.preventDefault()
    const errors = {};

    Object.keys(data).forEach((key) => {
      errors[key] = FormValidator({
        target: {
          name: key,
          value: data[key]
        }
      });
    });

    setErrorMessage(errors);

    if (Object.values(errors).some(error => error)) {
      return;
    }
    if (option == "Create") {
      await dispatch(createAddress(data))
    }
    else {
      await dispatch(updateAddress({ id: updateId, data: data }))
    }
    setShowModal(false);
    fetchAddress();
  }

  async function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Address")) {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/address/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      getAPIData()
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  return (

    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrup title="Saved Address" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Account - Addresses</h4>
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
              <div className="col-12 col-xl-9">
                <div className="card rounded-0">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-0">Saved Address</h5>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-ecomm"
                          onClick={() => {
                            setShowModal(true)
                            setOption("Create")
                          }}
                        >
                          <i className="bi bi-plus-lg me-2" />
                          Add New Address
                        </button>
                      </div>

                      {/* <!-- Modal --> */}
                      <div className={`modal fade ${showModal ? "show" : ""}`} id="exampleModal" tabIndex="-1" style={{ display: showModal ? "block" : "none" }}>

                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add New Address
                              </h1>
                              <button type="button" className="btn-close" onClick={
                                () => {
                                  setErrorMessage(INITIAL_ERRORS)
                                  setData(INITIAL_DATA)
                                  setShowModal(false)
                                }
                              }></button>

                            </div>
                            <form onSubmit={(e) => {
                              postAddress(e)
                            }}>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col-12 mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={getInputData} value={data.name} placeholder='Full Name' className={`form-control ${errorMessage?.name ? 'border-danger' : 'border-dark'}`} />
                                    {errorMessage?.name ? <p style={{ fontSize: 10 }} className={`m-0 p-0 mt-1 ${errorMessage.name ? 'text-danger' : `text-black`}`}>{errorMessage.name}</p> : ""}
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Phone Mobile</label>
                                    <input type="text" name="mobile" onChange={getInputData} value={data.mobile} placeholder='Phone Number' className={`form-control ${errorMessage?.mobile ? 'border-danger' : 'border-dark'}`} />
                                    {errorMessage?.mobile ? <p style={{ fontSize: 10 }} className={` m-0 p-0 mt-1 ${errorMessage.mobile ? 'text-danger' : `text-black`}`}>{errorMessage.mobile}</p> : ""}
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Pin Code</label>
                                    <input type="text" name="pincode" onChange={getInputData} value={data.pincode} placeholder='Pin Code' className={`form-control ${errorMessage?.pincode ? 'border-danger' : 'border-dark'}`} />
                                    {errorMessage?.pincode ? <p style={{ fontSize: 10 }} className={`m-0 p-0 mt-1 ${errorMessage.pincode ? 'text-danger' : `text-black`}`}>{errorMessage.pincode}</p> : ""}
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>City Name</label>
                                    <input type="text" name="city" onChange={getInputData} value={data.city} placeholder='City Name' className={`form-control ${errorMessage?.city ? 'border-danger' : 'border-dark'}`} />
                                    {errorMessage?.city ? <p style={{ fontSize: 10 }} className={`m-0 p-0 mt-1 ${errorMessage.city ? 'text-danger' : `text-black`}`}>{errorMessage.city}</p> : ""}
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>State Name</label>
                                    <input type="text" name="state" onChange={getInputData} value={data.state} placeholder='State Name' className={`form-control ${errorMessage?.state ? 'border-danger' : 'border-dark'}`} />
                                    {errorMessage?.state ? <p style={{ fontSize: 10 }} className={` m-0 p-0 mt-1 ${errorMessage.state ? 'text-danger' : `text-black`}`}>{errorMessage.state}</p> : ""}
                                  </div>
                                  <div className="col-12 mb-3">
                                    <label>Address</label>
                                    <textarea name="address" onChange={getInputData} value={data.address} placeholder='Address...' className={`form-control ${errorMessage?.address ? 'border-danger' : 'border-dark'}`}></textarea>
                                    {errorMessage?.address ? <p style={{ fontSize: 10 }} className={`mt-1 ${errorMessage.address ? 'text-danger' : `text-black`}`}>{errorMessage.address}</p> : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="submit" className="btn btn-dark">{option}</button>
                                <button type="button" className="btn btn-secondary" onClick={
                                  () => {
                                    setErrorMessage(INITIAL_ERRORS)
                                    setData(INITIAL_DATA)
                                    setShowModal(false)
                                  }
                                }>Close</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {
                      AddressStateData.map(item => {
                        return <div className="card rounded-0 mb-3" key={item.id}>
                          <div className="card-body">
                            <div className="d-flex flex-column flex-xl-row gap-3">
                              <div className="address-info form-check flex-grow-1">
                                <label className="form-check-label" for="flexRadioDefaultAddress1">
                                  <span className="fw-bold mb-0 h5">{item.name}</span><br />
                                  {item.address} <br />
                                  {item.city},{item.state}, {item.pincode}<br />
                                  Mobile: <span className="text-dark fw-bold">{item.mobile}</span><br />
                                </label>
                              </div>
                              <div className="d-none d-xl-block vr"></div>
                              <div className="d-grid gap-2 align-self-start align-self-xl-center">
                                <button type="button" className="btn btn-outline-dark px-5 btn-ecomm" onClick={() => deleteRecord(item._id)}>Remove</button>
                                <button type="button" className="btn btn-outline-dark px-5 btn-ecomm" onClick={() => {
                                  setShowModal(true)
                                  setUpdateId(item._id)
                                  setOption("Update")
                                  setData({ ...item })
                                }}>Edit</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
