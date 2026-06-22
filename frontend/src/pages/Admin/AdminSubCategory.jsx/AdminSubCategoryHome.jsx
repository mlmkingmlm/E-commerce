import React, { useEffect, useState } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link } from 'react-router-dom'
import { deleteSubcategory, getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_SUBCATEGORY_STATUS } from "../../../Redux/Constants"

function AdminSubCategoryHome() {

    const dispatch = useDispatch()

    const { data, success, error } = useSelector(
        state => state.SubcategoryStateData
    )

    const [search, setSearch] = useState("")

    const [modal, setModal] = useState(false)
    const [selectedName, setSelectedName] = useState("")
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        dispatch(getSubcategory())
    }, [dispatch])

    useEffect(() => {
        if (success || error) {
            setModal(true)
        }
    }, [success, error])

    const filteredData = (data || []).filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    )

    function handleDelete() {
        dispatch(deleteSubcategory({ id: deleteId }))
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
            name: 'Image',
            cell: row => (
                <Link to={row.pic} target="_blank">
                    <img src={row.pic} width={50} height={50} alt="subcategory" />
                </Link>
            )
        },
        {
            name: 'Active',
            selector: row => row.active ? "True" : "False",
        },
        {
            name: 'Edit',
            cell: row => (
                <Link to={`/admin/subcategory/update/${row._id}`}>
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
                                Sub Category
                                <Link to="/admin/subcategorycreate">
                                    <i className='bi bi-plus float-end text-light'></i>
                                </Link>
                            </h5>

                            <input
                                type="text"
                                placeholder="Search subcategory..."
                                className="form-control mb-3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

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

            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_SUBCATEGORY_STATUS })
                }}
                action="delete"
                module="SubCategory"
                name={selectedName}
                onPrimary={handleDelete}
                onSecondary={() => setModal(false)}
                primaryLabel="Yes, Delete"
                secondaryLabel="Cancel"
            />
        </>
    )
}

export default AdminSubCategoryHome