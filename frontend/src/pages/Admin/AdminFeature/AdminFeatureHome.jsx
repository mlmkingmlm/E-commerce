import React, { useEffect, useState } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link } from 'react-router-dom'
import { deleteFeature, getFeature } from "../../../Redux/ActionCreators/FeatureActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_FEATURE_STATUS } from "../../../Redux/Constants"

function AdminFeatureHome() {

    const dispatch = useDispatch()

    const { data, success, error } = useSelector(
        state => state.FeatureStateData
    )

    const [search, setSearch] = useState("")

    // ✅ Modal states
    const [modal, setModal] = useState(false)
    const [selectedName, setSelectedName] = useState("")
    const [deleteId, setDeleteId] = useState(null);
    const [modalType, setModalType] = useState("")

    // ✅ Fetch
    useEffect(() => {
        dispatch(getFeature())
    }, [])

    // ✅ Redux response handle
    useEffect(() => {
        if (error) {
            setModalType("error")
            setModal(true)
            dispatch({ type: RESET_FEATURE_STATUS })
            console.log("error")
        }

        if (success) {
            dispatch({ type: RESET_FEATURE_STATUS })
            console.log("success")
        }
    }, [success, error])

    // ✅ Search
    const filteredData = (data || []).filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    )

    // ✅ Delete
    function handleDelete() {
        dispatch(deleteFeature({ id: deleteId }))
    }

    const columns = [
        {
            name: 'ID',
            cell: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Description',
            selector: row => row.description,
            wrap: true
        },
        {
            name: 'Icon',
            cell: row => (
                <i className={row.icon} style={{ fontSize: "20px" }}></i>
            )
        },
        {
            name: 'Active',
            selector: row => row.active ? "True" : "False",
        },
        {
            name: 'Edit',
            cell: row => (
                <Link to={`/admin/feature/update/${row._id}`}>
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
                        setSelectedName(row.name)
                        setModalType("delete")
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
                                Feature
                                <Link to="/admin/featurecreate">
                                    <i className='bi bi-plus float-end text-light'></i>
                                </Link>
                            </h5>

                            {/* 🔍 Search */}
                            <input
                                type="text"
                                placeholder="Search feature..."
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

            {/* ✅ MODAL */}
            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_FEATURE_STATUS })
                }}
                action={modalType=="delete" ? "delete":"error"}
                module="Feature"
                name={selectedName}
                onPrimary={handleDelete}
                onSecondary={() => setModal(false)}
                primaryLabel="Yes, Delete"
                secondaryLabel="Cancel"
            />
        </>
    )
}

export default AdminFeatureHome