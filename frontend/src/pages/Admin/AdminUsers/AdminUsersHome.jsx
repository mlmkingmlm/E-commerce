import React, { useEffect, useState } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link } from 'react-router-dom'
import { getUsers, updateUser } from "../../../Redux/ActionCreators/UsersActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { GlobalModal } from '../../../component/StatusModal'

function AdminUsers() {

    const dispatch = useDispatch()

    const { data, success, error } = useSelector(
        state => state.UsersStateData
    )

    const [search, setSearch] = useState("")

    // ✅ Modal states
    const [modal, setModal] = useState(false)
    const [selectedName, setSelectedName] = useState("")
    const [deleteId, setDeleteId] = useState(null)

    // ✅ Fetch data
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    // ✅ Redux response handle
    useEffect(() => {
        if (success || error) {
            setModal(true)
        }
    }, [success, error])

    // ✅ Search filter
    const filteredData = (data || []).filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    )

    const columns = [
        {
            name: 'SR.',
            cell: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'UserId',
            selector: row => row._id
        },
        {
            name: 'Active',
            selector: row => row.isActive,
        },
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
                                Users
                            </h5>

                            {/* 🔍 Search */}
                            <input
                                type="text"
                                placeholder="Search Users..."
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
                    dispatch({ type: RESET_BRAND_STATUS })
                }}
                action="delete"
                module="Brand"
                name={selectedName}
                onPrimary={() => { }}
                onSecondary={() => setModal(false)}
                primaryLabel="Yes, Delete"
                secondaryLabel="Cancel"
            />
        </>
    )
}

export default AdminUsers