import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { getSubcategory, updateSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreator'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_SUBCATEGORY_STATUS } from "../../../Redux/Constants"

function AdminUpdateSubCategory() {

    const { success, error, data: SubcategoryStateData } =
        useSelector(state => state.SubcategoryStateData)

    const { data: MaincategoryStateData } =
        useSelector(state => state.MaincategoryStateData)

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("");


    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true,
        maincategoryId: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
        maincategoryId: ""
    })

    let [show, setShow] = useState(false)

    // 🔥 INPUT HANDLER
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0] : e.target.value;

        setErrorMessage((old) => ({
            ...old,
            [name]:
                name === "pic"
                    ? ImageValidator(e)
                    : name === "maincategoryId"
                        ? (value === "" ? "Main Category is Required" : "")
                        : FormValidators(e)
        }));

        setData((old) => ({
            ...old,
            [name]:
                name === "active"
                    ? (value === "1" ? true : false)
                    : value
        }));
    }

    // 🔥 SUBMIT
    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error || !data.maincategoryId) {
            setShow(true)
        } else {
            const updateData = new FormData();

            updateData.append("name", data.name);
            updateData.append("active", data.active);
            updateData.append("maincategoryId", data.maincategoryId);

            if (data.pic && typeof data.pic !== "string") {
                updateData.append("pic", data.pic);
            }

            setLoading(true)
            console.log(id)
            dispatch(updateSubcategory({ data: updateData, id }))
        }
    }

    // 🔥 GET DATA
    function getAPIdata() {
        dispatch(getSubcategory());
        dispatch(getMaincategory());
    }

    useEffect(() => {
        getAPIdata()
    }, [])

    // 🔥 SET EDIT DATA
    useEffect(() => {
        if (SubcategoryStateData.length) {
            let item = SubcategoryStateData.find(x => x._id === id)
            console.log(item)

            if (item) {
                setData({
                    ...item,
                    maincategoryId: item.mainCategory_id
                })
            } else {
                navigate("/admin/subcategory")
            }
        }
    }, [SubcategoryStateData])

    // 🔥 SUCCESS / ERROR HANDLE
    useEffect(() => {
        if (success) {
            setLoading(false)
            setModalType("edit")
            setModal(true)
        }

        if (error) {
            setLoading(false)
            setModalType("error")
            setModal(true)
        }
    }, [success, error])

    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_SUBCATEGORY_STATUS })
        navigate("/admin/subcategory")
    }

    function handleStay() {
        setModal(false)
        dispatch({ type: RESET_SUBCATEGORY_STATUS })
    }

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Update SubCategory" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Update Subcategory
                                <Link to="/admin/subcategory">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form onSubmit={postData}>

                                <div className="row">
                                    {/* NAME */}
                                    <div className='mb-3 col-md-6'>
                                        <label>Name*</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            name="name"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`}
                                        />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>

                                    {/* MAIN CATEGORY */}
                                    <div className='mb-3 col-md-6'>
                                        <label>Main Category*</label>
                                        <select
                                            name="maincategoryId"
                                            value={data.maincategoryId}   // ✅ FIXED
                                            onChange={getInputData}
                                            className={`form-select ${show && !data.maincategoryId ? 'border-danger' : ''}`}
                                        >
                                            <option value="">Select Main Category</option>

                                            {(MaincategoryStateData || []).map(item => (
                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {show && errorMessage.maincategoryId ? <p className='text-danger'>{errorMessage.maincategoryId}</p> : ""}
                                    </div>
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
                                    </div>

                                    {/* ACTIVE */}
                                    <div className="col-md-6 mb-3">
                                        <label>Active*</label>
                                        <select
                                            name="active"
                                            value={data.active ? "1" : "0"}   // ✅ FIXED
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
                                        {loading ? "Updating..." : "Update Subcategory"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({type:RESET_SUBCATEGORY_STATUS})
                }
                }
                action={modalType}
                module="SubCategory"
                name={data.name}
                onPrimary={handleViewList}
                onSecondary={handleStay}
            />
        </>
    )
}

export default AdminUpdateSubCategory