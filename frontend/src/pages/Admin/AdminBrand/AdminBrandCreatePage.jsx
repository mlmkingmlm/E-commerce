import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createBrand, getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_BRAND_STATUS } from '../../../Redux/Constants'

const INITIAL_DATA = {
    name: "",
    pic: "",
    active: true
};

const INITIAL_ERRORS = {
    name: "Name is mandatory",
    pic: "Pic is Mandatory"
};

function AdminBrandCreatePage() {
    let { data: BrandStateData, success, message, error } = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch();
    let [data, setData] = useState(INITIAL_DATA);

    let [errorMessage, setErrorMessage] = useState(INITIAL_ERRORS);

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); // 🔥 NEW
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
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value

            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = (BrandStateData || []).find(x => x.name.toLowerCase() === data.name.toLowerCase());
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Brand Already Exists"
                    }
                })
                setShow(true)
                return
            }
            let formData = new FormData();
            formData.append("name", data.name);
            formData.append("pic", data.pic);
            formData.append("active", data.active);
            setLoading(true);
            dispatch(createBrand(formData))
        }
    }

    function handleViewList() {
        setModal(false);
        dispatch({ type: RESET_BRAND_STATUS });
        navigate("/admin/brand");
    }

    function handleAddAnother() {
        setModal(false);
        dispatch({ type: RESET_BRAND_STATUS });

        setData(INITIAL_DATA);
        setErrorMessage(INITIAL_ERRORS);
        setShow(false);
        setFileKey(Date.now()); // 🔥 THIS resets file input
        dispatch(getMaincategory());

        if (formRef.current) formRef.current.reset();
    }

    function getAPIdata() {
        dispatch(getBrand())
    }
    useEffect(() => {
        getAPIdata()
    }, [])

    useEffect(() => {
        if (success) {
            setLoading(false);
            setModalType("success");
            setModal(true);
        }

        if (error) {
            setLoading(false);
            setModalType("error");
            setModal(true);
        }
    }, [success, error]);
    return (
        <>
            <div className="page-content">
                <Breadcrup title="Brand-CreatePage" />
                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />
                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>Create Brand
                                <Link to="/admin/brand"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input type="text" value={data.name} placeholder="Brand" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input type="file" key={fileKey}
                                                name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />

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
                                        <button type="submit" className='btn btn-dark text-light w-100'>Create Brand</button>
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
                    setModal(false);
                    dispatch({ type: RESET_BRAND_STATUS });
                }}
                module="Brand"
                action={modalType === "success" ? "add" : "error"}   // ✅ FIX
                name={data.name}
                message={modalType === "error" ? error : message}   // ✅ FIX
                onPrimary={modalType === "success" ? handleViewList : () => setModal(false)}
                onSecondary={modalType === "success" ? handleAddAnother : null}
            />
        </>
    )
}

export default AdminBrandCreatePage
