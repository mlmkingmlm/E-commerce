import React, { useState, useEffect, useRef } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createFaq, getFaq } from '../../../Redux/ActionCreators/FaqActionCreator'
import { RESET_FAQ_STATUS } from '../../../Redux/Constants'
import { GlobalModal } from '../../../component/StatusModal'

const INITIAL_DATA = {
    question: "",
    answer: "",
    active: true
};

const INITIAL_ERRORS = {
    question: "",
    answer: ""
};

function AdminFaqCreatePage() {
    let { data: FaqStateData, success, error, message } = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch();
    let [data, setData] = useState(INITIAL_DATA)
    let [errorMessage, setErrorMessage] = useState(INITIAL_ERRORS)
    let navigate = useNavigate();
    let [show, setShow] = useState(false)
    const [modalType, setModalType] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); // 🔥 NEW
    const formRef = useRef();


    function getInputData(e) {
        let name = e.target.name;
        let value = e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidators(e)
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
            let item = (FaqStateData || []).find(x => x.question.toLowerCase() === data.question.toLowerCase());
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Faq Already Exists"
                    }
                })
                setShow(true)
                return
            }
            console.log(data)
            dispatch(createFaq({ ...data }))
        }
    }

    function getAPIdata() {
        dispatch(getFaq())
    }
    useEffect(() => {
        getAPIdata()
    }, [])

    function handleViewList() {
        setModal(false);
        dispatch({ type: RESET_FAQ_STATUS });
        navigate("/admin/faq");
    }

    function handleAddAnother() {
        setModal(false);
        dispatch({ type: RESET_FAQ_STATUS });

        setData(INITIAL_DATA);
        setErrorMessage(INITIAL_ERRORS);
        setShow(false);
        dispatch(getFaq());

        if (formRef.current) formRef.current.reset();
    }

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
                <Breadcrup title="Faq-CreatePage" />
                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />
                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>Create Faq
                                <Link to="/admin/faq"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form ref={formRef} onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Question*</label>
                                        <input type="text" placeholder="Faq" name="question" onChange={getInputData} className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : ""}
                                    </div>
                                    <div className='mb-3'>
                                        <label>Answer*</label>
                                        <textarea type="text" placeholder="Answer" name="answer" onChange={getInputData} className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label >Active*</label>
                                            <select name="active" className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Create Faq</button>
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
                    dispatch({ type: RESET_FAQ_STATUS });
                }}
                module="Faq"
                action={modalType === "success" ? "add" : "error"}   // ✅ FIX
                name={data.name}
                message={modalType === "error" ? error : message}   // ✅ FIX
                onPrimary={modalType === "success" ? handleViewList : () => setModal(false)}
                onSecondary={modalType === "success" ? handleAddAnother : null}
            />
        </>
    )
}

export default AdminFaqCreatePage
