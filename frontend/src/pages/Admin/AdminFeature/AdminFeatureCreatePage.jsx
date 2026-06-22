import React, { useState, useEffect, useRef } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createFeature, getFeature } from '../../../Redux/ActionCreators/FeatureActionCreator'
import { RESET_FEATURE_STATUS } from '../../../Redux/Constants'
import { GlobalModal } from '../../../component/StatusModal'

const INITIAL_DATA = {
    name: "",
    description: "",
    icon: "",
    active: true
};

const INITIAL_ERRORS = {
    name: "",
    description: "",
    icon: ""
};

function AdminFeatureCreatePage() {

    const { data: FeatureStateData, success, error, message } =
        useSelector(state => state.FeatureStateData)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState(INITIAL_DATA)
    const [errorMessage, setErrorMessage] = useState(INITIAL_ERRORS)
    const [show, setShow] = useState(false)

    const [modalType, setModalType] = useState("")
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const formRef = useRef()

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

            let item = (FeatureStateData || []).find(
                x => x.name.toLowerCase() === data.name.toLowerCase()
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
            dispatch(createFeature({ ...data }))
        }
    }

    // 🔥 GET DATA
    useEffect(() => {
        dispatch(getFeature())
    }, [])

    // 🔥 MODAL ACTIONS
    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_FEATURE_STATUS })
        navigate("/admin/feature")
    }

    function handleAddAnother() {
        setModal(false)
        dispatch({ type: RESET_FEATURE_STATUS })

        setData(INITIAL_DATA)
        setErrorMessage(INITIAL_ERRORS)
        setShow(false)

        dispatch(getFeature())

        if (formRef.current) formRef.current.reset()
    }

    // 🔥 SUCCESS / ERROR HANDLE
    useEffect(() => {
        if (success) {
            setLoading(false)
            setModalType("success")
            setModal(true)
        }

        if (error) {
            setLoading(false)
            setModalType("error")
            setModal(true)
        }
    }, [success, error])

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Feature-CreatePage" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Create Feature
                                <Link to="/admin/feature">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form ref={formRef} onSubmit={postData}>

                                {/* NAME */}
                                <div className='mb-3'>
                                    <label>Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                                    />
                                    {show && errorMessage.name && (
                                        <p className='text-danger'>{errorMessage.name}</p>
                                    )}
                                </div>

                                {/* DESCRIPTION */}
                                <div className='mb-3'>
                                    <label>Description*</label>
                                    <textarea
                                        name="description"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.description ? 'border-danger' : ''}`}
                                    />
                                    {show && errorMessage.description && (
                                        <p className='text-danger'>{errorMessage.description}</p>
                                    )}
                                </div>

                                {/* ICON */}
                                <div className='mb-3'>
                                    <label>Icon*</label>
                                    <input
                                        type="text"
                                        name="icon"
                                        placeholder="e.g. bi bi-truck"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.icon ? 'border-danger' : ''}`}
                                    />

                                    {/* 🔥 PREVIEW */}
                                    {data.icon && (
                                        <div className="mt-2">
                                            <i className={data.icon} style={{ fontSize: "24px" }}></i>
                                        </div>
                                    )}

                                    {show && errorMessage.icon && (
                                        <p className='text-danger'>{errorMessage.icon}</p>
                                    )}
                                </div>

                                {/* ACTIVE */}
                                <div className="mb-3">
                                    <label>Active*</label>
                                    <select name="active" className='form-select' onChange={getInputData}>
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
                                        {loading ? "Creating..." : "Create Feature"}
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
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_FEATURE_STATUS })
                }}
                module="Feature"
                action={modalType === "success" ? "add" : "error"}
                name={data.name}
                message={modalType === "error" ? error : message}
                onPrimary={modalType === "success" ? handleViewList : () => setModal(false)}
                onSecondary={modalType === "success" ? handleAddAnother : null}
            />
        </>
    )
}

export default AdminFeatureCreatePage