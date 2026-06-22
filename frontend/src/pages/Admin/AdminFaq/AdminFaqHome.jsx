import React, { useEffect, useState } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link } from 'react-router-dom'
import { deleteFaq, getFaq } from "../../../Redux/ActionCreators/FaqActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_FAQ_STATUS } from "../../../Redux/Constants"

function AdminFaqHome() {

    const dispatch = useDispatch()

    const { data, success, error } = useSelector(
        state => state.FaqStateData
    )

    const [search, setSearch] = useState("")

    // ✅ Modal states
    const [modal, setModal] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [deleteId, setDeleteId] = useState(null)

    // ✅ Fetch data
    useEffect(() => {
        dispatch(getFaq())
    }, [])

    // ✅ Redux response handle
    useEffect(() => {
        if (error) {
            setModal(true)
            dispatch({ type: RESET_FAQ_STATUS })

        }
        if (success) {
            dispatch({ type: RESET_FAQ_STATUS })
        }
    }, [success, error])

    // ✅ Search filter
    const filteredData = (data || []).filter(item =>
        item?.question?.toLowerCase().includes(search.toLowerCase())
    )

    // ✅ Delete API call
    function handleDelete() {
        dispatch(deleteFaq({ id: deleteId }))
    }

    const columns = [
        {
            name: 'ID',
            cell: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: 'Question',
            selector: row => row.question,
            wrap: true
        },
        {
            name: 'Answer',
            selector: row => row.answer,
            wrap: true
        },
        {
            name: 'Active',
            selector: row => row.active ? "True" : "False",
        },
        {
            name: 'Edit',
            cell: row => (
                <Link to={`/admin/faq/update/${row._id}`}>
                    <i className='btn btn-primary bi bi-pencil-square'></i>
                </Link>
            )
        },
        {
            name: 'Delete',
            cell: row => (
                <button
                    onClick={() => {
                        setDeleteId(row._id)
                        setSelectedQuestion(row.question)
                        setModal(true)
                    }}
                    className="btn text-danger border-0 p-0"
                >
                    <i className="bi bi-trash fs-4"></i>
                </button>
            )
        }
    ]

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Admin-Page" />

                <div className="container-fluid my-3">
                    <div className="row">
                        <Sidebar />

                        <div className="col-md-10">

                            <h5 className='text-center text-light bg-dark p-2 fw-bold'>
                                FAQ
                                <Link to="/admin/faqcreate">
                                    <i className='bi bi-plus float-end text-light'></i>
                                </Link>
                            </h5>

                            {/* 🔍 Search */}
                            <input
                                type="text"
                                placeholder="Search question..."
                                className="form-control mb-3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* 📊 Table */}
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                highlightOnHover
                                responsive
                                striped
                                noDataComponent="No Data Found"
                            />

                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ GLOBAL MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_FAQ_STATUS })
                }}
                action="delete"
                module="FAQ"
                name={selectedQuestion}
                onPrimary={handleDelete}
                onSecondary={() => setModal(false)}
                primaryLabel="Yes, Delete"
                secondaryLabel="Cancel"
            />
        </>
    )
}

export default AdminFaqHome