import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { getFeature, updateFeature } from '../../../Redux/ActionCreators/FeatureActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_FEATURE_STATUS } from "../../../Redux/Constants"

function AdminUpdateFeature() {

    const { data: FeatureStateData, success, error } =
        useSelector(state => state.FeatureStateData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const [data, setData] = useState({
        name: "",
        description: "",
        icon: "",
        active: true
    })

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        description: "",
        icon: ""
    })

    const [show, setShow] = useState(false)

    // 🔥 INPUT
    function getInputData(e) {
        let { name, value } = e.target

        setErrorMessage((old) => ({
            ...old,
            [name]: FormValidators(e)
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

        let errorCheck = Object.values(errorMessage).find(x => x !== "")
        if (errorCheck) {
            setShow(true)
        } else {

            let item = FeatureStateData.find(
                x => x._id !== id &&
                    x.name.toLowerCase() === data.name.toLowerCase()
            )

            if (item) {
                setErrorMessage((old) => ({
                    ...old,
                    name: "Feature Already Exists"
                }))
                setShow(true)
                return
            }

            setLoading(true)
            dispatch(updateFeature({ data, id }))
        }
    }

    // 🔥 GET DATA
    useEffect(() => {
        dispatch(getFeature())
    }, [])

    // 🔥 SET EDIT DATA
    useEffect(() => {
        if (FeatureStateData.length) {
            let item = FeatureStateData.find(x => x._id === id)

            if (item) {
                setData({
                    name: item.name || "",
                    description: item.description || "",
                    icon: item.icon || "",
                    active: item.active ?? true
                })
            } else {
                navigate("/admin/feature")
            }
        }
    }, [FeatureStateData])

    // 🔥 SUCCESS / ERROR HANDLE
    useEffect(() => {
        if (success || error) {
            setLoading(false)
            setModal(true)
        }
    }, [success, error])

    // 🔥 MODAL ACTIONS
    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_FEATURE_STATUS })
        navigate("/admin/feature")
    }

    function handleStay() {
        setModal(false)

        dispatch({ type: RESET_FEATURE_STATUS })

        setShow(false)
        setErrorMessage({
            name: "",
            description: "",
            icon: ""
        })

        // 🔥 re-sync latest data
        let item = FeatureStateData.find(x => x._id === id)
        if (item) {
            setData({
                name: item.name || "",
                description: item.description || "",
                icon: item.icon || "",
                active: item.active ?? true
            })
        }
    }

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Update Feature" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Update Feature
                                <Link to="/admin/feature">
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
                                </div>

                                {/* DESCRIPTION */}
                                <div className='mb-3'>
                                    <label>Description*</label>
                                    <input
                                        type="text"
                                        value={data.description}
                                        name="description"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.description ? 'border-danger' : ''}`}
                                    />
                                </div>

                                {/* ICON */}
                                <div className='mb-3'>
                                    <label>Icon*</label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        name="icon"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.icon ? 'border-danger' : ''}`}
                                    />

                                    {/* 🔥 PREVIEW */}
                                    {data.icon && (
                                        <div className="mt-2">
                                            <i className={data.icon} style={{ fontSize: "24px" }}></i>
                                        </div>
                                    )}
                                </div>

                                {/* ACTIVE */}
                                <div className="mb-3">
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

                                {/* BUTTON */}
                                <div className='col-12 mb-3'>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='btn btn-dark w-100'
                                    >
                                        {loading ? "Updating..." : "Update Feature"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => setModal(false)}
                action="edit"
                module="Feature"
                name={data.name}
                onPrimary={handleViewList}
                onSecondary={handleStay}
            />
        </>
    )
}

export default AdminUpdateFeature