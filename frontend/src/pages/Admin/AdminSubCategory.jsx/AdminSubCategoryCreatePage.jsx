import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createSubcategory, getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreator'
import { getMaincategory } from '../../../Redux/ActionCreators/MainCategoryActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_SUBCATEGORY_STATUS } from "../../../Redux/Constants"

const InitialData = {
    name: "",
    pic: "",
    active: true,
    mainCategoryId: ""
}

const InitialError = {
    name: "Name Field is Mandatory",
    pic: "Pic Field is Mandatory",
    mainCategoryId: "MainCategory Field is Mandatory"
}

function AdminSubCategoryCreatePage() {
    const { data } = useSelector(state => state.MaincategoryStateData)
    const { success, error, message, data: SubcategoryStateData } = useSelector(
        state => state.SubcategoryStateData
    )
    let dispatch = useDispatch();
    let [subData, setSubData] = useState(InitialData)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    let [errorMessage, setErrorMessage] = useState(InitialError)
    let navigate = useNavigate();
    let [show, setShow] = useState(false)
    const [modalType, setModalType] = useState("");
    const [fileKey, setFileKey] = useState(Date.now());

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0] : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidators(e)
            }
        })
        setSubData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value

            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let item = (SubcategoryStateData || []).find(
                x => x?.name?.toLowerCase().trim() === subData.name.toLowerCase().trim()
            );

            if (item) {
                console.log("same");

                setErrorMessage((old) => ({
                    ...old,
                    name: "Subcategory Already Exists"
                }));

                setShow(true);
                return;
            }
            const payload = new FormData();
            payload.append("name", subData.name.trim());
            payload.append("pic", subData.pic);
            payload.append("active", subData.active);
            payload.append("mainCategoryId", subData.mainCategoryId)
            setLoading(true)
            dispatch(createSubcategory(payload))
        }
    }

    function getAPIdata() {
        dispatch(getSubcategory())
    }
    useEffect(() => {
        getAPIdata()
    }, [])

    useEffect(() => {
        dispatch(getMaincategory())
    }, [])

    console.log(success, error)

    useEffect(() => {
        if (success) {
            setLoading(false)
            setModalType("add")
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

    function handleAddAnother() {
        setModal(false)
        dispatch({ type: RESET_SUBCATEGORY_STATUS });

        setSubData(InitialData);
        setErrorMessage(InitialError);
        setShow(false);

        setFileKey(Date.now()); // 🔥 THIS resets file input
    }
    return (
        <>
            <div className="page-content">
                <Breadcrup title="SubCategory-CreatePage" />
                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />
                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>Create Subcategory
                                <Link to="/admin/subcategory"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className="row">
                                        <div className='mb-3 col-md-6'>
                                            <label>Name*</label>
                                            <input type="text" value={subData.name} placeholder="Subcategory" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label>Main-Category*</label>
                                            <select
                                                name="mainCategoryId"
                                                value={subData.mainCategoryId}
                                                onChange={getInputData}
                                                className={`form-select ${show && errorMessage.mainCategoryId ? 'border-danger' : 'border-dark'}`}
                                            >
                                                <option value="">Select Main Category</option>

                                                {(data || []).map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {show && errorMessage.mainCategoryId ?
                                                <p className='text-danger'>{errorMessage.mainCategoryId}</p>
                                                : ""}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input
                                                key={fileKey}
                                                type="file"
                                                name="pic"
                                                onChange={getInputData}
                                                className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`}
                                            />

                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label >Active*</label>
                                            <select name="active" className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className='btn btn-dark text-light w-100'
                                        >
                                            {loading ? "Creating..." : "Create Subcategory"}
                                        </button>
                                    </div>


                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_SUBCATEGORY_STATUS })
                }}
                module="SubCategory"
                action={modalType}
                name={subData.name}
                onPrimary={handleViewList}
                onSecondary={handleAddAnother}
            />
        </>
    )
}

export default AdminSubCategoryCreatePage
