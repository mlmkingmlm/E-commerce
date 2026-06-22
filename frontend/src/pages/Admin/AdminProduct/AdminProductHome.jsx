import React, { useEffect, useState } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link } from 'react-router-dom'
import { deleteProduct, getProduct } from "../../../Redux/ActionCreators/ProductActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_PRODUCT_STATUS } from "../../../Redux/Constants"

function AdminProductHome() {

    const dispatch = useDispatch()

    const { data, success, error, message } = useSelector(
        state => state.ProductStateData
    )

    const [search, setSearch] = useState("")

    // 🔥 Modal states
    const [modal, setModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [selectedName, setSelectedName] = useState("")
    const [modalType, setModalType] = useState("");

    // ✅ Fetch data
    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        if (error) {
            setModalType("error")
            setModal(true)
        }
        else if (success) {
            dispatch({ type: RESET_PRODUCT_STATUS })
        }
    }, [error, success])

    // 🔍 Search filter
    const filteredData = (data || []).filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    )

    // 🔥 Delete confirm
    function handleDelete() {
        dispatch(deleteProduct({ id: deleteId }))
    }

    const columns = [
        {
            name: 'ID',
            cell: (row, index) => index + 1,
            width: "70px"
        },
        {
            name: 'Images',
            width: '200px', // 👈 yahan control karo
            cell: row => {
                const images = row.pic || row.pics || [];

                return (
                    <div className='m-1' style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="product"
                                style={{
                                    width: "40px",   // 👈 fixed size better hai %
                                    height: "40px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    border: "1px solid #ddd"
                                }}
                            />
                        ))}
                    </div>
                );
            }
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Maincategory',
            selector: row => row.maincategory,
        },
        {
            name: 'Subcategory',
            selector: row => row.subcategory,
        },
        {
            name: 'Brand',
            selector: row => row.brand,
        },
        {
            name: 'Color',
            minWidth: '200px',   // 👈 width control
            grow: 1.5,
            cell: row => {
                const colors = Array.isArray(row.color)
                    ? row.color
                    : row.color?.split(',') || [];

                return (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {colors.map((c, i) => (
                            <span key={i} className="badge bg-secondary">
                                {c}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        {
            name: 'Size',
            minWidth: '180px',   // 👈 width control
            grow: 1.2,
            cell: row => {
                const sizes = Array.isArray(row.size)
                    ? row.size
                    : row.size?.split(',') || [];

                return (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {sizes.map((s, i) => (
                            <span key={i} className="badge bg-info text-dark">
                                {s}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        {
            name: 'Base Price',
            selector: row => row.basePrice,
        },
        {
            name: 'Discount',
            selector: row => row.discount,
        },
        {
            name: 'Final Price',
            selector: row => row.finalPrice,
        },
        {
            name: 'Stock',
            selector: row => row.stock ? "True" : "False",
        },
        {
            name: 'Quantity',
            selector: row => row.stockQuantity,
        },
        {
            name: 'Active',
            selector: row => row.active ? "True" : "False",
        },
        {
            name: 'Edit',
            cell: row => (
                <Link to={`/admin/product/update/${row._id}`}>
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
                        setModalType("delete")
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
                                Product
                                <Link to="/admin/productcreate">
                                    <i className='bi bi-plus float-end text-light'></i>
                                </Link>
                            </h5>

                            {/* 🔍 Search */}
                            <input
                                type="text"
                                placeholder="Search product..."
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
                                fixedHeader
                                fixedHeaderScrollHeight="500px"
                                noDataComponent="No Products Found"
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
                    dispatch({ type: RESET_PRODUCT_STATUS })
                }}
                action={modalType}
                module="Product"
                name={selectedName}
                onPrimary={handleDelete}
                onSecondary={() => setModal(false)}
                primaryLabel="Yes, Delete"
                secondaryLabel="Cancel"
            />
        </>
    )
}

export default AdminProductHome