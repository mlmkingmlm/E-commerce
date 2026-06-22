import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { getBrand, updateBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_BRAND_STATUS } from "../../../Redux/Constants"

function AdminUpdateBrand() {

    const { data: BrandStateData, success, error } =
        useSelector(state => state.BrandStateData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    const [show, setShow] = useState(false)

    // 🔥 INPUT HANDLER
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0] : e.target.value

        setErrorMessage((old) => ({
            ...old,
            [name]: name === "pic"
                ? ImageValidator(e)
                : FormValidators(e)
        }))

        setData((old) => ({
            ...old,
            [name]: name === "active"
                ? (value === "1" ? true : false)
                : value
        }))
    }

    // 🔥 SUBMIT
    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {
            let formData = new FormData()

            formData.append("name", data.name)
            formData.append("active", data.active)

            // ✅ SAFE IMAGE UPLOAD
            if (data.pic && typeof data.pic !== "string") {
                formData.append("pic", data.pic)
            }

            setLoading(true)
            dispatch(updateBrand({ data: formData, id }))
        }
    }

    // 🔥 GET DATA
    function getAPIdata() {
        dispatch(getBrand())
    }

    useEffect(() => {
        getAPIdata()
    }, [])

    // 🔥 SET EDIT DATA
    useEffect(() => {
        if (BrandStateData.length) {
            let item = BrandStateData.find(x => x._id === id)

            if (item) {
                setData({
                    name: item.name || "",
                    pic: item.pic || "",
                    active: item.active ?? true
                })
            } else {
                navigate("/admin/brand")
            }
        }
    }, [BrandStateData])

    // 🔥 SUCCESS / ERROR HANDLE (IMPORTANT)
    useEffect(() => {
        if (success || error) {
            setLoading(false)
            setModal(true)
        }
    }, [success, error])

    // 🔥 MODAL HANDLERS
    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_BRAND_STATUS })
        navigate("/admin/brand")
    }

    function handleStay() {
        setModal(false)
        dispatch({ type: RESET_BRAND_STATUS })
    }

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Update Brand" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Update Brand
                                <Link to="/admin/brand">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form onSubmit={postData}>

                                {/* NAME */}
                                <div className='mb-3'>
                                    <label>Name*</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        name="name"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                                    />
                                    {show && errorMessage.name && (
                                        <p className='text-danger'>{errorMessage.name}</p>
                                    )}
                                </div>

                                <div className="row">

                                    {/* PIC */}
                                    <div className='col-md-6 mb-3'>
                                        <label>Pic*</label>
                                        <input
                                            type="file"
                                            name="pic"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.pic ? 'border-danger' : ''}`}
                                        />
                                        {show && errorMessage.pic && (
                                            <p className='text-danger'>{errorMessage.pic}</p>
                                        )}
                                    </div>

                                    {/* ACTIVE */}
                                    <div className="col-md-6 mb-3">
                                        <label>Active*</label>
                                        <select
                                            name="active"
                                            value={data.active ? "1" : "0"}
                                            onChange={getInputData}
                                            className='form-select'
                                        >
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>

                                </div>

                                {/* BUTTON */}
                                <div className='col-12 mb-3'>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='btn btn-dark w-100'
                                    >
                                        {loading ? "Updating..." : "Update Brand"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ GLOBAL MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => setModal(false)}
                action="edit"
                module="Brand"
                name={data.name}
                onPrimary={handleViewList}
                onSecondary={handleStay}
            />
        </>
    )
}

export default AdminUpdateBrand