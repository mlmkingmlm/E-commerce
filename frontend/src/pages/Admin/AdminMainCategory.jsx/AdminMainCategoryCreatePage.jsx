import React, { useState, useEffect, useRef } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createMaincategory, getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator';
import { RESET_MAINCATEGORY_STATUS } from "../../../Redux/Constants";
import { GlobalModal } from '../../../component/StatusModal'

const INITIAL_DATA = {
    name: "",
    pic: "",
    active: true
};

const INITIAL_ERRORS = {
    name: "",
    pic: ""
};

function AdminMainCategoryCreatePage() {

    const { data: MaincategoryStateData, success, error, message } =
        useSelector(state => state.MaincategoryStateData);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const formRef = useRef(null);

    let [data, setData] = useState(INITIAL_DATA);
    let [errorMessage, setErrorMessage] = useState(INITIAL_ERRORS);
    let [show, setShow] = useState(false);

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); // 🔥 NEW

    function getInputData(e) {
        let name = e.target.name;
        let value = e.target.files ? e.target.files[0] : e.target.value;

        setErrorMessage((old) => ({
            ...old,
            [name]: name === "pic" ? ImageValidator(e) : FormValidators(e)
        }));

        setData((old) => ({
            ...old,
            [name]: name === "active" ? (value === "1" ? true : false) : value
        }));
    }

    function postData(e) {
        e.preventDefault();

        const submitErrors = {
            name: data.name.trim() === "" ? "Name Field is Mandatory" : "",
            pic: !data.pic ? "Pic Field is Mandatory" : "",
        };

        const hasError = Object.values(submitErrors).some((x) => x !== "");
        if (hasError) {
            setErrorMessage(submitErrors);
            setShow(true);
            return;
        }

        const existingError = Object.values(errorMessage).some((x) => x !== "");
        if (existingError) {
            setShow(true);
            return;
        }

        let duplicate = (MaincategoryStateData || []).find(
            (x) => x.name.toLowerCase() === data.name.trim().toLowerCase()
        );
        if (duplicate) {
            setErrorMessage((old) => ({ ...old, name: "Maincategory Already Exists" }));
            setShow(true);
            return;
        }

        const formdata = new FormData();
        formdata.append("name", data.name.trim());
        formdata.append("pic", data.pic);
        formdata.append("active", data.active);

        setLoading(true); // 🔥 START LOADING
        dispatch(createMaincategory(formdata));
    }

    function handleViewList() {
        setModal(false);
        dispatch({ type: RESET_MAINCATEGORY_STATUS });
        navigate("/admin/maincategory");
    }

    function handleAddAnother() {
        setModal(false);
        dispatch({ type: RESET_MAINCATEGORY_STATUS });

        setData(INITIAL_DATA);
        setErrorMessage(INITIAL_ERRORS);
        setShow(false);
        dispatch(getMaincategory());

        if (formRef.current) formRef.current.reset();
    }

    useEffect(() => {
        dispatch(getMaincategory());
    }, []);

    useEffect(() => {
        if (success) {
            setLoading(false); // 🔥 STOP LOADING
            setModal(true);
        }

        if (error) {
            setLoading(false); // 🔥 STOP LOADING
            setModal(true);
        }
    }, [success, error]);

    return (
        <>
            <div className="page-content">
                <Breadcrup title="MainCategory-CreatePage" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Create Maincategory
                                <Link to="/admin/maincategory">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <div className="row">
                                <form ref={formRef} onSubmit={postData}>

                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input
                                                type="file"
                                                name="pic"
                                                onChange={getInputData}
                                                className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`}
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
                                            className='btn btn-dark text-light w-100 d-flex justify-content-center align-items-center gap-2'
                                        >
                                            {loading ? (
                                                <>
                                                    Creating
                                                    <span className="dot-loader">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </span>
                                                </>
                                            ) : "Create Category"}
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
                    setModal(false);
                    dispatch({ type: RESET_MAINCATEGORY_STATUS });
                }}
                module="MainCategory"
                action="add"
                name={data.name}
                onPrimary={handleViewList}
                onSecondary={handleAddAnother}
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
    );
}

export default AdminMainCategoryCreatePage;