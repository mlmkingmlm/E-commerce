import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { getMaincategory, updateMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_MAINCATEGORY_STATUS } from "../../../Redux/Constants"

function AdminUpdateMainCategory() {

    const { data: MaincategoryStateData, success, error } =
        useSelector(state => state.MaincategoryStateData)

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    let [show, setShow] = useState(false)

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0] : e.target.value;

        setErrorMessage((old) => ({
            ...old,
            [name]: name === "pic" ? ImageValidator(e) : FormValidators(e)
        }))

        setData((old) => ({
            ...old,
            [name]: name === "active" ? (value === "1" ? true : false) : value
        }))
    }

    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error) {
            setShow(true)
        } else {
            const updateData = new FormData();
            updateData.append("name", data.name);
            updateData.append("active", data.active);

            if (data.pic && typeof data.pic !== "string") {
                updateData.append("pic", data.pic);
            }

            setLoading(true)
            dispatch(updateMaincategory({ data: updateData, id }))
        }
    }

    function getAPIdata() {
        dispatch(getMaincategory());
        if (MaincategoryStateData.length) {
            let item = MaincategoryStateData.find(x => x._id === id)
            if (item) {
                setData(item)
            } else {
                navigate("/admin/maincategory")
            }
        }
    }

    useEffect(() => {
        getAPIdata()
    }, [])

    // 🔥 handle success/error
    useEffect(() => {
        if (success) {
            setLoading(false)
            setModal(true)
        }

        if (error) {
            setLoading(false)
            setModal(true)
        }
    }, [success, error])

    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_MAINCATEGORY_STATUS })
        navigate("/admin/maincategory")
    }

    function handleStay() {
        setModal(false)
        dispatch({ type: RESET_MAINCATEGORY_STATUS })
    }

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Update MainCategory" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Update Maincategory
                                <Link to="/admin/maincategory">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form onSubmit={postData}>

                                <div className='mb-3'>
                                    <label>Name*</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        name="name"
                                        onChange={getInputData}
                                        className='form-control'
                                    />
                                </div>

                                <div className="row">
                                    <div className='col-md-6 mb-3'>
                                        <label>Pic*</label>
                                        <input
                                            type="file"
                                            name="pic"
                                            onChange={getInputData}
                                            className='form-control'
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Active*</label>
                                        <select
                                            name="active"
                                            value={data.active ? "1" : "0"}
                                            className='form-select'
                                            onChange={getInputData}
                                        >
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 🔥 BUTTON */}
                                <div className='col-12 mb-3'>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2'
                                    >
                                        {loading ? (
                                            <>
                                                Updating
                                                <span className="dot-loader">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </span>
                                            </>
                                        ) : "Update Category"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 GLOBAL MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => setModal(false)}
                action="edit"
                module="MainCategory"
                name={data.name}
                onPrimary={handleViewList}
                onSecondary={handleStay}
                primaryLabel="View List"
                secondaryLabel="Stay Here"
            />

            {/* 🔥 CSS */}
            <style>{`
                .dot-loader span {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    margin: 0 2px;
                    background: white;
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }

                .dot-loader span:nth-child(1) { animation-delay: -0.32s; }
                .dot-loader span:nth-child(2) { animation-delay: -0.16s; }

                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </>
    )
}

export default AdminUpdateMainCategory