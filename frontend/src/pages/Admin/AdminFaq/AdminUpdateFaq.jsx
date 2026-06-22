import React, { useState, useEffect } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { getFaq, updateFaq } from '../../../Redux/ActionCreators/FaqActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_FAQ_STATUS } from "../../../Redux/Constants"

function AdminUpdateFaq() {

    const { data: FaqStateData, success, error } =
        useSelector(state => state.FaqStateData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const [data, setData] = useState({
        question: "",
        answer: "",
        active: true
    })

    const [errorMessage, setErrorMessage] = useState({
        question: "",
        answer: ""
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

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {
            let item = FaqStateData.find(
                x => x._id !== id &&
                    x.question.toLowerCase() === data.question.toLowerCase()
            )

            if (item) {
                setErrorMessage((old) => ({
                    ...old,
                    question: "FAQ Already Exists"
                }))
                setShow(true)
                return
            }

            setLoading(true)
            dispatch(updateFaq({ data, id }))
        }
    }

    // 🔥 GET DATA
    useEffect(() => {
        dispatch(getFaq())
    }, [])

    // 🔥 SET EDIT DATA
    useEffect(() => {
        if (FaqStateData.length) {
            let item = FaqStateData.find(x => x._id === id)

            if (item) {
                setData({
                    question: item.question || "",
                    answer: item.answer || "",
                    active: item.active ?? true
                })
            } else {
                navigate("/admin/faq")
            }
        }
    }, [FaqStateData])

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
        dispatch({ type: RESET_FAQ_STATUS })
        navigate("/admin/faq")
    }

    function handleStay() {
    setModal(false)

    dispatch({ type: RESET_FAQ_STATUS })

    setShow(false)
    setErrorMessage({
        question: "",
        answer: ""
    })

    // optional: re-sync form with latest data
    let item = FaqStateData.find(x => x._id === id)
    if (item) {
        setData({
            question: item.question || "",
            answer: item.answer || "",
            active: item.active ?? true
        })
    }
}

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Update FAQ" />

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Update FAQ
                                <Link to="/admin/faq">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form onSubmit={postData}>

                                {/* QUESTION */}
                                <div className='mb-3'>
                                    <label>Question*</label>
                                    <input
                                        type="text"
                                        value={data.question}
                                        name="question"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.question ? 'border-danger' : ''}`}
                                    />
                                    {show && errorMessage.question && (
                                        <p className='text-danger'>{errorMessage.question}</p>
                                    )}
                                </div>

                                {/* ANSWER */}
                                <div className='mb-3'>
                                    <label>Answer*</label>
                                    <input
                                        type="text"
                                        value={data.answer}
                                        name="answer"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.answer ? 'border-danger' : ''}`}
                                    />
                                    {show && errorMessage.answer && (
                                        <p className='text-danger'>{errorMessage.answer}</p>
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
                                        {loading ? "Updating..." : "Update FAQ"}
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
                module="FAQ"
                name={data.question}
                onPrimary={handleViewList}
                onSecondary={handleStay}
            />
        </>
    )
}

export default AdminUpdateFaq